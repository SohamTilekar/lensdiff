// High quality canvas data URL generators for sample comparison pairs

export interface SamplePreset {
  id: string;
  title: string;
  description: string;
  beforeName: string;
  afterName: string;
  getImages: () => { beforeUrl: string; afterUrl: string };
}

function createCanvas(width: number, height: number): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  return { canvas, ctx };
}

/**
 * Preset 1: UI Design Revision (v1 vs v2)
 */
function generateUIDesignPreset() {
  const w = 1200;
  const h = 800;

  // Before (v1)
  const { canvas: c1, ctx: ctx1 } = createCanvas(w, h);
  // Background
  ctx1.fillStyle = '#0f172a';
  ctx1.fillRect(0, 0, w, h);
  
  // Header bar
  ctx1.fillStyle = '#1e293b';
  ctx1.fillRect(40, 40, w - 80, 70);
  ctx1.fillStyle = '#94a3b8';
  ctx1.font = '600 24px sans-serif';
  ctx1.fillText('Dashboard v1.0', 70, 83);
  
  // Card 1
  ctx1.fillStyle = '#1e293b';
  ctx1.beginPath();
  ctx1.roundRect(40, 140, 350, 240, 16);
  ctx1.fill();
  ctx1.fillStyle = '#38bdf8';
  ctx1.font = 'bold 36px sans-serif';
  ctx1.fillText('$48,290', 70, 220);
  ctx1.fillStyle = '#64748b';
  ctx1.font = '16px sans-serif';
  ctx1.fillText('Total Revenue (Old Metric)', 70, 260);

  // Card 2
  ctx1.fillStyle = '#1e293b';
  ctx1.beginPath();
  ctx1.roundRect(420, 140, 350, 240, 16);
  ctx1.fill();
  ctx1.fillStyle = '#a855f7';
  ctx1.font = 'bold 36px sans-serif';
  ctx1.fillText('1,420', 450, 220);
  ctx1.fillStyle = '#64748b';
  ctx1.font = '16px sans-serif';
  ctx1.fillText('Active Users', 450, 260);

  // Main Chart
  ctx1.fillStyle = '#1e293b';
  ctx1.beginPath();
  ctx1.roundRect(40, 410, w - 80, 340, 16);
  ctx1.fill();

  ctx1.strokeStyle = '#38bdf8';
  ctx1.lineWidth = 4;
  ctx1.beginPath();
  ctx1.moveTo(80, 680);
  ctx1.lineTo(250, 600);
  ctx1.lineTo(450, 640);
  ctx1.lineTo(650, 520);
  ctx1.lineTo(850, 560);
  ctx1.lineTo(1100, 470);
  ctx1.stroke();

  // After (v2) - Improvements & differences
  const { canvas: c2, ctx: ctx2 } = createCanvas(w, h);
  // Background
  ctx2.fillStyle = '#090d16'; // darker elegant bg
  ctx2.fillRect(0, 0, w, h);
  
  // Header bar
  ctx2.fillStyle = '#131c2e';
  ctx2.fillRect(40, 40, w - 80, 70);
  ctx2.fillStyle = '#f8fafc';
  ctx2.font = '600 24px sans-serif';
  ctx2.fillText('Analytics Studio v2.4', 70, 83);

  // Added Badge
  ctx2.fillStyle = '#10b981';
  ctx2.beginPath();
  ctx2.roundRect(340, 60, 110, 30, 8);
  ctx2.fill();
  ctx2.fillStyle = '#ffffff';
  ctx2.font = 'bold 12px sans-serif';
  ctx2.fillText('PRO ACTIVE', 355, 80);
  
  // Card 1
  ctx2.fillStyle = '#131c2e';
  ctx2.beginPath();
  ctx2.roundRect(40, 140, 350, 240, 16);
  ctx2.fill();
  ctx2.fillStyle = '#38bdf8';
  ctx2.font = 'bold 42px sans-serif';
  ctx2.fillText('$62,840', 70, 220);
  ctx2.fillStyle = '#10b981';
  ctx2.font = '600 16px sans-serif';
  ctx2.fillText('+ 30.1% vs last month', 70, 260);

  // Card 2
  ctx2.fillStyle = '#131c2e';
  ctx2.beginPath();
  ctx2.roundRect(420, 140, 350, 240, 16);
  ctx2.fill();
  ctx2.fillStyle = '#c084fc';
  ctx2.font = 'bold 42px sans-serif';
  ctx2.fillText('2,890', 450, 220);
  ctx2.fillStyle = '#10b981';
  ctx2.font = '600 16px sans-serif';
  ctx2.fillText('+ 103% new signups', 450, 260);

  // Card 3 (NEW CARD IN V2)
  ctx2.fillStyle = '#131c2e';
  ctx2.beginPath();
  ctx2.roundRect(800, 140, 360, 240, 16);
  ctx2.fill();
  ctx2.fillStyle = '#f43f5e';
  ctx2.font = 'bold 42px sans-serif';
  ctx2.fillText('99.98%', 830, 220);
  ctx2.fillStyle = '#94a3b8';
  ctx2.font = '16px sans-serif';
  ctx2.fillText('System Uptime', 830, 260);

  // Main Chart with Gradient Fill
  ctx2.fillStyle = '#131c2e';
  ctx2.beginPath();
  ctx2.roundRect(40, 410, w - 80, 340, 16);
  ctx2.fill();

  const gradient = ctx2.createLinearGradient(0, 450, 0, 700);
  gradient.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
  gradient.addColorStop(1, 'rgba(56, 189, 248, 0.0)');

  ctx2.beginPath();
  ctx2.moveTo(80, 680);
  ctx2.lineTo(250, 560);
  ctx2.lineTo(450, 610);
  ctx2.lineTo(650, 480);
  ctx2.lineTo(850, 510);
  ctx2.lineTo(1100, 440);
  ctx2.lineTo(1100, 710);
  ctx2.lineTo(80, 710);
  ctx2.closePath();
  ctx2.fillStyle = gradient;
  ctx2.fill();

  ctx2.strokeStyle = '#38bdf8';
  ctx2.lineWidth = 4;
  ctx2.beginPath();
  ctx2.moveTo(80, 680);
  ctx2.lineTo(250, 560);
  ctx2.lineTo(450, 610);
  ctx2.lineTo(650, 480);
  ctx2.lineTo(850, 510);
  ctx2.lineTo(1100, 440);
  ctx2.stroke();

  return {
    beforeUrl: c1.toDataURL('image/png'),
    afterUrl: c2.toDataURL('image/png'),
  };
}

