import React, { useEffect } from 'react';
import { History, Trash2, ArrowUpRight } from 'lucide-react';
import { useAppStore } from '../stores/useAppStore';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { formatDate } from '../utils/formatters';

export const HistoryPanel: React.FC = () => {
  const showHistoryModal = useAppStore((state) => state.showHistoryModal);
  const setShowHistoryModal = useAppStore((state) => state.setShowHistoryModal);
  const history = useAppStore((state) => state.history);
  const loadHistory = useAppStore((state) => state.loadHistory);
  const setImages = useAppStore((state) => state.setImages);
  const deleteHistoryItem = useAppStore((state) => state.deleteHistoryItem);
  const clearHistory = useAppStore((state) => state.clearHistory);

  useEffect(() => {
    if (showHistoryModal) {
      loadHistory();
    }
  }, [showHistoryModal, loadHistory]);

  const handleSelect = (item: (typeof history)[0]) => {
    setImages(item.beforeUrl, item.afterUrl, item.beforeMeta, item.afterMeta);
    setShowHistoryModal(false);
  };

  return (
    <Modal
      isOpen={showHistoryModal}
      onClose={() => setShowHistoryModal(false)}
      title="Recent Comparisons (IndexedDB)"
      maxWidth="lg"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Stored 100% locally in your browser storage.</span>
          {history.length > 0 && (
            <button
              onClick={() => clearHistory()}
              className="text-rose-400 hover:text-rose-300 transition cursor-pointer flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        <div className="max-h-80 overflow-y-auto space-y-2">
          {history.length > 0 ? (
            history.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.thumbnailUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover border border-slate-800 bg-slate-900"
                  />
                  <div>
                    <h4 className="font-semibold text-xs text-slate-100">{item.name}</h4>
                    <p className="text-[11px] text-slate-400">
                      {item.beforeMeta?.width} × {item.beforeMeta?.height} px • {formatDate(item.timestamp)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                    onClick={() => handleSelect(item)}
                  >
                    Open
                  </Button>
                  <button
                    onClick={() => deleteHistoryItem(item.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-400 rounded transition cursor-pointer"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500 text-xs">
              <History className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p>No recent comparisons stored in local storage yet.</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
