# Contributing to DiffLens

Thank you for your interest in contributing to **DiffLens**! We welcome contributions from developers, UI designers, and open-source enthusiasts.

## How to Contribute

### 1. Reporting Bugs & Feature Requests
- Check existing [GitHub Issues](https://github.com/sohamtilekar233/lensdiff/issues) to avoid duplicates.
- When opening an issue, provide clear steps to reproduce, expected vs. actual behavior, browser environment, and screenshots if applicable.

### 2. Development Setup
1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/lensdiff.git
   cd lensdiff
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start local development server:
   ```bash
   npm run dev
   ```

### 3. Submitting Pull Requests
- Keep changes focused and concise.
- Ensure TypeScript passes without errors (`npm run build`).
- Follow established code style & formatting (`npm run lint`).
- Write clear, descriptive commit messages following Conventional Commits format (`feat:`, `fix:`, `docs:`, `perf:`).

## Code Guidelines
- **Zero Backend Dependency**: DiffLens is 100% client-side. Do not introduce external cloud APIs or backend network calls for image processing.
- **Performance First**: Ensure heavy canvas rendering uses `requestAnimationFrame` and memory-efficient `URL.createObjectURL`.
