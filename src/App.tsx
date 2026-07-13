import React from 'react';
import { useAppStore } from './stores/useAppStore';
import { LandingPage } from './components/LandingPage';
import { Workspace } from './components/Workspace';
import { Header } from './components/Header';
import { CommandPalette } from './components/CommandPalette';
import { HistoryPanel } from './components/HistoryPanel';
import { KeyboardShortcutsModal } from './components/KeyboardShortcutsModal';
import { PrivacyNotice } from './components/PrivacyNotice';

export const App: React.FC = () => {
  const view = useAppStore((state) => state.view);
  const beforeUrl = useAppStore((state) => state.beforeUrl);

  if (view === 'workspace' && beforeUrl) {
    return <Workspace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header />
      <LandingPage />

      {/* Global Modals on Landing Page */}
      <CommandPalette />
      <HistoryPanel />
      <KeyboardShortcutsModal />
      <PrivacyNotice />
    </div>
  );
};

export default App;
