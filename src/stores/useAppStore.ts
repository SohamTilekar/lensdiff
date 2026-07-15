import { create } from 'zustand';
import type {
  ComparisonMode,
  SplitOrientation,
  ImageMetadata,
  HistoryItem,
  PanZoomState,
  SliderStyle,
} from '../types';
import { saveHistoryItem, getHistory, deleteHistoryItem as deleteDbHistory, clearHistory as clearDbHistory } from '../services/db';

interface AppState {
  // Navigation View
  view: 'landing' | 'workspace';
  setView: (view: 'landing' | 'workspace') => void;

  // Images State
  beforeUrl: string | null;
  afterUrl: string | null;
  beforeMeta: ImageMetadata | null;
  afterMeta: ImageMetadata | null;
  beforeElement: HTMLImageElement | null;
  afterElement: HTMLImageElement | null;
  setImages: (beforeUrl: string, afterUrl: string, beforeMeta?: ImageMetadata, afterMeta?: ImageMetadata) => void;
  swapImages: () => void;
  clearImages: () => void;

  // Comparison Controls
  mode: ComparisonMode;
  setMode: (mode: ComparisonMode) => void;
  splitOrientation: SplitOrientation;
  setSplitOrientation: (orientation: SplitOrientation) => void;
  splitPos: number; // 0 to 100
  setSplitPos: (pos: number) => void;
  sliderStyle: SliderStyle;
  setSliderStyle: (style: SliderStyle) => void;

  // Onion Skin
  onionOpacity: number; // 0 to 100
  setOnionOpacity: (opacity: number) => void;

  // Blink
  blinkSpeed: number; // ms
  setBlinkSpeed: (speed: number) => void;
  isBlinking: boolean;
  setIsBlinking: (blinking: boolean) => void;
  blinkActiveImage: 'before' | 'after';
  setBlinkActiveImage: (img: 'before' | 'after') => void;

  // Pan Zoom State
  panZoom: PanZoomState;
  setPanZoom: (panZoom: Partial<PanZoomState>) => void;
  resetPanZoom: () => void;

  // Modals & UI Controls
  showCommandPalette: boolean;
  setShowCommandPalette: (show: boolean) => void;
  showShortcutsModal: boolean;
  setShowShortcutsModal: (show: boolean) => void;
  showPrivacyModal: boolean;
  setShowPrivacyModal: (show: boolean) => void;
  showHistoryModal: boolean;
  setShowHistoryModal: (show: boolean) => void;

  // Local History
  history: HistoryItem[];
  loadHistory: () => Promise<void>;
  saveCurrentToHistory: (name: string) => Promise<void>;
  deleteHistoryItem: (id: string) => Promise<void>;
  clearHistory: () => Promise<void>;

  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Navigation View
  view: 'landing',
  setView: (view) => set({ view }),

  // Images State
  beforeUrl: null,
  afterUrl: null,
  beforeMeta: null,
  afterMeta: null,
  beforeElement: null,
  afterElement: null,

  setImages: (beforeUrl, afterUrl, beforeMeta, afterMeta) => {
    const img1 = new Image();
    img1.crossOrigin = 'anonymous';
    img1.src = beforeUrl;

    const img2 = new Image();
    img2.crossOrigin = 'anonymous';
    img2.src = afterUrl;

    let loadedCount = 0;
    const checkLoaded = async () => {
      loadedCount++;
      if (loadedCount === 2) {
        const resolveSize = async (url: string, providedSize?: number): Promise<number> => {
          if (providedSize && providedSize > 0) return providedSize;
          if (url.startsWith('data:')) {
            const base64Index = url.indexOf(',');
            if (base64Index !== -1) {
              const base64Str = url.slice(base64Index + 1);
              const padding = (base64Str.match(/=/g) || []).length;
              return Math.round((base64Str.length * 3) / 4 - padding);
            }
          }
          try {
            const res = await fetch(url);
            const blob = await res.blob();
            return blob.size;
          } catch {
            return 0;
          }
        };

        const bSize = await resolveSize(beforeUrl, beforeMeta?.size);
        const aSize = await resolveSize(afterUrl, afterMeta?.size);

        const bMeta: ImageMetadata = {
          name: beforeMeta?.name || 'Image A (Before)',
          width: img1.naturalWidth || 800,
          height: img1.naturalHeight || 600,
          size: bSize,
          type: beforeMeta?.type || 'image/png',
          lastModified: beforeMeta?.lastModified,
          aspectRatio: (img1.naturalWidth || 1) / (img1.naturalHeight || 1),
        };
        const aMeta: ImageMetadata = {
          name: afterMeta?.name || 'Image B (After)',
          width: img2.naturalWidth || 800,
          height: img2.naturalHeight || 600,
          size: aSize,
          type: afterMeta?.type || 'image/png',
          lastModified: afterMeta?.lastModified,
          aspectRatio: (img2.naturalWidth || 1) / (img2.naturalHeight || 1),
        };

        set({
          beforeUrl,
          afterUrl,
          beforeMeta: bMeta,
          afterMeta: aMeta,
          beforeElement: img1,
          afterElement: img2,
          view: 'workspace',
          panZoom: { scale: 1, positionX: 0, positionY: 0 },
        });
      }
    };

    img1.onload = checkLoaded;
    img2.onload = checkLoaded;

    if (img1.complete) checkLoaded();
    if (img2.complete) checkLoaded();
  },