/**
 * Preset 2: Color Grading / Retouching
 */
function generatePhotoEditPreset() {
  const w = 1200;
  const h = 800;

  const { canvas: c1, ctx: ctx1 } = createCanvas(w, h);
  // Landscape sunset - Before (Flat)
  const grad1 = ctx1.createLinearGradient(0, 0, 0, h);
  grad1.addColorStop(0, '#78716c');
  grad1.addColorStop(0.5, '#a8a29e');
  grad1.addColorStop(1, '#525252');
  ctx1.fillStyle = grad1;
  ctx1.fillRect(0, 0, w, h);

  // Mountains
  ctx1.fillStyle = '#3f3f46';
  ctx1.beginPath();
  ctx1.moveTo(0, h);
  ctx1.lineTo(300, 400);
  ctx1.lineTo(600, 550);
  ctx1.lineTo(900, 350);
  ctx1.lineTo(w, h);
  ctx1.fill();

  // Sun
  ctx1.fillStyle = '#e7e5e4';
  ctx1.beginPath();
  ctx1.arc(900, 350, 70, 0, Math.PI * 2);
  ctx1.fill();

  // After (Rich Color Graded)
  const { canvas: c2, ctx: ctx2 } = createCanvas(w, h);
  const grad2 = ctx2.createLinearGradient(0, 0, 0, h);
  grad2.addColorStop(0, '#0f172a');
  grad2.addColorStop(0.4, '#c2410c');
  grad2.addColorStop(0.7, '#f59e0b');
  grad2.addColorStop(1, '#1e1b4b');
  ctx2.fillStyle = grad2;
  ctx2.fillRect(0, 0, w, h);

  // Sun glow
  const sunGlow = ctx2.createRadialGradient(900, 350, 10, 900, 350, 200);
  sunGlow.addColorStop(0, '#fef08a');
  sunGlow.addColorStop(0.5, '#f97316');
  sunGlow.addColorStop(1, 'transparent');
  ctx2.fillStyle = sunGlow;
  ctx2.fillRect(600, 100, 600, 500);

  // Mountains with rich silhouette
  ctx2.fillStyle = '#090d16';
  ctx2.beginPath();
  ctx2.moveTo(0, h);
  ctx2.lineTo(300, 400);
  ctx2.lineTo(600, 550);
  ctx2.lineTo(900, 350);
  ctx2.lineTo(w, h);
  ctx2.fill();

  // Foreground trees
  ctx2.fillStyle = '#020617';
  for (let x = 50; x < w; x += 90) {
    ctx2.beginPath();
    ctx2.moveTo(x, h);
    ctx2.lineTo(x + 25, h - 180 - Math.sin(x) * 40);
    ctx2.lineTo(x + 50, h);
    ctx2.fill();
  }

  return {
    beforeUrl: c1.toDataURL('image/png'),
    afterUrl: c2.toDataURL('image/png'),
  };
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: 'ui-redesign',
    title: 'UI Dashboard Redesign',
    description: 'Compare v1.0 vs v2.4 layout adjustments, new cards, and metric updates.',
    beforeName: 'dashboard-v1.png',
    afterName: 'dashboard-v2.png',
    getImages: generateUIDesignPreset,
  },
  {
    id: 'photo-grade',
    title: 'Landscape Color Grading',
    description: 'Raw flat capture versus professional warm sunset color grade.',
    beforeName: 'raw-capture.png',
    afterName: 'graded-edit.png',
    getImages: generatePhotoEditPreset,
  },
];
