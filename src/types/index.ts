export type ComparisonMode = 'split' | 'side-by-side' | 'blink' | 'onion-skin';

export type SplitOrientation = 'vertical' | 'horizontal';

export type SliderStyle = 'default' | 'white' | 'black' | 'transparent';

export interface ImageMetadata {
  name: string;
  width: number;
  height: number;
  size: number;
  type: string;
  lastModified?: number;
  aspectRatio: number;
}

export interface ImagePair {
  beforeUrl: string;
  afterUrl: string;
  beforeMeta?: ImageMetadata;
  afterMeta?: ImageMetadata;
  beforeElement?: HTMLImageElement;
  afterElement?: HTMLImageElement;
}

export interface HistoryItem {
  id: string;
  name: string;
  timestamp: number;
  beforeUrl: string;
  afterUrl: string;
  beforeMeta: ImageMetadata;
  afterMeta: ImageMetadata;
  thumbnailUrl: string;
}

export interface PanZoomState {
  scale: number;
  positionX: number;
  positionY: number;
}
