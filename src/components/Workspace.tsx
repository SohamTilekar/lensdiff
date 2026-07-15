import React from 'react';
import { Header } from './Header';
import { Toolbar } from './Toolbar';
import { ComparisonCanvas } from './ComparisonCanvas';
import { AnalysisPanel } from './AnalysisPanel';
import { CommandPalette } from './CommandPalette';
import { HistoryPanel } from './HistoryPanel';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
import { PrivacyNotice } from './PrivacyNotice';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

export const Workspace: React.FC = () => {
  useKeyboardShortcuts();
  // Session is now fully ephemeral for performance

  return (
    <div className="flex flex-col h-screen w-screen bg-slate-950 overflow-hidden text-slate-100 selection:bg-sky-500 selection:text-slate-950">
      <Header />
      <Toolbar />
      <div className="flex flex-1 overflow-hidden relative">
        <ComparisonCanvas />
        <AnalysisPanel />
      </div>

      {/* Modals only — no ExportModal */}
      <CommandPalette />
      <HistoryPanel />
      <KeyboardShortcutsModal />
      <PrivacyNotice />
    </div>
  );
};
