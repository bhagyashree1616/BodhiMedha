import React from 'react';
import { TopicMastery } from '../../types/analytics';
import { Network, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import { Badge } from '../common/Badge';

interface TopicMasteryWidgetProps {
  topics: TopicMastery[];
  onSelectTopicProblem: (probId: string) => void;
  onGenerateFollowUp: () => void;
}

export const TopicMasteryWidget: React.FC<TopicMasteryWidgetProps> = ({
  topics,
  onSelectTopicProblem,
  onGenerateFollowUp
}) => {
  return (
    <div className="p-4 rounded-xl bg-surface-mid/70 border border-border-subdued shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border-subdued">
        <div className="flex items-center gap-2">
          <Network className="w-4 h-4 text-neural" />
          <h3 className="font-semibold text-sm text-white">Topic Mastery & Weak Areas</h3>
        </div>
        <span className="text-[10px] font-mono-code text-slate-400">BKT Tracing</span>
      </div>

      {/* Topic Bars */}
      <div className="space-y-3">
        {topics.map((t) => {
          const percent = Math.round(t.masteryProbability * 100);
          const isWeak = t.status === 'WEAK';
          const isSolid = t.status === 'SOLID';

          return (
            <div key={t.conceptId} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-200 font-medium">{t.conceptName}</span>
                <div className="flex items-center gap-2 font-mono-code text-[11px]">
                  <span className={isWeak ? 'text-diagnostic-rose font-semibold' : isSolid ? 'text-mastery-emerald font-semibold' : 'text-diagnostic-amber'}>
                    {percent}%
                  </span>
                  <Badge 
                    variant={isWeak ? 'rose' : isSolid ? 'emerald' : 'amber'} 
                    size="sm"
                  >
                    {t.status}
                  </Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="h-1.5 w-full rounded-full bg-surface-elevated overflow-hidden">
                <div
                  style={{ width: `${percent}%` }}
                  className={`h-full rounded-full transition-all duration-500 ${
                    isWeak 
                      ? 'bg-diagnostic-rose' 
                      : isSolid 
                      ? 'bg-mastery-emerald' 
                      : 'bg-diagnostic-amber'
                  }`}
                />
              </div>

              {/* Weak prerequisite alert */}
              {isWeak && t.prerequisiteGaps.length > 0 && (
                <div className="flex items-center justify-between pt-1 text-[11px] text-diagnostic-amber">
                  <span className="flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    <span>Prerequisite Gap: {t.prerequisiteGaps[0]}</span>
                  </span>
                  {t.recommendedFollowUpProblemId && (
                    <button
                      onClick={() => onSelectTopicProblem(t.recommendedFollowUpProblemId!)}
                      className="text-neural hover:underline flex items-center gap-0.5 font-mono-code text-[10px]"
                    >
                      <span>Remediate</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="pt-2 border-t border-border-subdued">
        <button
          onClick={onGenerateFollowUp}
          className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-neural/15 hover:bg-neural/25 text-neural border border-neural/30 font-mono-code text-xs font-semibold shadow-sm transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-neural" />
          <span>Generate Targeted Follow-Up Assessment</span>
        </button>
      </div>
    </div>
  );
};
