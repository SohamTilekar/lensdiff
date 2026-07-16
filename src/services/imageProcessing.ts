/**
 * Create a cached checkerboard CanvasPattern — drawn once, reused forever.
 * This replaces the old drawCheckerboard that painted thousands of fillRects per frame.
 */
let cachedPattern: CanvasPattern | null = null;

export function getCheckerboardPattern(ctx: CanvasRenderingContext2D): CanvasPattern {
  if (cachedPattern) return cachedPattern;

  const size = 16;
  const tile = document.createElement('canvas');
  tile.width = size * 2;
  tile.height = size * 2;
  const tc = tile.getContext('2d')!;

  tc.fillStyle = '#242736';
  tc.fillRect(0, 0, size * 2, size * 2);

  tc.fillStyle = '#181926';
  tc.fillRect(size, 0, size, size);
  tc.fillRect(0, size, size, size);

  cachedPattern = ctx.createPattern(tile, 'repeat')!;
  return cachedPattern;
}
