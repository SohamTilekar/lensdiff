# Changelog

All notable changes to **DiffLens** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-07-17

### Added
- **Interactive Comparison Engine**:
  - Split-Screen Slider (with vertical & horizontal orientation).
  - 4 customizable slider styles (`default`, `white`, `black`, `transparent`).
  - Side-by-Side dual synced viewport comparison.
  - Blink inspection mode with configurable speed interval (100ms - 1500ms).
  - Onion-Skin opacity overlay mode (0% - 100%).
- **Synchronized Navigation**: Smooth pan and zoom up to 2000% across viewports.
- **Image Metadata Panel**: Displays image resolution, aspect ratio, MIME type, and exact file size in bytes.
- **Command Palette & Hotkeys**: Instant keyboard navigation (`1-4`, `S`, `0`, `Ctrl+K`).
- **Sample Presets**: UI Redesign (v1 vs. v2) and Landscape Sunset Color Grading presets.
- **GitHub Pages Pipeline**: Automated `gh-pages` deployment via GitHub Actions.

### Performance
- Migrated image loading from Base64 Data URLs to memory-efficient `URL.createObjectURL` to prevent browser tab freezes.
- Pre-rendered checkerboard background using cached `CanvasPattern` tiles.
- On-demand `requestAnimationFrame` render loop to prevent continuous idle CPU usage.
