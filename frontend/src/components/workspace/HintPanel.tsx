import React from 'react';
import { Lightbulb, Lock, Unlock, HelpCircle, ChevronRight } from 'lucide-react';

interface HintPanelProps {
  hints: string[];
  activeHintIndex: number;
  onUnlockNextHint: () => void;
  onRequestSolutionReveal: () => void;
  isSolutionRevealed: boolean;
}

export const HintPanel: React.FC<HintPanelProps> = ({
  hints,
  activeHintIndex,
  onUnlockNextHint,
  onRequestSolutionReveal,
  isSolutionRevealed
}) => {
  const hintTitles = [
    'Stage 1: Conceptual Invariant Clue',
    'Stage 2: Algorithmic Approach Guidance',
    'Stage 3: Edge Case & Traversal Details'
  ];

  return (
    <div className="space-y-4 p-4 text-xs">
      <div className="flex items-center justify-between pb-3 border-b border-border-subdued">
        <div className="flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-diagnostic-amber" />
          <span className="font-semibold text-slate-200">Progressive AI Hints</span>
        </div>
        <span className="text-[11px] font-mono-code text-mastery-emerald bg-mastery-emerald/10 px-2 py-0.5 rounded border border-mastery-emerald/20">
          No penalty in Self-Paced Mode
        </span>
      </div>

      {hints.map((hintText, idx) => {
        const isUnlocked = idx < activeHintIndex;
        const isNext = idx === activeHintIndex;

        return (
          <div
            key={idx}
            className={`p-3 rounded-lg border transition-all ${
              isUnlocked
                ? 'bg-surface-mid/60 border-border-prominent text-slate-200 shadow-sm'
                : 'bg-surface-low/60 border-border-subdued text-slate-500'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5 font-mono-code text-[11px]">
              <div className="flex items-center gap-1.5 font-medium">
                {isUnlocked ? (
                  <Unlock className="w-3.5 h-3.5 text-mastery-teal" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                )}
                <span>{hintTitles[idx] || `Hint ${idx + 1}`}</span>
              </div>
              <span className="text-slate-500 text-[10px]">
                {isUnlocked ? 'Unlocked' : isNext ? 'Available' : 'Locked'}
              </span>
            </div>

            {isUnlocked ? (
              <p className="text-slate-300 leading-relaxed font-sans text-xs">
                {hintText}
              </p>
            ) : isNext ? (
              <div className="mt-2">
                <button
                  onClick={onUnlockNextHint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-neural/15 hover:bg-neural/25 text-neural border border-neural/30 font-mono-code text-xs font-medium transition-colors"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Unlock Hint {idx + 1}</span>
                </button>
              </div>
            ) : (
              <p className="text-slate-600 text-[11px] italic">
                Unlock earlier stages first to inspect this guidance.
              </p>
            )}
          </div>
        );
      })}

      {/* Controlled Solution Reveal */}
      <div className="pt-3 border-t border-border-subdued flex items-center justify-between">
        <span className="text-[11px] text-slate-400">
          Stuck after inspecting all progressive hints?
        </span>
        <button
          onClick={onRequestSolutionReveal}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded font-mono-code text-xs font-medium border transition-colors ${
            isSolutionRevealed
              ? 'bg-mastery-teal/15 text-mastery-teal border-mastery-teal/30'
              : 'bg-surface-elevated hover:bg-surface-elevated/80 text-slate-300 border-border-prominent'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{isSolutionRevealed ? 'View Reference Solution' : 'Reveal Solution (Confirm Required)'}</span>
        </button>
      </div>
    </div>
  );
};
