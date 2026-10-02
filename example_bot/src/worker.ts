export interface Env {
  TELEGRAM_BOT_TOKEN: string;
  ADMIN_ID?: string;
  TELEGRAM_SECRET_TOKEN?: string;
  ADMIN_APP_URL?: string;
  MCP_OTP_SECRET?: string;
  DB?: D1Database;
}

// In-memory fallback if D1 binding is not attached in local testing
const inMemorySettings = new Map<string, string>([['maintenance', '0']]);
const inMemoryUsers = new Map<number, { username: string; firstName: string }>();
let inMemoryLogCount = 0;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === '/health' || url.pathname === '/telegram/health') {
      return Response.json({ ok: true, service: 'telegram-bot', version: '2.4.0' });
    }

    // Webhook endpoints
    if (request.method !== 'POST' || (url.pathname !== '/webhook' && url.pathname !== '/telegram/webhook')) {
      return new Response('Not Found', { status: 404 });
    }

    // Verify Secret Token from Telegram header
    const secretToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');
    if (env.TELEGRAM_SECRET_TOKEN && secretToken !== env.TELEGRAM_SECRET_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }

    try {
      const update = (await request.json()) as any;

      if (update.message) {
        ctx.waitUntil(handleMessage(update.message, env));
      }

      if (update.callback_query) {
        ctx.waitUntil(handleCallbackQuery(update.callback_query, env));
      }

      return new Response('OK', { status: 200 });
    } catch (err: unknown) {
      console.error('Lỗi xử lý Webhook Telegram:', err);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};

// ==========================================
// XỬ LÝ TIN NHẮN VĂN BẢN
// ==========================================
async function handleMessage(message: any, env: Env): Promise<void> {
  const chatId = message.chat?.id;
  const userId = message.from?.id;
  if (!chatId || !userId) return;

  const username = message.from?.username || '';
  const firstName = message.from?.first_name || '';
  const text = String(message.text || '').trim();
  const isAdmin = Boolean(env.ADMIN_ID && String(userId) === String(env.ADMIN_ID));

  // Lưu hoặc cập nhật người dùng vào cơ sở dữ liệu D1
  try {
    if (env.DB) {
      await env.DB.prepare(`
        INSERT INTO users (user_id, username, first_name)
        VALUES (?, ?, ?)
        ON CONFLICT(user_id) DO UPDATE SET
          username = excluded.username,
          first_name = excluded.first_name
      `).bind(userId, username, firstName).run();

      await env.DB.prepare(`
        INSERT INTO logs (user_id, message) VALUES (?, ?)
      `).bind(userId, text).run();
    } else {
      inMemoryUsers.set(userId, { username, firstName });
      inMemoryLogCount++;
    }
  } catch (err) {
    console.error('Lỗi ghi dữ liệu D1:', err);
  }

  // Kiểm tra trạng thái chế độ bảo trì
  const isMaint = (await getSetting(env, 'maintenance')) === '1';
  if (isMaint && !isAdmin) {
    await sendMessage(
      env.TELEGRAM_BOT_TOKEN,
      chatId,
      '🚧 <b>HỆ THỐNG ĐANG BẢO TRÌ</b>\n\nHiện tại hệ thống đang được nâng cấp kỹ thuật. Vui lòng quay lại sau ít phút!'
    );
    return;
  }

  // Mở Bảng điều khiển Quản trị viên
  if (isAdmin && (text === '/admin' || text === '/dashboard')) {
    await sendAdminPanel(env, chatId);
    return;
  }

  // Lệnh /start
  if (text === '/start') {
    const adminUrl = env.ADMIN_APP_URL || 'https://hendy-video-studio-pro.ngogiaidy56.workers.dev';
    const keyboard = {
      inline_keyboard: [
        [
          { text: '🎬 Mở Video Studio Pro', url: adminUrl },
          { text: '📊 Trạng thái SOT', callback_data: 'check_sot' }
        ],
        ...(isAdmin
          ? [[{ text: '⚙️ Bảng Điều Khiển Admin', callback_data: 'refresh_admin' }]]
          : [])
      ]
    };

    await sendMessageWithKeyboard(
      env.TELEGRAM_BOT_TOKEN,
      chatId,
      `👋 Xin chào <b>${escapeHtml(firstName)}</b>!\n\nChào mừng bạn đến với <b>AI Studio Pro Bot</b>. Hệ thống đang vận hành ổn định trên Cloudflare Workers.`,
      keyboard
    );
    return;
  }

  // Phản hồi tin nhắn thông thường
  await sendMessage(
    env.TELEGRAM_BOT_TOKEN,
    chatId,
    `Đã nhận tin nhắn: "<i>${escapeHtml(text)}</i>"\nGõ <b>/start</b> để xem các tính năng khả dụng.`
  );
}

