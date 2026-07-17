# 🔍 DiffLens — See What Changed

> **A high-performance, 100% static, client-side image comparison web application built for precision visual inspection.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-sky?style=for-the-badge&logo=github)](https://sohamtilekar233.github.io/lensdiff/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg?style=for-the-badge)](LICENSE)

---

## 🌐 Live Website & Demo

👉 **Try it live on GitHub Pages**: [https://sohamtilekar233.github.io/lensdiff/](https://sohamtilekar233.github.io/lensdiff/)

---

## 💡 What is DiffLens & What Problem Does It Solve?

When working on digital design iterations, photo retouching, UI redesigns, or web image compression, identifying subtle visual differences between two image versions can be tedious and prone to human error. Existing tools either require uploading sensitive graphics to external cloud servers, suffer from browser lag when dealing with high-resolution 4K/8K images, or lock essential tools behind paywalls.

**DiffLens solves this by delivering a professional-grade, privacy-first image comparison studio directly inside your browser.** 

### Key Use Cases
- 🎨 **UI/UX Designers & Frontend Developers**: Compare design mockups (v1 vs. v2) against actual coded implementations to catch pixel-alignment drops or unintended layout shifts.
- 📸 **Photographers & Digital Retouchers**: Evaluate raw captures against color-graded images, skin retouching layers, or HDR tone-mapping adjustments.
- 🖼️ **Web & Performance Engineers**: Inspect visual artifacts caused by image compression algorithms (JPEG vs. WebP vs. AVIF) at extreme zoom levels.
- 🔒 **Privacy-Conscious Teams**: Analyze confidential graphics or unreleased product designs with **100% privacy guarantee** — images are processed entirely in memory via HTML5 Canvas and never uploaded to any backend.

---

## ✨ Key Features & Comparison Modes

### 🎛️ 4 Interactive Visual Inspection Modes
1. **Split Slider**: Smooth interactive vertical & horizontal divider line. Includes 4 selectable slider styles:
   - `Default` (Glowing neon blue)
   - `Solid White` (High-contrast 2px line)
   - `Solid Black` (Dark-mode 2px line)
   - `0px Transparent` (Invisible divider with a frosted-glass drag handle)
2. **Side-by-Side View**: Synchronized dual viewports to inspect two images in parallel.
3. **Blink Inspection**: Automatically alternates between images at configurable speeds (100ms – 1500ms) to trigger human motion perception for instantaneous anomaly detection.
4. **Onion-Skin Overlay**: Smooth opacity slider (0% to 100%) to overlay the before and after images with precision transparency.

### 🔍 Precision Pan & Zoom
- **Synchronized Viewport Navigation**: Scroll or pinch to zoom up to **2000%**, maintaining lock-step alignment across both images.
- **Auto Fit-to-Screen**: Automatically calculates optimal scale on load to fit your viewport seamlessly.

### 📊 Accurate Metadata Inspector
- Real-time resolution extraction (width × height px).
- Aspect ratio calculation.
- Exact byte size resolution for local files, pasted images, and sample presets.

---

## 💻 Developer & Engineering Setup

### 🏗️ Architecture & Performance Optimizations
- **On-Demand Canvas Rendering**: Driven by a single `requestAnimationFrame` scheduler triggered strictly on visual state change (preventing continuous idle CPU thrashing).
- **Cached Canvas Pattern**: Checkerboard transparency backgrounds are pre-rendered into a cached `CanvasPattern` tile rather than thousands of `fillRect` calls per frame.
- **Base64-Free Memory Management**: File uploads are processed using `URL.createObjectURL(file)` to eliminate memory footprint and tab freezes during 8K image inspection.

### 🛠️ Technology Stack
- **Core Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React

---

## 🚀 Running Locally

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/sohamtilekar233/lensdiff.git
cd lensdiff

# Install dependencies
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build & Preview
```bash
# Compile TypeScript & production bundle
npm run build

# Preview production build locally
npm run preview
```

---

## 📦 Deploying to GitHub Pages (`gh-pages` Branch)

This project supports two deployment methods to the `gh-pages` branch:

### Option A: Automatic Deployment via GitHub Actions (Recommended)
Every push to the `main` branch automatically triggers `.github/workflows/deploy.yml`, compiling `./dist` and pushing to the `gh-pages` branch.

### Option B: Manual Command-Line Deployment
Deploy directly to `gh-pages` from your terminal using the `gh-pages` CLI script:
```bash
npm run deploy
```

---

## 👤 Author & Maintainer

**Soham Tilekar**
- Email: [sohamtilekar233@gmail.com](mailto:sohamtilekar233@gmail.com)
- GitHub: [@sohamtilekar233](https://github.com/sohamtilekar233)

---

## 📄 License
This project is licensed under the [MIT License](LICENSE).
