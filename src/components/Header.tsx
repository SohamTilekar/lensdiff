import React from 'react';
import { ShieldCheck, Command, HelpCircle, History, Sparkles, Sun, Moon } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { Button } from './ui/Button';

export const Header: React.FC = () => {
  const view = useAppStore((state) => state.view);
  const setView = useAppStore((state) => state.setView);
  const beforeUrl = useAppStore((state) => state.beforeUrl);
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);
  const setShowCommandPalette = useAppStore((state) => state.setShowCommandPalette);
  const setShowShortcutsModal = useAppStore((state) => state.setShowShortcutsModal);
  const setShowHistoryModal = useAppStore((state) => state.setShowHistoryModal);
  const setShowPrivacyModal = useAppStore((state) => state.setShowPrivacyModal);

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3 flex items-center justify-between transition-colors">
      {/* Brand & Logo */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setView('landing')}
          className="flex items-center gap-2.5 group cursor-pointer text-left"
        >
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-sky-500 via-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-tight text-slate-100 group-hover:text-sky-400 transition-colors">
                DiffLens
              </span>
              <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                100% Offline
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">See what changed.</p>
          </div>
        </button>

        {view === 'workspace' && beforeUrl && (
          <button
            onClick={() => setView('landing')}
            className="text-xs text-slate-400 hover:text-slate-200 border-l border-slate-800 pl-4 py-1 flex items-center gap-1 transition"
          >
            ← Back to Landing
          </button>
        )}
      </div>

      {/* Center Privacy Badge */}
      <button
        onClick={() => setShowPrivacyModal(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium transition cursor-pointer"
      >
        <ShieldCheck className="w-3.5 h-3.5" />
        <span>Privacy First — Images Never Leave Your Browser</span>
      </button>

      {/* Action Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowCommandPalette(true)}
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer"
          title="Command Palette (Cmd+K)"
        >
          <Command className="w-3.5 h-3.5 text-slate-400" />
          <span>Search & Commands</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-400">
            ⌘K
          </kbd>
        </button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowHistoryModal(true)}
          title="Recent Comparisons (H)"
        >
          <History className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowShortcutsModal(true)}
          title="Keyboard Shortcuts (?)"
        >
          <HelpCircle className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          title="Toggle Dark/Light Mode"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>
    </header>
  );
};
