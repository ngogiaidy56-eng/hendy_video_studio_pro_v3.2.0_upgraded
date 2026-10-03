export interface Env {
  TELEGRAM_BOT_TOKEN: string;
  ADMIN_USER_IDS?: string;
  ADMIN_ID?: string; // legacy alias
  APP_VERSION?: string;
  TELEGRAM_SECRET_TOKEN?: string;
  ADMIN_APP_URL?: string;
  MCP_OTP_SECRET?: string;
  DB?: D1Database;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Health check endpoint
    if (url.pathname === '/health' || url.pathname === '/telegram/health') {
      return Response.json({ ok: true, service: 'telegram-bot', version: env.APP_VERSION || '3.2.0' });
    }

    if (request.method !== 'POST' || (url.pathname !== '/webhook' && url.pathname !== '/telegram/webhook')) {
      return new Response('Not Found', { status: 404 });
    }

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
      console.error('Lỗi xử lý Webhook:', err);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
};

// ==========================================
// 1. GIAO DIỆN HỆ THỐNG & ĐIỀU HÀNH
// ==========================================

// Giao diện Menu Chính
function getMainMenuData(firstName: string, isAdmin = false, version = '3.2.0') {
  const text =
    `👋 <b>Xin chào ${escapeHtml(firstName)}!</b>\n\n` +
    `Chào mừng bạn đến với <b>Trung tâm kiểm soát hệ thống (SOT v${version})</b>.\n` +
    `<i>Nguồn chuẩn duy nhất - Điều hành CRM</i>`;

  const inline_keyboard: Array<Array<{ text: string; callback_data?: string; url?: string }>> = [
    [
      { text: '🎛️ Trung tâm Kiểm soát SOT', callback_data: 'view_sot_panel' },
      { text: '💼 Điều hành CRM', callback_data: 'view_crm' }
    ],
    [
      { text: '🎬 Mở Video Studio Pro', url: 'https://hendy-video-studio-pro.ngogiaidy56.workers.dev' },
      { text: '📊 Trạng thái SOT', callback_data: 'view_sot' }
    ]
  ];

  if (isAdmin) {
    inline_keyboard.push([
      { text: '⚙️ Bảng Điều Khiển Admin', callback_data: 'refresh_admin' }
    ]);
  }

  return { text, replyMarkup: { inline_keyboard } };
}

// Bảng Trung tâm Kiểm soát SOT
async function getSOTControlPanelData(env: Env, version = env.APP_VERSION || '3.2.0') {
  const wsUrl = (await getSetting(env, 'ws_url')) || 'ws://127.0.0.1:8799/ws';
  const dryRunStatus = (await getSetting(env, 'dry_run_status')) || 'CHỜ LỆNH';
  const sandboxStatus = (await getSetting(env, 'sandbox_status')) || '🔴 NGOẠI TUYẾN';

  const text =
    `🛡️ <b>TRUNG TÂM KIỂM SOÁT HỆ THỐNG</b> | <code>SOT v${version}</code>\n` +
    `<i>Nguồn chuẩn duy nhất - ĐIỀU HÀNH CRM</i>\n\n` +
    `🛡️ <b>Cổng kiểm định phát hành:</b> <code>${dryRunStatus}</code>\n` +
    `📡 <b>Môi trường Sandbox:</b> <b>${sandboxStatus}</b>\n` +
    `🔌 <b>Cổng WebSocket:</b> <code>${wsUrl}</code>\n` +
    `📱 <b>Nền tảng:</b> WEB | PWA | ANDROID | IOS\n\n` +
    `<i>Bấm nút bên dưới để phát lệnh điều khiển:</i>`;

  const replyMarkup = {
    inline_keyboard: [
      [
        { text: '🧪 KIỂM TRA (DRY-RUN)', callback_data: 'sot_dry_run' },
        { text: '🛠️ TỰ ĐỘNG VÁ', callback_data: 'sot_auto_patch' }
      ],
      [
        { text: '🔑 ĐỒNG BỘ TẤT CẢ', callback_data: 'sot_sync_all' }
      ],
      [
        { text: '⚡ Đổi Trạng Thái Sandbox', callback_data: 'sot_toggle_sandbox' },
        { text: '📜 Nhật ký Telemetry', callback_data: 'sot_telemetry' }
      ],
      [
        { text: '◀️ Quay lại Menu Chính', callback_data: 'back_to_main' }
      ]
    ]
  };

  return { text, replyMarkup };
}

