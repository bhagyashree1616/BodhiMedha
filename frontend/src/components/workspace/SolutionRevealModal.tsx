import React from 'react';
import { AlertCircle, X, Check, BookOpen } from 'lucide-react';

interface SolutionRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmReveal: () => void;
  isAlreadyRevealed: boolean;
  solutionExplanation?: string;
}

export const SolutionRevealModal: React.FC<SolutionRevealModalProps> = ({
  isOpen,
  onClose,
  onConfirmReveal,
  isAlreadyRevealed,
  solutionExplanation
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-xl bg-surface-low border border-border-prominent shadow-2xl p-5 text-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border-subdued">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-neural" />
            <h3 className="font-semibold text-base text-white">Reference Solution & Algorithmic Rationale</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-surface-mid text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="py-4 space-y-4">
          {!isAlreadyRevealed ? (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-diagnostic-amber/10 border border-diagnostic-amber/30 text-diagnostic-amber text-xs leading-relaxed flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-0.5">BodhiMedha Controlled Solution Policy:</span>
                  Self-paced learning is most effective when you experiment and debug independently. Revealing the solution will record this event in your practice timeline for trainer review.
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Are you sure you want to reveal the reference solution for this problem?
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
                Optimal Approach & Complexity Analysis
              </div>
              <pre className="p-3 rounded-lg bg-surface-editor border border-border-subdued font-mono-code text-xs text-slate-200 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto">
                {solutionExplanation || 'No solution rationale documented for this item.'}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 pt-3 border-t border-border-subdued">
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-md bg-surface-mid hover:bg-surface-elevated text-xs font-mono-code text-slate-300 border border-border-subdued transition-colors"
          >
            Close
          </button>
          {!isAlreadyRevealed && (
            <button
              onClick={() => {
                onConfirmReveal();
              }}
              className="px-4 py-1.5 rounded-md bg-neural hover:bg-neural-deep text-xs font-mono-code text-white font-medium shadow-md shadow-neural/20 transition-all"
            >
              Confirm & Reveal Solution
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
