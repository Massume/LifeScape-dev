# LifeScape Frontend

This folder contains the Next.js application written in TypeScript. Pages are grouped using the App Router:

- `src/app/(auth)` – public pages for registration, login, email confirmation and Google OAuth2.
- `src/app/(protected)` – pages available after authentication (city view, profile and CRUD screens).

Run the development server with:

```bash
npm install
npm run dev
```

End-to-end UI tests are executed with Playwright:

```bash
npm run test:ui
```
