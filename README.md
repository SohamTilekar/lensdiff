<div align="center">

  <img src="public/favicon.svg" alt="DiffLens Logo" width="80" height="80" />

  # DiffLens

  **A high-performance, 100% static, client-side image comparison web application.**

  [![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-0284c7?style=flat-square&logo=github)](https://sohamtilekar233.github.io/lensdiff/)
  [![React Version](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646cff?style=flat-square&logo=vite)](https://vitejs.dev/)

</div>

---

DiffLens provides a professional-grade image comparison studio directly inside the browser. It enables visual inspection of pixel-level differences between before/after image pairs without cloud uploads, external dependencies, or server processing.

> [!IMPORTANT]  
> **100% Client-Side Privacy Guarantee**: All image rendering, canvas operations, and metadata parsing occur entirely in your local browser memory using HTML5 Canvas & Object URLs. Your images never leave your machine.

---

## Live Application

Try DiffLens directly on GitHub Pages:  
👉 **[sohamtilekar.github.io/lensdiff](https://sohamtilekar.github.io/lensdiff/)**

---

## Problem & Overview

When working on digital design iterations, photo color grading, UI redesigns, or web image compression, identifying subtle visual differences between image versions can be tedious and error-prone.

DiffLens addresses this by providing:

- **UI/UX Design Inspection**: Compare design mockups (v1 vs. v2) against coded frontend implementations to identify alignment shifts or missing padding.
- **Photo Retouching**: Compare raw captures against color-graded images or retouching layers.
- **Image Compression Analysis**: Inspect compression artifacts (JPEG vs. WebP vs. AVIF) at extreme zoom levels.
- **Privacy-First Inspection**: Analyze confidential graphics or unreleased product designs securely offline.

---

## Features & Comparison Modes

### Comparison Modes

- **Split Slider**: Vertical and horizontal split-screen divider with 4 line style options:
  - `Default`: Glowing cyan divider.
  - `Solid White`: 2px white divider.
  - `Solid Black`: 2px black divider.
  - `0px Transparent`: Invisible line with a frosted-glass drag handle.
- **Side-by-Side View**: Dual locked viewports for synchronized parallel inspection.
- **Blink Mode**: Automatically alternates between images at configurable speeds (100ms – 1500ms) to leverage human motion perception for anomaly detection.
- **Onion-Skin Overlay**: Opacity slider (0% to 100%) for smooth layer blending.

### Viewport & Tools

- **Synchronized Pan & Zoom**: Zoom up to **2000%** with synchronized lock-step pan across viewports.
- **Fit to Screen**: Automatic scale calculation on image load.
- **Metadata Inspector**: Displays image resolution, aspect ratio, MIME type, and exact file size in bytes.

---

## Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `1` | Switch to Split Slider mode |
| `2` | Switch to Side-by-Side mode |
| `3` | Switch to Blink mode |
| `4` | Switch to Onion-Skin mode |
| `S` | Swap Before and After images |
| `0` | Reset zoom / Fit image to screen |
| `Ctrl + K` / `Cmd + K` | Open Command Palette |

---

## Local Development

### Prerequisites

- Node.js v18.0.0 or higher
- npm v9.0.0 or higher

### Setup

```bash
# Clone the repository
git clone https://github.com/sohamtilekar233/lensdiff.git
cd lensdiff

# Install dependencies
npm install

# Start local development server
npm run dev
```

> [!TIP]
> The development server will run at `http://localhost:5173`.

### Available Scripts

- `npm run dev` — Starts local development server with HMR.
- `npm run build` — Compiles TypeScript and builds production artifacts into `./dist`.
- `npm run preview` — Locally previews the built static site.
- `npm run test` — Runs unit tests using Vitest.
- `npm run deploy` — Compiles and deploys `./dist` to the `gh-pages` branch.

---

## Architecture & Performance

> [!NOTE]
> DiffLens is built for zero-latency handling of high-resolution images up to 8K.

- **On-Demand Rendering**: Canvas repaints are scheduled via `requestAnimationFrame` strictly when visual state changes occur, avoiding continuous idle CPU utilization.
- **Cached Canvas Patterns**: Checkerboard transparency backgrounds are pre-rendered into a cached `CanvasPattern` tile instead of thousands of individual `fillRect` calls per frame.
- **Memory Management**: Images are loaded as `blob:` URLs via `URL.createObjectURL(file)`, preventing browser memory bloat and tab crashes associated with large Base64 strings.

---

## Deployment

DiffLens is configured for deployment to GitHub Pages via the `gh-pages` branch.

- **Automated Deployment**: Pushing to the `main` branch triggers `.github/workflows/deploy.yml`, which builds the project and deploys to the `gh-pages` branch automatically.
- **Manual Deployment**: Run `npm run deploy` to manually publish `./dist` to `gh-pages`.
