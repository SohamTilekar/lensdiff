import { useCallback } from 'react';
import { useAppStore } from '../stores/useAppStore';

export function usePanZoom() {
  const panZoom = useAppStore((s) => s.panZoom);
  const setPanZoom = useAppStore((s) => s.setPanZoom);
  const resetPanZoom = useAppStore((s) => s.resetPanZoom);

  const zoomIn = useCallback(() => {
    setPanZoom({ scale: Math.min(panZoom.scale * 1.25, 20) });
  }, [panZoom.scale, setPanZoom]);

  const zoomOut = useCallback(() => {
    setPanZoom({ scale: Math.max(panZoom.scale / 1.25, 0.05) });
  }, [panZoom.scale, setPanZoom]);

  return {
    scale: panZoom.scale,
    positionX: panZoom.positionX,
    positionY: panZoom.positionY,
    zoomIn,
    zoomOut,
    resetPanZoom,
  };
}
