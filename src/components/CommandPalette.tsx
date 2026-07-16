import React, { useState, useEffect } from 'react';
import { Search, Sliders, Columns, Eye, Layers, ArrowLeftRight, Maximize2, Sun } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { Modal } from './ui/Modal';

export const CommandPalette: React.FC = () => {
  const showCommandPalette = useAppStore((state) => state.showCommandPalette);
  const setShowCommandPalette = useAppStore((state) => state.setShowCommandPalette);
  const setMode = useAppStore((state) => state.setMode);
  const swapImages = useAppStore((state) => state.swapImages);
  const resetPanZoom = useAppStore((state) => state.resetPanZoom);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (showCommandPalette) setQuery('');
  }, [showCommandPalette]);

  const commands = [
    {
      id: 'split',
      label: 'Switch to Split Slider Mode',
      icon: <Sliders className="w-4 h-4 text-sky-400" />,
      action: () => setMode('split'),
    },
    {
      id: 'side-by-side',
      label: 'Switch to Side-by-Side Mode',
      icon: <Columns className="w-4 h-4 text-purple-400" />,
      action: () => setMode('side-by-side'),
    },
    {
      id: 'blink',
      label: 'Switch to Blink Mode',
      icon: <Eye className="w-4 h-4 text-amber-400" />,
      action: () => setMode('blink'),
    },
    {
      id: 'onion-skin',
      label: 'Switch to Onion Skin Mode',
      icon: <Layers className="w-4 h-4 text-indigo-400" />,
      action: () => setMode('onion-skin'),
    },
    {
      id: 'swap',
      label: 'Swap Before & After Images',
      icon: <ArrowLeftRight className="w-4 h-4 text-emerald-400" />,
      action: () => swapImages(),
    },
    {
      id: 'reset-zoom',
      label: 'Fit to Screen (100%)',
      icon: <Maximize2 className="w-4 h-4 text-slate-400" />,
      action: () => resetPanZoom(),
    },
    {
      id: 'theme',
      label: 'Toggle Dark / Light Theme',
      icon: <Sun className="w-4 h-4 text-amber-400" />,
      action: () => toggleTheme(),
    },
  ];

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (action: () => void) => {
    action();
    setShowCommandPalette(false);
  };

  return (
    <Modal
      isOpen={showCommandPalette}
      onClose={() => setShowCommandPalette(false)}
      title="Command Palette"
      maxWidth="md"
    >
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Type a command or shortcut..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            autoFocus
          />
        </div>

        <div className="max-h-64 overflow-y-auto space-y-1 py-1">
          {filtered.length > 0 ? (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => handleSelect(cmd.action)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-200 hover:bg-slate-800 hover:text-white transition cursor-pointer text-left"
              >
                {cmd.icon}
                <span>{cmd.label}</span>
              </button>
            ))
          ) : (
            <p className="text-center text-xs text-slate-500 py-6">No matching commands found.</p>
          )}
        </div>
      </div>
    </Modal>
  );
};
