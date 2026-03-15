# Web App

A full-stack Next.js 11 web application with Firebase authentication, Google Maps integration, and styled-components.

[![CI](https://github.com/xabierlameiro/web/actions/workflows/ci.yml/badge.svg)](https://github.com/xabierlameiro/web/actions/workflows/ci.yml)

## Stack

| Layer             | Choice                    |
| ----------------- | ------------------------- |
| Framework         | Next.js 11 (Pages Router) |
| Language          | TypeScript                |
| Auth + DB         | Firebase                  |
| Maps              | Google Maps API           |
| Styling           | styled-components         |
| State             | Zustand                   |
| Package manager   | npm                       |

## Getting started

```bash
git clone https://github.com/xabierlameiro/web.git
cd web
npm install
```

Copy `.env.example` to `.env.local` and add your Firebase and Google Maps credentials.

```bash
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script          | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run lint`  | ESLint                   |

## License

[MIT](./LICENSE) — © 2026 Xabier Lameiro