// ==========================================
// XỬ LÝ SỰ KIỆN NÚT BẤM (INLINE BUTTONS)
// ==========================================
async function handleCallbackQuery(callbackQuery: any, env: Env): Promise<void> {
  const queryId = callbackQuery.id;
  const userId = callbackQuery.from?.id;
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const action = callbackQuery.data;
  const isAdmin = Boolean(env.ADMIN_ID && String(userId) === String(env.ADMIN_ID));

  if (!chatId || !messageId) return;

  if (action === 'check_sot') {
    await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId, '📊 Trạng thái Single Source of Truth (SOT): NOMINAL / Hoạt động hoàn hảo.', true);
    return;
  }

  if (!isAdmin) {
    await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId, '⚠️ Bạn không có quyền truy cập chức năng này!', true);
    return;
  }

  await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId);

  if (action === 'toggle_maint') {
    const currentStatus = await getSetting(env, 'maintenance');
    const newStatus = currentStatus === '1' ? '0' : '1';
    await setSetting(env, 'maintenance', newStatus);
    await updateAdminPanel(env, chatId, messageId);
  } else if (action === 'refresh_admin') {
    await updateAdminPanel(env, chatId, messageId);
  } else if (action === 'view_stats') {
    let userCount = 0;
    let logCount = 0;

    try {
      if (env.DB) {
        const u = await env.DB.prepare('SELECT COUNT(*) as count FROM users').first<{ count: number }>();
        const l = await env.DB.prepare('SELECT COUNT(*) as count FROM logs').first<{ count: number }>();
        userCount = u?.count ?? 0;
        logCount = l?.count ?? 0;
      } else {
        userCount = inMemoryUsers.size;
        logCount = inMemoryLogCount;
      }
    } catch (e) {
      console.error('Lỗi truy vấn thống kê D1:', e);
    }

    const statsText =
      `📊 <b>THỐNG KÊ HỆ THỐNG CLOUDFLARE D1</b>\n\n` +
      `👥 Tổng số người dùng: <code>${userCount}</code>\n` +
      `💬 Tổng số lượt tin nhắn đã ghi nhận: <code>${logCount}</code>\n` +
      `🕒 Cập nhật lúc: <code>${new Date().toLocaleTimeString('vi-VN')}</code>`;

    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, statsText, {
      inline_keyboard: [
        [{ text: '◀️ Quay lại Admin Panel', callback_data: 'refresh_admin' }]
      ]
    });
  }
}

// ==========================================
// BẢNG ĐIỀU KHIỂN QUẢN TRỊ VIÊN
// ==========================================
async function getAdminPanelData(env: Env) {
  const isMaint = (await getSetting(env, 'maintenance')) === '1';
  const statusBadge = isMaint ? '🔴 ĐANG BẢO TRÌ' : '🟢 HOẠT ĐỘNG BÌNH THƯỜNG';
  const toggleBtnText = isMaint ? '🟢 Mở lại Hệ thống' : '🔴 Bật Chế độ Bảo trì';

  const text =
    `⚙️ <b>BẢNG ĐIỀU HÀNH ADMIN</b>\n\n` +
    `ID Admin: <code>${env.ADMIN_ID || 'Chưa thiết lập'}</code>\n` +
    `Trạng thái máy chủ: <b>${statusBadge}</b>\n\n` +
    `<i>Bấm các nút bên dưới để điều hành hệ thống:</i>`;

  const replyMarkup = {
    inline_keyboard: [
      [{ text: toggleBtnText, callback_data: 'toggle_maint' }],
      [
        { text: '📊 Thống kê Hệ thống (D1)', callback_data: 'view_stats' },
        { text: '🔄 Tải lại Bảng điều khiển', callback_data: 'refresh_admin' }
      ]
    ]
  };

  return { text, replyMarkup };
}

async function sendAdminPanel(env: Env, chatId: number | string) {
  const { text, replyMarkup } = await getAdminPanelData(env);
  await sendMessageWithKeyboard(env.TELEGRAM_BOT_TOKEN, chatId, text, replyMarkup);
}

async function updateAdminPanel(env: Env, chatId: number | string, messageId: number) {
  const { text, replyMarkup } = await getAdminPanelData(env);
  await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
}

// ==========================================
// CƠ SỞ DỮ LIỆU D1 HELPERS
// ==========================================
async function getSetting(env: Env, key: string): Promise<string | null> {
  try {
    if (env.DB) {
      const row = await env.DB.prepare('SELECT value FROM settings WHERE key = ?').bind(key).first<{ value: string }>();
      return row ? row.value : null;
    }
  } catch (err) {
    console.error('Lỗi đọc settings từ D1:', err);
  }
  return inMemorySettings.get(key) || null;
}

async function setSetting(env: Env, key: string, value: string): Promise<void> {
  try {
    if (env.DB) {
      await env.DB.prepare(`
        INSERT INTO settings (key, value) VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `).bind(key, value).run();
    } else {
      inMemorySettings.set(key, value);
    }
  } catch (err) {
    console.error('Lỗi ghi settings vào D1:', err);
  }
}

// ==========================================
// TELEGRAM API HELPERS
// ==========================================
async function sendMessage(token: string, chatId: number | string, text: string): Promise<void> {
  if (!token) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' })
  });
}

async function sendMessageWithKeyboard(
  token: string,
  chatId: number | string,
  text: string,
  replyMarkup: unknown
): Promise<void> {
  if (!token) return;
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', reply_markup: replyMarkup })
  });
}

async function editMessageText(
  token: string,
  chatId: number | string,
  messageId: number,
  text: string,
  replyMarkup: unknown = null
): Promise<void> {
  if (!token) return;
  const payload: Record<string, unknown> = { chat_id: chatId, message_id: messageId, text, parse_mode: 'HTML' };
  if (replyMarkup) payload.reply_markup = replyMarkup;

  await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

async function answerCallbackQuery(
  token: string,
  callbackQueryId: string,
  text = '',
  showAlert = false
): Promise<void> {
  if (!token) return;
  await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ callback_query_id: callbackQueryId, text, show_alert: showAlert })
  });
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
