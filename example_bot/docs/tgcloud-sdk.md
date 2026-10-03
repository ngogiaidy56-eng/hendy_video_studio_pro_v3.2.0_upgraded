# Telegram Cloud App adapter

Keep provider-specific Telegram cloud/runtime bindings behind `handlers/`. The application layer only expects:

- `getUserState(userId, key)`
- `setUserState(userId, key, value)`
- `sendAdminAlert(payload)`

Never store bot tokens or deployment secrets in this directory.
