import React, { useState, useCallback } from 'react';
import {
  Upload,
  Layers,
  Sliders,
  Eye,
  Columns,
  Zap,
  ArrowRight,
  Clipboard,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../stores/useAppStore';
import { SAMPLE_PRESETS } from '../utils/sampleImages';
import { Button } from './ui/Button';

export const LandingPage: React.FC = () => {
  const setImages = useAppStore((state) => state.setImages);
  const [dragOver, setDragOver] = useState(false);
  const [pendingBefore, setPendingBefore] = useState<{ url: string; meta: any } | null>(null);

  const processFile = useCallback((file: File) => {
    return {
      url: URL.createObjectURL(file),
      meta: {
        name: file.name,
        size: file.size,
        type: file.type || 'image/png',
        lastModified: file.lastModified,
      },
    };
  }, []);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files).filter((f) => f.type.startsWith('image/'));

    if (files.length >= 2) {
      const f1 = processFile(files[0]);
      const f2 = processFile(files[1]);
      setImages(f1.url, f2.url, f1.meta as any, f2.meta as any);
    } else if (files.length === 1) {
      const f = processFile(files[0]);
      if (!pendingBefore) {
        setPendingBefore(f);
      } else {
        setImages(pendingBefore.url, f.url, pendingBefore.meta as any, f.meta as any);
        setPendingBefore(null);
      }
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>, target: 'before' | 'after' | 'both') => {
    const files = Array.from(e.target.files || []);
    if (target === 'both' && files.length >= 2) {
      const f1 = processFile(files[0]);
      const f2 = processFile(files[1]);
      setImages(f1.url, f2.url, f1.meta as any, f2.meta as any);
    } else if (files.length > 0) {
      const f = processFile(files[0]);
      if (target === 'before') {
        setPendingBefore(f);
      } else {
        if (pendingBefore) {
          setImages(pendingBefore.url, f.url, pendingBefore.meta as any, f.meta as any);
          setPendingBefore(null);
        } else {
          setPendingBefore(f);
        }
      }
    }
  };

  const handlePaste = async () => {
    try {
      const items = await navigator.clipboard.read();
      for (const item of items) {
        const imageType = item.types.find((type) => type.startsWith('image/'));
        if (imageType) {
          const blob = await item.getType(imageType);
          const url = URL.createObjectURL(blob);
          const meta = {
            name: 'Pasted Image',
            size: blob.size,
            type: blob.type || 'image/png',
          };
          if (!pendingBefore) {
            setPendingBefore({ url, meta });
          } else {
            setImages(pendingBefore.url, url, pendingBefore.meta as any, meta as any);
            setPendingBefore(null);
          }
          break;
        }
      }
    } catch {
      alert('Clipboard access denied or no image found on clipboard.');
    }
  };

  const loadPreset = (presetId: string) => {
    const preset = SAMPLE_PRESETS.find((p) => p.id === presetId);
    if (preset) {
      const { beforeUrl, afterUrl } = preset.getImages();
      setImages(
        beforeUrl,
        afterUrl,
        { name: preset.beforeName } as any,
        { name: preset.afterName } as any
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-65px)] bg-slate-950 text-slate-100 selection:bg-sky-500 selection:text-slate-950 flex flex-col">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-16 pb-20 max-w-6xl mx-auto w-full text-center">
        {/* Editorial Subhead */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-medium mb-6"
        >
          <Sparkles className="w-3.5 h-3.5 text-sky-400" />
          <span>Professional Client-Side Image Inspection</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-[1.1]"
        >
          See what changed with <span className="bg-linear-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">precision canvas tools</span>.
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed mb-12"
        >
          Compare UI designs, photographic edits, rendering differences, and compression artifacts entirely inside your browser. No server uploads. Zero latency.
        </motion.p>

        {/* Upload Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative p-8 sm:p-12 rounded-2xl border-2 border-dashed transition-all duration-200 ${
              dragOver
                ? 'border-sky-400 bg-sky-500/10 scale-[1.01]'
                : 'border-slate-800 bg-slate-900/60 hover:border-slate-700 hover:bg-slate-900'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center shadow-inner">
                <Upload className="w-7 h-7" />
              </div>

              <div>
                <h3 className="font-semibold text-lg text-slate-100 mb-1">
                  Drag & Drop two images to compare
                </h3>
                <p className="text-xs text-slate-400">
                  Supports PNG, JPEG, WebP, SVG, AVIF • Up to 8K resolution
                </p>
              </div>

              {pendingBefore && (
                <div className="p-3 bg-sky-500/10 border border-sky-500/30 rounded-lg text-xs text-sky-300 flex items-center gap-2">
                  <span>Image 1 uploaded! Now select or drag Image 2 (After).</span>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={(e) => handleFileInput(e, 'both')}
                  />
                  <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold text-sm transition shadow-lg shadow-sky-500/20">
                    Select Images
                  </span>
                </label>

                <Button variant="outline" size="md" icon={<Clipboard className="w-4 h-4" />} onClick={handlePaste}>
                  Paste Clipboard
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Instant Interactive Presets */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Or try instant sample comparisons
          </span>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {SAMPLE_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => loadPreset(preset.id)}
                className="group flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-medium text-slate-300 hover:text-slate-100 transition cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 text-sky-400 group-hover:scale-110 transition-transform" />
                <span>{preset.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Feature Grid */}
      <section className="border-t border-slate-800/80 bg-slate-950/40 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
              4 Powerful Comparison Modes
            </h2>
            <p className="text-slate-400 text-sm">
              Designed for UI designers, game artists, QA engineers, and photographers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <Sliders className="w-6 h-6 text-sky-400 mb-4" />
                <h3 className="font-semibold text-slate-100 mb-2">Split Comparison Slider</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Vertical and horizontal interactive divider. Drag or use arrow keys for micro inspection.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <Layers className="w-6 h-6 text-purple-400 mb-4" />
                <h3 className="font-semibold text-slate-100 mb-2">Onion-Skin Overlay</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Smooth opacity blending between before and after versions to spot subtle position shifts.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <Eye className="w-6 h-6 text-amber-400 mb-4" />
                <h3 className="font-semibold text-slate-100 mb-2">Blink Inspection</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Rapidly toggle between images at adjustable frequencies to spot instantaneous motion or pixel drops.
                </p>
              </div>
            </div>

            <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <Columns className="w-6 h-6 text-emerald-400 mb-4" />
                <h3 className="font-semibold text-slate-100 mb-2">Side-by-Side View</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Synchronized pan and zoom up to 2000%. Move across both viewports in lock-step.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500">
        <p>DiffLens — See what changed. 100% Static, Client-Side & Private.</p>
      </footer>
    </div>
  );
};
