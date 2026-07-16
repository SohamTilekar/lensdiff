import React from 'react';
import { useAppStore } from '../stores/useAppStore';
import { Modal } from './ui/Modal';

export const KeyboardShortcutsModal: React.FC = () => {
  const showShortcutsModal = useAppStore((state) => state.showShortcutsModal);
  const setShowShortcutsModal = useAppStore((state) => state.setShowShortcutsModal);

  const shortcuts = [
    { key: '1 - 4', label: 'Switch Modes (Split, Side-by-Side, Blink, Onion Skin)' },
    { key: 'Space', label: 'Toggle / Pause Blink Inspection' },
    { key: '⌘ + K / Ctrl + K', label: 'Open Command Palette' },
    { key: 'S', label: 'Swap Before and After Images' },
    { key: '+ / -', label: 'Zoom In / Zoom Out' },
    { key: '0', label: 'Reset Pan and Zoom (Fit to Screen)' },
    { key: 'H', label: 'Open Recent Comparisons History' },
    { key: '?', label: 'Open Keyboard Shortcuts' },
  ];

  return (
    <Modal
      isOpen={showShortcutsModal}
      onClose={() => setShowShortcutsModal(false)}
      title="Keyboard & Touch Shortcuts"
      maxWidth="md"
    >
      <div className="space-y-2">
        {shortcuts.map((s, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs"
          >
            <span className="text-slate-300 font-medium">{s.label}</span>
            <kbd className="px-2 py-1 font-mono text-[11px] bg-slate-800 text-sky-400 border border-slate-700 rounded font-semibold">
              {s.key}
            </kbd>
          </div>
        ))}
      </div>
    </Modal>
  );
};
