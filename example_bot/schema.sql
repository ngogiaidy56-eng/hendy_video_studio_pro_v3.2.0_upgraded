CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    username TEXT,
    first_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
);

-- Dữ liệu cấu hình mặc định cho SOT v3.1.0
INSERT OR IGNORE INTO settings (key, value) VALUES ('ws_url', 'ws://127.0.0.1:8799/ws');
INSERT OR IGNORE INTO settings (key, value) VALUES ('dry_run_status', 'CHỜ LỆNH');
INSERT OR IGNORE INTO settings (key, value) VALUES ('sandbox_status', '🔴 NGOẠI TUYẾN');
INSERT OR IGNORE INTO settings (key, value) VALUES ('maintenance', '0');