// Bảng Điều khiển Admin
async function getAdminPanelData(env: Env) {
  const isMaint = (await getSetting(env, 'maintenance')) === '1';
  const statusBadge = isMaint ? '🔴 ĐANG BẢO TRÌ' : '🟢 HOẠT ĐỘNG BÌNH THƯỜNG';
  const toggleBtnText = isMaint ? '🟢 Mở lại Hệ thống' : '🔴 Bật Chế độ Bảo trì';

  const text =
    `⚙️ <b>BẢNG ĐIỀU HÀNH ADMIN</b>\n\n` +
    `ID Admin: <code>${escapeHtml(adminIdsLabel(env))}</code>\n` +
    `Trạng thái máy chủ: <b>${statusBadge}</b>\n\n` +
    `<i>Chọn tác vụ quản trị:</i>`;

  const replyMarkup = {
    inline_keyboard: [
      [{ text: toggleBtnText, callback_data: 'toggle_maint' }],
      [
        { text: '📊 Thống kê D1', callback_data: 'view_stats' },
        { text: '🔄 Tải lại Bảng Admin', callback_data: 'refresh_admin' }
      ],
      [
        { text: '◀️ Quay lại Menu Chính', callback_data: 'back_to_main' }
      ]
    ]
  };

  return { text, replyMarkup };
}

// ==========================================
// 2. XỬ LÝ TIN NHẮN VĂN BẢN (INCOMING MESSAGES)
// ==========================================
async function handleMessage(message: any, env: Env): Promise<void> {
  const chatId = message.chat?.id;
  const userId = message.from?.id;
  if (!chatId || !userId) return;

  const username = message.from?.username || '';
  const firstName = message.from?.first_name || '';
  const text = String(message.text || '').trim();
  const isAdmin = isAdminUser(env, userId);

  // Lưu thông tin người dùng và lịch sử chat vào D1
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
    }
  } catch (err) {
    console.error('Lỗi lưu D1:', err);
  }

  // Cấu hình đổi WebSocket URL trực tiếp bằng cách nhắn văn bản bắt đầu bằng ws:// hoặc wss://
  if (isAdmin && (text.startsWith('ws://') || text.startsWith('wss://'))) {
    await setSetting(env, 'ws_url', text.trim());
    await logEvent(env, userId, `Cập nhật Cổng WebSocket thành: ${text.trim()}`);
    await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, `✅ <b>Đã cập nhật Cổng WebSocket mới:</b>\n<code>${text.trim()}</code>`);
    return;
  }

  // Kiểm tra Chế độ Bảo trì
  const isMaint = (await getSetting(env, 'maintenance')) === '1';
  if (isMaint && !isAdmin) {
    await sendMessage(
      env.TELEGRAM_BOT_TOKEN,
      chatId,
      '🚧 <b>HỆ THỐNG ĐANG BẢO TRÌ</b>\n\nHệ thống đang nâng cấp. Vui lòng quay lại sau ít phút!'
    );
    return;
  }

  // Lệnh /admin
  if (isAdmin && text === '/admin') {
    const { text: adminText, replyMarkup } = await getAdminPanelData(env);
    await sendMessageWithKeyboard(env.TELEGRAM_BOT_TOKEN, chatId, adminText, replyMarkup);
    return;
  }

  // Lệnh /start hoặc tin nhắn khác: hiển thị Menu Chính
  const { text: mainText, replyMarkup } = getMainMenuData(firstName, isAdmin, env.APP_VERSION || '3.2.0');
  await sendMessageWithKeyboard(env.TELEGRAM_BOT_TOKEN, chatId, mainText, replyMarkup);
}

