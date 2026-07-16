import React, { useState } from 'react';
import { Info, ChevronRight, ChevronLeft } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { formatBytes, formatAspectRatio } from '../utils/formatters';

export const AnalysisPanel: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const beforeMeta = useAppStore((s) => s.beforeMeta);
  const afterMeta = useAppStore((s) => s.afterMeta);

  if (collapsed) {
    return (
      <div className="bg-slate-900 border-l border-slate-800 p-2 flex flex-col items-center">
        <button
          onClick={() => setCollapsed(false)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition cursor-pointer"
          title="Expand Metadata Panel"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-72 bg-slate-900/95 border-l border-slate-800 flex flex-col h-full text-slate-200 select-none z-20">
      {/* Panel Header */}
      <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-sky-400" />
          <h3 className="font-semibold text-sm text-slate-100">Image Metadata</h3>
        </div>
        <button
          onClick={() => setCollapsed(true)}
          className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition cursor-pointer"
          title="Collapse Panel"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 overflow-y-auto flex-1 space-y-4 text-xs">
        {[
          { label: 'Before Image (A)', color: 'text-sky-400', meta: beforeMeta },
          { label: 'After Image (B)', color: 'text-purple-400', meta: afterMeta },
        ].map(({ label, color, meta }) => (
          <div key={label} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
            <span className={`font-semibold ${color}`}>{label}</span>
            {meta ? (
              <ul className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                <li className="flex justify-between border-b border-slate-800/60 pb-1">
                  <span className="text-slate-400">Name:</span>
                  <span className="truncate max-w-[140px]" title={meta.name}>{meta.name}</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/60 pb-1">
                  <span className="text-slate-400">Resolution:</span>
                  <span>{meta.width} × {meta.height} px</span>
                </li>
                <li className="flex justify-between border-b border-slate-800/60 pb-1">
                  <span className="text-slate-400">Aspect Ratio:</span>
                  <span>{formatAspectRatio(meta.width, meta.height)}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-slate-400">File Size:</span>
                  <span>{formatBytes(meta.size)}</span>
                </li>
              </ul>
            ) : (
              <p className="text-slate-400">—</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
