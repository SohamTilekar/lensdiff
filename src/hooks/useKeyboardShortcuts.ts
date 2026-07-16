import { useEffect } from 'react';
import { useAppStore } from '../stores/useAppStore';

export function useKeyboardShortcuts() {
  const setMode = useAppStore((state) => state.setMode);
  const swapImages = useAppStore((state) => state.swapImages);
  const resetPanZoom = useAppStore((state) => state.resetPanZoom);
  const setShowCommandPalette = useAppStore((state) => state.setShowCommandPalette);
  const setShowShortcutsModal = useAppStore((state) => state.setShowShortcutsModal);
  const setShowHistoryModal = useAppStore((state) => state.setShowHistoryModal);
  const setIsBlinking = useAppStore((state) => state.setIsBlinking);
  const isBlinking = useAppStore((state) => state.isBlinking);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
        return;
      }

      if (e.key === '1') setMode('split');
      if (e.key === '2') setMode('side-by-side');
      if (e.key === '3') setMode('blink');
      if (e.key === '4') setMode('onion-skin');

      if (e.key.toLowerCase() === 's') swapImages();
      if (e.key === '0') resetPanZoom();
      if (e.key.toLowerCase() === 'h') setShowHistoryModal(true);
      if (e.key === '?') setShowShortcutsModal(true);

      if (e.code === 'Space') {
        e.preventDefault();
        setIsBlinking(!isBlinking);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    setMode,
    swapImages,
    resetPanZoom,
    setShowCommandPalette,
    setShowShortcutsModal,
    setShowHistoryModal,
    setIsBlinking,
    isBlinking,
  ]);
}