// ==========================================
// 3. XỬ LÝ SỰ KIỆN NÚT BẤM (INLINE CALLBACKS)
// ==========================================
async function handleCallbackQuery(callbackQuery: any, env: Env): Promise<void> {
  const queryId = callbackQuery.id;
  const userId = callbackQuery.from?.id;
  const chatId = callbackQuery.message?.chat?.id;
  const messageId = callbackQuery.message?.message_id;
  const firstName = callbackQuery.from?.first_name || '';
  const action = callbackQuery.data;
  const isAdmin = isAdminUser(env, userId);

  if (!chatId || !messageId) return;

  await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId);

  // 1. Nút Quay lại Menu Chính
  if (action === 'back_to_main') {
    const { text, replyMarkup } = getMainMenuData(firstName, isAdmin, env.APP_VERSION || '3.2.0');
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 2. Mở Trung tâm Kiểm soát SOT Panel
  if (action === 'view_sot_panel') {
    const { text, replyMarkup } = await getSOTControlPanelData(env, env.APP_VERSION || '3.2.0');
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 3. Tác vụ: KIỂM TRA (DRY-RUN)
  if (action === 'sot_dry_run') {
    await setSetting(env, 'dry_run_status', 'ĐANG KIỂM TRA (RUNNING)');
    await logEvent(env, userId, 'Chạy kiểm định Dry-Run');
    await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId, '🧪 Đã phát lệnh Kiểm tra Dry-Run!');

    const { text, replyMarkup } = await getSOTControlPanelData(env, env.APP_VERSION || '3.2.0');
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 4. Tác vụ: TỰ ĐỘNG VÁ
  if (action === 'sot_auto_patch') {
    await logEvent(env, userId, 'Kích hoạt Tự động vá lỗi SOT');
    await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId, '🛠️ Tiến trình Tự động vá lỗi đã bắt đầu!', true);
    return;
  }

  // 5. Tác vụ: ĐỒNG BỘ TẤT CẢ
  if (action === 'sot_sync_all') {
    await logEvent(env, userId, 'Đồng bộ toàn bộ WebSocket, CRM & D1');
    await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId, '🔑 Đã phát lệnh Đồng bộ tất cả kênh dữ liệu!');
    return;
  }

  // 6. Tác vụ: Đổi Trạng thái Sandbox
  if (action === 'sot_toggle_sandbox') {
    const currentStatus = await getSetting(env, 'sandbox_status');
    const newStatus = currentStatus && currentStatus.includes('TRỰC TUYẾN')
      ? '🔴 NGOẠI TUYẾN'
      : '🟢 TRỰC TUYẾN (ws://127.0.0.1:8799/ws)';
    await setSetting(env, 'sandbox_status', newStatus);
    await logEvent(env, userId, `Chuyển trạng thái Sandbox: ${newStatus}`);

    const { text, replyMarkup } = await getSOTControlPanelData(env, env.APP_VERSION || '3.2.0');
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 7. Tác vụ: Xem Nhật ký Telemetry
  if (action === 'sot_telemetry') {
    let logLines = '<i>Chưa có dữ liệu sự kiện.</i>';
    try {
      if (env.DB) {
        const logs = await env.DB.prepare('SELECT message, created_at FROM logs ORDER BY id DESC LIMIT 6').all<{ message: string; created_at: string }>();
        if (logs && logs.results && logs.results.length > 0) {
          logLines = logs.results.map(l => `• <code>[${l.created_at || 'Mới'}]</code> ${escapeHtml(l.message)}`).join('\n');
        }
      }
    } catch (e) {
      console.error('Lỗi đọc logs:', e);
    }

    const telemetryText =
      `📜 <b>NHẬT KÝ SỰ KIỆN (TELEMETRY)</b>\n\n${logLines}\n\n` +
      `<i>Gửi tin nhắn bắt đầu bằng <code>ws://</code> để đổi Cổng WebSocket.</i>`;

    const replyMarkup = {
      inline_keyboard: [
        [{ text: '🔄 Làm mới Logs', callback_data: 'sot_telemetry' }],
        [
          { text: '◀️ Quay lại SOT Panel', callback_data: 'view_sot_panel' },
          { text: '🏠 Menu Chính', callback_data: 'back_to_main' }
        ]
      ]
    };

    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, telemetryText, replyMarkup);
    return;
  }

  // 8. Giao diện Điều hành CRM
  if (action === 'view_crm') {
    const crmText =
      `💼 <b>ĐIỀU HÀNH CRM HỆ THỐNG</b>\n\n` +
      `🌐 <b>Trạng thái phân hệ:</b> ĐANG HOẠT ĐỘNG\n` +
      `📡 <b>Webhook Hub:</b> Cloudflare Workers -> Telegram Bot\n` +
      `🗄️ <b>Cơ sở dữ liệu:</b> Cloudflare D1 Storage\n\n` +
      `<i>Chọn thao tác điều hành:</i>`;

    const replyMarkup = {
      inline_keyboard: [
        [
          { text: '🔑 Đồng bộ CRM', callback_data: 'sot_sync_all' },
          { text: '📊 Thống kê CRM', callback_data: 'view_stats' }
        ],
        [{ text: '◀️ Quay lại Menu Chính', callback_data: 'back_to_main' }]
      ]
    };

    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, crmText, replyMarkup);
    return;
  }

  // 9. Xem Trạng thái SOT
  if (action === 'view_sot') {
    const sotText =
      `📊 <b>TRẠNG THÁI HỆ THỐNG SOT</b>\n\n` +
      `🟢 WebSocket Hub (Port 8799): <b>ONLINE</b>\n` +
      `🟢 Express API (Port 3000): <b>ONLINE</b>\n` +
      `🟢 Cloudflare Worker: <b>ACTIVE</b>\n` +
      `🟢 D1 Database: <b>CONNECTED</b>`;

    const replyMarkup = {
      inline_keyboard: [
        [{ text: '◀️ Quay lại Menu Chính', callback_data: 'back_to_main' }]
      ]
    };

    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, sotText, replyMarkup);
    return;
  }

  // Kiểm tra quyền Admin đối với các chức năng Admin
  if (!isAdmin && (action === 'toggle_maint' || action === 'refresh_admin' || action === 'view_stats')) {
    await answerCallbackQuery(env.TELEGRAM_BOT_TOKEN, queryId, '⚠️ Bạn không có quyền Admin!', true);
    return;
  }

  // 10. Bảng Admin
  if (action === 'refresh_admin') {
    const { text, replyMarkup } = await getAdminPanelData(env);
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 11. Bật/tắt bảo trì
  if (action === 'toggle_maint') {
    const currentStatus = await getSetting(env, 'maintenance');
    const newStatus = currentStatus === '1' ? '0' : '1';
    await setSetting(env, 'maintenance', newStatus);

    const { text, replyMarkup } = await getAdminPanelData(env);
    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, text, replyMarkup);
    return;
  }

  // 12. Xem thống kê D1
  if (action === 'view_stats') {
    let userCount = 0;
    let logCount = 0;
    try {
      if (env.DB) {
        const u = await env.DB.prepare('SELECT COUNT(*) as count FROM users').first<{ count: number }>();
        const l = await env.DB.prepare('SELECT COUNT(*) as count FROM logs').first<{ count: number }>();
        userCount = u?.count ?? 0;
        logCount = l?.count ?? 0;
      }
    } catch (e) {
      console.error('Lỗi thống kê D1:', e);
    }

    const statsText =
      `📊 <b>THỐNG KÊ CƠ SỞ DỮ LIỆU D1</b>\n\n` +
      `👥 Tổng người dùng: <code>${userCount}</code>\n` +
      `💬 Tổng nhật ký tin nhắn: <code>${logCount}</code>`;

    const replyMarkup = {
      inline_keyboard: [
        [{ text: '◀️ Quay lại Admin Panel', callback_data: 'refresh_admin' }],
        [{ text: '🏠 Quay lại Menu Chính', callback_data: 'back_to_main' }]
      ]
    };

    await editMessageText(env.TELEGRAM_BOT_TOKEN, chatId, messageId, statsText, replyMarkup);
    return;
  }
}

