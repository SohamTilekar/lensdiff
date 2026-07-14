import React, { useRef, useEffect, useCallback } from 'react';
import { useAppStore } from '../stores/useAppStore';
import { getCheckerboardPattern } from '../services/imageProcessing';

export const ComparisonCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sideCanvasRef = useRef<HTMLCanvasElement>(null);
  const renderScheduled = useRef(false);

  const beforeElement = useAppStore((s) => s.beforeElement);
  const afterElement = useAppStore((s) => s.afterElement);
  const mode = useAppStore((s) => s.mode);
  const splitOrientation = useAppStore((s) => s.splitOrientation);
  const splitPos = useAppStore((s) => s.splitPos);
  const setSplitPos = useAppStore((s) => s.setSplitPos);
  const sliderStyle = useAppStore((s) => s.sliderStyle);
  const setPanZoom = useAppStore((s) => s.setPanZoom);
  const panZoom = useAppStore((s) => s.panZoom);
  const onionOpacity = useAppStore((s) => s.onionOpacity);
  const setOnionOpacity = useAppStore((s) => s.setOnionOpacity);
  const blinkSpeed = useAppStore((s) => s.blinkSpeed);
  const isBlinking = useAppStore((s) => s.isBlinking);
  const blinkActiveImage = useAppStore((s) => s.blinkActiveImage);
  const setBlinkActiveImage = useAppStore((s) => s.setBlinkActiveImage);

  const { scale, positionX, positionY } = panZoom;

  // ──────────── RENDER (called on demand, not in a loop) ────────────
  const render = useCallback(() => {
    renderScheduled.current = false;
    const canvas = canvasRef.current;
    if (!canvas || !beforeElement || !afterElement) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const imgW = beforeElement.naturalWidth || 800;
    const imgH = beforeElement.naturalHeight || 600;

    // Background: single pattern fill instead of thousands of fillRects
    ctx.clearRect(0, 0, W, H);
    const pat = getCheckerboardPattern(ctx);
    ctx.fillStyle = pat;
    ctx.fillRect(0, 0, W, H);

    if (mode === 'split') {
      const splitFrac = splitPos / 100;

      // After image (full)
      ctx.save();
      ctx.translate(W / 2 + positionX, H / 2 + positionY);
      ctx.scale(scale, scale);
      ctx.drawImage(afterElement, -imgW / 2, -imgH / 2, imgW, imgH);
      ctx.restore();

      // Before image clipped in screen space
      ctx.save();
      ctx.beginPath();
      if (splitOrientation === 'vertical') {
        ctx.rect(0, 0, W * splitFrac, H);
      } else {
        ctx.rect(0, 0, W, H * splitFrac);
      }
      ctx.clip();
      ctx.translate(W / 2 + positionX, H / 2 + positionY);
      ctx.scale(scale, scale);
      ctx.drawImage(beforeElement, -imgW / 2, -imgH / 2, imgW, imgH);
      ctx.restore();

      // Divider line
      if (sliderStyle !== 'transparent') {
        ctx.save();
        if (sliderStyle === 'default') {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.shadowColor = '#38bdf8';
          ctx.shadowBlur = 6;
        } else if (sliderStyle === 'white') {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
        } else if (sliderStyle === 'black') {
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 2;
        }
        ctx.beginPath();
        if (splitOrientation === 'vertical') {
          const lx = W * splitFrac;
          ctx.moveTo(lx, 0);
          ctx.lineTo(lx, H);
        } else {
          const ly = H * splitFrac;
          ctx.moveTo(0, ly);
          ctx.lineTo(W, ly);
        }
        ctx.stroke();
        ctx.restore();
      }
    } else {
      ctx.save();
      ctx.translate(W / 2 + positionX, H / 2 + positionY);
      ctx.scale(scale, scale);
      const dx = -imgW / 2, dy = -imgH / 2;

      if (mode === 'onion-skin') {
        ctx.drawImage(beforeElement, dx, dy, imgW, imgH);
        ctx.globalAlpha = onionOpacity / 100;
        ctx.drawImage(afterElement, dx, dy, imgW, imgH);
      } else if (mode === 'blink') {
        ctx.drawImage(blinkActiveImage === 'before' ? beforeElement : afterElement, dx, dy, imgW, imgH);
      } else if (mode === 'side-by-side') {
        ctx.drawImage(beforeElement, dx, dy, imgW, imgH);
      }
      ctx.restore();
    }

    // Side-by-side right canvas
    if (mode === 'side-by-side' && sideCanvasRef.current) {
      const sc = sideCanvasRef.current;
      const sCtx = sc.getContext('2d');
      if (sCtx) {
        sCtx.clearRect(0, 0, sc.width, sc.height);
        sCtx.fillStyle = getCheckerboardPattern(sCtx);
        sCtx.fillRect(0, 0, sc.width, sc.height);
        sCtx.save();
        sCtx.translate(sc.width / 2 + positionX, sc.height / 2 + positionY);
        sCtx.scale(scale, scale);
        sCtx.drawImage(afterElement, -imgW / 2, -imgH / 2, imgW, imgH);
        sCtx.restore();
      }
    }
  }, [
    beforeElement, afterElement, mode, splitOrientation, splitPos,
    onionOpacity, blinkActiveImage, scale, positionX, positionY, sliderStyle
  ]);

  // Re-render exactly once per visual state change, avoiding stale closures
  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      render();
    });
    return () => cancelAnimationFrame(frameId);
  }, [render]);

  // Fit image to screen bounds automatically
  const computeFitScale = useCallback(() => {
    const canvas = canvasRef.current;
    const img = beforeElement || afterElement;
    if (!canvas || !img) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth || 800;
    const ih = img.naturalHeight || 600;
    const fitScale = Math.min(cw / iw, ch / ih) * 0.9;
    setPanZoom({ scale: fitScale, positionX: 0, positionY: 0 });
  }, [beforeElement, afterElement, setPanZoom]);

  // Blink interval
  useEffect(() => {
    if (mode !== 'blink' || !isBlinking) return;
    const id = setInterval(() => {
      setBlinkActiveImage(blinkActiveImage === 'before' ? 'after' : 'before');
    }, blinkSpeed);
    return () => clearInterval(id);
  }, [mode, isBlinking, blinkSpeed, blinkActiveImage, setBlinkActiveImage]);

  // Container resize handler
  useEffect(() => {
    const resize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      const { width, height } = container.getBoundingClientRect();
      const halfW = mode === 'side-by-side' ? width / 2 : width;
      canvas.width = halfW;
      canvas.height = height;
      if (sideCanvasRef.current) {
        sideCanvasRef.current.width = width / 2;
        sideCanvasRef.current.height = height;
      }
      computeFitScale();
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [mode, computeFitScale]);

  // ──────────── MOUSE INTERACTION ────────────
  const isDraggingSplit = useRef(false);
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (isDraggingSplit.current) return;
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY, px: panZoom.positionX, py: panZoom.positionY };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDraggingSplit.current && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (splitOrientation === 'vertical') {
        setSplitPos(Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)));
      } else {
        setSplitPos(Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100)));
      }
      return;
    }
    if (!isPanning.current) return;
    setPanZoom({
      positionX: panStart.current.px + e.clientX - panStart.current.x,
      positionY: panStart.current.py + e.clientY - panStart.current.y,
    });
  };

  const onMouseUp = () => {
    isDraggingSplit.current = false;
    isPanning.current = false;
  };

  const onWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    setPanZoom({ scale: Math.min(20, Math.max(0.05, panZoom.scale * factor)) });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex-1 w-full h-full bg-slate-950 overflow-hidden select-none cursor-grab active:cursor-grabbing flex"
      onWheel={onWheel}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Overlay Controls — stopPropagation prevents canvas pan */}
      <div
        className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-3 bg-slate-900/90 border border-slate-800 p-2 rounded-xl backdrop-blur-md text-xs"
        onMouseDown={(e) => e.stopPropagation()}
        onMouseMove={(e) => e.stopPropagation()}
      >
        {mode === 'onion-skin' && (
          <div className="flex items-center gap-2 px-2">
            <span className="text-slate-400 font-medium">Opacity:</span>
            <input type="range" min="0" max="100" value={onionOpacity}
              onChange={(e) => setOnionOpacity(Number(e.target.value))}
              className="w-28 accent-sky-500 cursor-pointer" />
            <span className="font-mono text-sky-400 w-8">{onionOpacity}%</span>
          </div>
        )}

        {mode === 'blink' && (
          <div className="flex items-center gap-2 px-2">
            <button
              onClick={() => useAppStore.getState().setIsBlinking(!isBlinking)}
              className={`px-3 py-1 rounded font-semibold transition cursor-pointer ${
                isBlinking ? 'bg-sky-500 text-slate-950' : 'bg-slate-800 text-slate-200'
              }`}
            >
              {isBlinking ? 'Pause' : 'Start'}
            </button>
            <span className="text-slate-400">Speed:</span>
            <input type="range" min="100" max="1500" step="50" value={blinkSpeed}
              onChange={(e) => useAppStore.getState().setBlinkSpeed(Number(e.target.value))}
              className="w-24 accent-sky-500 cursor-pointer" />
            <span className="font-mono text-slate-300 w-12">{blinkSpeed}ms</span>
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none">
        <span className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-xs font-semibold text-sky-400 backdrop-blur-sm">
          {mode === 'blink'
            ? blinkActiveImage === 'before' ? 'BEFORE' : 'AFTER'
            : mode === 'side-by-side' ? 'BEFORE' : 'BEFORE / AFTER'}
        </span>
      </div>
      {mode === 'side-by-side' && (
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none">
          <span className="px-3 py-1 rounded-md bg-slate-900/80 border border-slate-800 text-xs font-semibold text-purple-400 backdrop-blur-sm">
            AFTER
          </span>
        </div>
      )}

      {/* Canvas */}
      <canvas ref={canvasRef} className="block w-full h-full" />
      {mode === 'side-by-side' && (
        <canvas ref={sideCanvasRef} className="block w-full h-full border-l border-slate-800" />
      )}

      {/* Split drag handle */}
      {mode === 'split' && (
        <div
          onMouseDown={(e) => { e.stopPropagation(); isDraggingSplit.current = true; }}
          style={{
            left: splitOrientation === 'vertical' ? `${splitPos}%` : '50%',
            top: splitOrientation === 'horizontal' ? `${splitPos}%` : '50%',
            transform: 'translate(-50%, -50%)',
          }}
          className={`absolute z-30 w-8 h-8 rounded-full border-2 flex items-center justify-center cursor-ew-resize hover:scale-110 active:scale-95 transition-transform ${
            sliderStyle === 'default'
              ? 'bg-sky-500 shadow-lg shadow-sky-500/40 border-slate-900'
              : sliderStyle === 'white'
              ? 'bg-white shadow-lg border-slate-300'
              : sliderStyle === 'black'
              ? 'bg-black shadow-lg border-slate-700'
              : 'bg-white/50 backdrop-blur-sm border-white/50 shadow-md' // transparent mode blob
          }`}
        >
          <div className="flex gap-0.5">
            <div className={`w-0.5 h-3 rounded-full ${sliderStyle === 'black' ? 'bg-slate-500' : 'bg-slate-900'}`} />
            <div className={`w-0.5 h-3 rounded-full ${sliderStyle === 'black' ? 'bg-slate-500' : 'bg-slate-900'}`} />
          </div>
        </div>
      )}
    </div>
  );
};