  swapImages: () => {
    const { beforeUrl, afterUrl, beforeMeta, afterMeta, beforeElement, afterElement } = get();
    if (!beforeUrl || !afterUrl) return;

    set({
      beforeUrl: afterUrl,
      afterUrl: beforeUrl,
      beforeMeta: afterMeta,
      afterMeta: beforeMeta,
      beforeElement: afterElement,
      afterElement: beforeElement,
    });
  },

  clearImages: () =>
    set({
      beforeUrl: null,
      afterUrl: null,
      beforeMeta: null,
      afterMeta: null,
      beforeElement: null,
      afterElement: null,
      view: 'landing',
    }),

  // Comparison Controls
  mode: 'split',
  setMode: (mode) => set({ mode }),
  splitOrientation: 'vertical',
  setSplitOrientation: (splitOrientation) => set({ splitOrientation }),
  splitPos: 50,
  setSplitPos: (splitPos) => set({ splitPos }),
  sliderStyle: 'default',
  setSliderStyle: (sliderStyle) => set({ sliderStyle }),

  // Onion Skin
  onionOpacity: 50,
  setOnionOpacity: (onionOpacity) => set({ onionOpacity }),

  // Blink
  blinkSpeed: 500,
  setBlinkSpeed: (blinkSpeed) => set({ blinkSpeed }),
  isBlinking: false,
  setIsBlinking: (isBlinking) => set({ isBlinking }),
  blinkActiveImage: 'before',
  setBlinkActiveImage: (blinkActiveImage) => set({ blinkActiveImage }),

  // Pan Zoom State
  panZoom: { scale: 1, positionX: 0, positionY: 0 },
  setPanZoom: (update) =>
    set((state) => ({
      panZoom: { ...state.panZoom, ...update },
    })),
  resetPanZoom: () => set({ panZoom: { scale: 1, positionX: 0, positionY: 0 } }),

  // Modals & UI Controls
  showCommandPalette: false,
  setShowCommandPalette: (showCommandPalette) => set({ showCommandPalette }),
  showShortcutsModal: false,
  setShowShortcutsModal: (showShortcutsModal) => set({ showShortcutsModal }),
  showPrivacyModal: false,
  setShowPrivacyModal: (showPrivacyModal) => set({ showPrivacyModal }),
  showHistoryModal: false,
  setShowHistoryModal: (showHistoryModal) => set({ showHistoryModal }),

  // Local History
  history: [],
  loadHistory: async () => {
    const items = await getHistory();
    set({ history: items });
  },

  saveCurrentToHistory: async (name: string) => {
    const { beforeUrl, afterUrl, beforeMeta, afterMeta } = get();
    if (!beforeUrl || !afterUrl || !beforeMeta || !afterMeta) return;

    const item: HistoryItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: name || `Comparison ${new Date().toLocaleDateString()}`,
      timestamp: Date.now(),
      beforeUrl,
      afterUrl,
      beforeMeta,
      afterMeta,
      thumbnailUrl: afterUrl,
    };

    await saveHistoryItem(item);
    await get().loadHistory();
  },

  deleteHistoryItem: async (id: string) => {
    await deleteDbHistory(id);
    await get().loadHistory();
  },

  clearHistory: async () => {
    await clearDbHistory();
    set({ history: [] });
  },

  // Theme
  theme: 'dark',
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof document !== 'undefined') {
        document.documentElement.classList.toggle('dark', next === 'dark');
      }
      return { theme: next };
    }),
}));
