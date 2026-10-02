-- Bảng lưu trữ người dùng Telegram
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bảng lưu trữ nhật ký tin nhắn
CREATE TABLE IF NOT EXISTS logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Bảng lưu trữ cài đặt hệ thống (ví dụ: chế độ bảo trì)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- Khởi tạo giá trị mặc định cho cài đặt bảo trì nếu chưa có
INSERT OR IGNORE INTO settings (key, value) VALUES ('maintenance', '0');
