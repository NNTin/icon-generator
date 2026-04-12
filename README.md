# 🥫 Tin — Can of Icons

A browser-only emoji favicon generator. Pick any emoji, preview it at every standard favicon size, and download production-ready assets — with **zero servers, zero uploads**.

## Features

- **Live preview** — see your emoji rendered at 16×16, 32×32, 48×48, and 180×180 px instantly
- **PNG exports** — `favicon-16.png`, `favicon-32.png`, `favicon-48.png`, `apple-touch-icon.png`
- **ICO export** — multi-resolution `favicon.ico` (16 + 32 + 48 px, PNG-in-ICO format)
- **SVG export** — scalable `favicon.svg`
- **ZIP bundle** — one click to download all assets as `favicon-pack.zip`
- **Copy HTML tags** — grab the `<link>` snippet for your `<head>` in one click
- **Random emoji** button and preset palette (🚀 ⚡ 🧠 🧪 💡 🎯 🔥 💎)
- **Dark / light theme** toggle
- Runs entirely in the browser — no Node.js, no backend, no file uploads

## Getting started

```bash
npm install
npm run dev
```

Open <http://localhost:5173> in your browser.

## Build for production

```bash
npm run build      # type-check + Vite production build → dist/
npm run preview    # serve the production build locally
```

## Add favicons to your project

Place the downloaded files in your project root (or `public/` for Vite / Next.js) and add to your HTML `<head>`:

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```

For **Next.js App Router**, drop `favicon.ico` directly into `app/`.

## Tech stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) (strict mode)
- [Vite](https://vite.dev)
- [JSZip](https://stuk.github.io/jszip/) — in-browser ZIP assembly
- HTML Canvas API — emoji rendering + PNG export
- Custom `DataView`-based ICO builder — no Node.js dependencies
