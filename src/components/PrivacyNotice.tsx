import React from 'react';
import { ShieldCheck, Lock, Cpu, Database } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';

export const PrivacyNotice: React.FC = () => {
  const showPrivacyModal = useAppStore((state) => state.showPrivacyModal);
  const setShowPrivacyModal = useAppStore((state) => state.setShowPrivacyModal);

  return (
    <Modal
      isOpen={showPrivacyModal}
      onClose={() => setShowPrivacyModal(false)}
      title="Privacy-First Guarantee"
      maxWidth="md"
    >
      <div className="space-y-4 text-xs text-slate-300">
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-start gap-3">
          <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-emerald-300 text-sm mb-1">100% Client-Side Image Processing</h4>
            <p className="text-emerald-200/80 leading-relaxed">
              DiffLens runs entirely in your browser using standard HTML5 Canvas and Web Worker background threads.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800">
            <Lock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-slate-100 mb-0.5">No Remote Servers</h5>
              <p className="text-slate-400">
                Your images are never transmitted over the network or uploaded to any backend or cloud service.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800">
            <Database className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-slate-100 mb-0.5">Private Local Storage</h5>
              <p className="text-slate-400">
                Optional recent comparison history is stored strictly on your device inside your browser's IndexedDB database.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-950 border border-slate-800">
            <Cpu className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h5 className="font-semibold text-slate-100 mb-0.5">Web Worker Multi-Threading</h5>
              <p className="text-slate-400">
                Pixel difference matrices and RGB histograms are computed in a non-blocking dedicated Web Worker thread.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="primary" onClick={() => setShowPrivacyModal(false)}>
            Got it
          </Button>
        </div>
      </div>
    </Modal>
  );
};
