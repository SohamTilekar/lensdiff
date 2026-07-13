import { describe, it, expect } from 'vitest';
import { formatBytes, formatAspectRatio } from '../utils/formatters';

describe('Formatters', () => {
  it('formats bytes correctly', () => {
    expect(formatBytes(0)).toBe('0 Bytes');
    expect(formatBytes(1024)).toBe('1 KB');
    expect(formatBytes(1048576)).toBe('1 MB');
    expect(formatBytes(5242880)).toBe('5 MB');
  });

  it('formats aspect ratio correctly', () => {
    expect(formatAspectRatio(1920, 1080)).toBe('16:9');
    expect(formatAspectRatio(1080, 1080)).toBe('1:1');
    expect(formatAspectRatio(1200, 800)).toBe('3:2');
  });
});
