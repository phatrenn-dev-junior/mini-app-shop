# Frontend — Telegram Mini App (React + Vite + Tailwind)

## Setup
```bash
npm install
cp .env.example .env   # set VITE_API_URL to your backend URL
npm run dev
```

## Build
```bash
npm run build
```
Deploy the `dist/` folder to any static host with HTTPS (Vercel, Netlify, Cloudflare Pages, etc.) — Telegram Mini Apps **require HTTPS**.

## Testing inside Telegram
1. Deploy the frontend (or use a tunnel like `ngrok http 5173` during dev).
2. In @BotFather: `/newapp` (or `/setmenubutton` for an existing bot) and paste your HTTPS URL.
3. Open your bot in Telegram and tap the menu button / `/start`.

## How theming works
`src/index.css` declares fallback values for all `--tg-theme-*` variables (used only outside Telegram, e.g. a normal browser). Inside Telegram, the client overwrites these automatically to match the user's light/dark theme, and every component reads colors via `var(--tg-theme-...)` (also exposed as Tailwind colors like `bg-tg-bg`, `text-tg-hint`, etc. — see `tailwind.config.js`).
