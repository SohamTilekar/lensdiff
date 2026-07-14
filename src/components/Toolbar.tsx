import React from 'react';
import {
  Sliders,
  Columns,
  Eye,
  Layers,
  ArrowLeftRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { usePanZoom } from '../hooks/usePanZoom';
import type { ComparisonMode, SliderStyle } from '../types';

export const Toolbar: React.FC = () => {
  const mode = useAppStore((s) => s.mode);
  const setMode = useAppStore((s) => s.setMode);
  const splitOrientation = useAppStore((s) => s.splitOrientation);
  const setSplitOrientation = useAppStore((s) => s.setSplitOrientation);
  const sliderStyle = useAppStore((s) => s.sliderStyle);
  const setSliderStyle = useAppStore((s) => s.setSliderStyle);
  const swapImages = useAppStore((s) => s.swapImages);

  const { scale, zoomIn, zoomOut, resetPanZoom } = usePanZoom();

  const modes: { id: ComparisonMode; label: string; icon: React.ReactNode; shortcut: string }[] = [
    { id: 'split', label: 'Split Slider', icon: <Sliders className="w-3.5 h-3.5" />, shortcut: '1' },
    { id: 'side-by-side', label: 'Side by Side', icon: <Columns className="w-3.5 h-3.5" />, shortcut: '2' },
    { id: 'blink', label: 'Blink', icon: <Eye className="w-3.5 h-3.5" />, shortcut: '3' },
    { id: 'onion-skin', label: 'Onion Skin', icon: <Layers className="w-3.5 h-3.5" />, shortcut: '4' },
  ];

  return (
    <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300 select-none">
      {/* Mode selector */}
      <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            title={`${m.label} (${m.shortcut})`}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md font-medium transition cursor-pointer ${
              mode === m.id
                ? 'bg-sky-500 text-slate-950 font-semibold shadow-sm'
                : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {m.icon}
            <span className="hidden sm:inline">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Split orientation toggle */}
      {mode === 'split' && (
        <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          {(['vertical', 'horizontal'] as const).map((o) => (
            <button
              key={o}
              onClick={() => setSplitOrientation(o)}
              className={`px-2.5 py-1 rounded text-xs capitalize transition cursor-pointer ${
                splitOrientation === o ? 'bg-slate-800 text-sky-400 font-semibold' : 'text-slate-400'
              }`}
            >
              {o}
            </button>
          ))}
          <div className="w-px h-4 bg-slate-700 mx-1"></div>
          {(['default', 'white', 'black', 'transparent'] as SliderStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => setSliderStyle(style)}
              className={`px-2 py-1 rounded text-xs capitalize transition cursor-pointer ${
                sliderStyle === style ? 'bg-slate-800 text-sky-400 font-semibold' : 'text-slate-400'
              }`}
              title={`${style} slider style`}
            >
              {style === 'transparent' ? '0px' : style}
            </button>
          ))}
        </div>
      )}

      {/* Zoom + Swap */}
      <div className="flex items-center gap-2 ml-auto">
        <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-lg border border-slate-800">
          <button onClick={zoomOut} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition cursor-pointer" title="Zoom Out">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 font-mono text-slate-300 min-w-[50px] text-center">{Math.round(scale * 100)}%</span>
          <button onClick={zoomIn} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition cursor-pointer" title="Zoom In">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button onClick={resetPanZoom} className="p-1.5 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition cursor-pointer" title="Fit to Screen (0)">
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          onClick={swapImages}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition cursor-pointer font-medium"
          title="Swap Before & After (S)"
        >
          <ArrowLeftRight className="w-3.5 h-3.5 text-sky-400" />
          <span>Swap</span>
        </button>
      </div>
    </div>
  );
};