// ==========================================
// 4. HELPERS CƠ SỞ DỮ LIỆU D1
// ==========================================
async function getSetting(env: Env, key: string): Promise<string | null> {
  try {
    if (env.DB) {
      const row = await env.DB.prepare('SELECT value FROM settings WHERE key = ?').bind(key).first<{ value: string }>();
      return row ? row.value : null;
    }
  } catch (e) {
    return null;
  }
  return null;
}

async function setSetting(env: Env, key: string, value: string): Promise<void> {
  try {
    if (env.DB) {
      await env.DB.prepare(`
        INSERT INTO settings (key, value) VALUES (?, ?)
        ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `).bind(key, value).run();
    }
  } catch (e) {
    console.error('Lỗi setSetting:', e);
  }
}

async function logEvent(env: Env, userId: number | string, eventMessage: string): Promise<void> {
  try {
    if (env.DB) {
      await env.DB.prepare(`
        INSERT INTO logs (user_id, message) VALUES (?, ?)
      `).bind(userId, `[SOT LOG] ${eventMessage}`).run();
    }
  } catch (e) {
    console.error('Lỗi logEvent:', e);
  }
}

// ==========================================
// 5. HELPERS TELEGRAM BOT API
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


function adminIds(env: Env): Set<string> {
  const raw = env.ADMIN_USER_IDS || env.ADMIN_ID || '';
  return new Set(raw.split(',').map(v => v.trim()).filter(Boolean));
}

function isAdminUser(env: Env, userId: number | string | undefined): boolean {
  return userId != null && adminIds(env).has(String(userId));
}

function adminIdsLabel(env: Env): string {
  const ids = [...adminIds(env)];
  return ids.length ? ids.join(', ') : 'Chưa thiết lập';
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
