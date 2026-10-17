import React from 'react';
import { StudentAnalytics } from '../../types/analytics';
import { TopicMasteryWidget } from '../dashboard/TopicMasteryWidget';
import { MetricCard } from '../dashboard/MetricCard';
import { 
  Network, 
  TrendingUp, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface LearningProgressViewProps {
  analytics: StudentAnalytics;
  onSelectProblem: (probId: string) => void;
  onGenerateFollowUp: () => void;
}

export const LearningProgressView: React.FC<LearningProgressViewProps> = ({
  analytics,
  onSelectProblem,
  onGenerateFollowUp
}) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-border-subdued">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Network className="w-5 h-5 text-neural" />
            <h1 className="text-xl font-bold text-white tracking-tight">Adaptive Learning & Mastery Progress</h1>
          </div>
          <p className="text-xs text-slate-400">
            Powered by Bayesian Knowledge Tracing (BKT) and prerequisite propagation across your syllabus knowledge graph.
          </p>
        </div>

        <button
          onClick={onGenerateFollowUp}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-neural hover:bg-neural-deep font-mono-code text-xs font-semibold text-white shadow-md shadow-neural/25 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate Targeted Follow-Up Assessment</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard
          title="OVERALL MASTERY"
          value={`${analytics.overallMasteryPercentage}%`}
          subtitle="Bayesian Knowledge Tracing Posterior"
          badge="Solidifying"
          badgeVariant="emerald"
          icon={TrendingUp}
          progressPercent={analytics.overallMasteryPercentage}
        />
        <MetricCard
          title="FORMAL ASSESSMENTS"
          value={analytics.assessmentsCompletedCount}
          subtitle="Authoritative Proctored Evaluations"
          badge="High Reliability"
          badgeVariant="neural"
          icon={CheckCircle2}
        />
        <MetricCard
          title="INFORMAL PRACTICE ATTEMPTS"
          value={analytics.practiceSolvedCount}
          subtitle="Self-Paced Experimentation & Hints"
          badge="Separate Metric"
          badgeVariant="teal"
          icon={Layers}
        />
      </div>

      {/* Distinction Callout */}
      <div className="p-4 rounded-xl bg-surface-mid/80 border border-border-subdued text-xs text-slate-300 leading-relaxed flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-mastery-teal shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-0.5">BodhiMedha Integrity & Evaluation Principle:</strong>
          Informal self-paced practice activity (including repeated compiler executions, requesting hints, and exploring code drafts) is tracked separately from formal timed assessment scores. Experimentation is rewarded and never penalized as an integrity infraction.
        </div>
      </div>

      {/* Detailed Topic Mastery Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {analytics.topicMasteries.map((topic) => {
          const isWeak = topic.status === 'WEAK';
          const isSolid = topic.status === 'SOLID';
          const percent = Math.round(topic.masteryProbability * 100);

          return (
            <div key={topic.conceptId} className="p-5 rounded-xl bg-surface-mid/70 border border-border-subdued space-y-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-sm text-white">{topic.conceptName}</h3>
                  <span className="text-[11px] font-mono-code text-slate-400">{topic.moduleName}</span>
                </div>
                <Badge variant={isWeak ? 'rose' : isSolid ? 'emerald' : 'amber'}>
                  {topic.status} ({percent}%)
                </Badge>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full rounded-full bg-surface-elevated overflow-hidden">
                <div
                  style={{ width: `${percent}%` }}
                  className={`h-full rounded-full ${
                    isWeak ? 'bg-diagnostic-rose' : isSolid ? 'bg-mastery-emerald' : 'bg-diagnostic-amber'
                  }`}
                />
              </div>

              {/* Prerequisite Gaps */}
              {topic.prerequisiteGaps.length > 0 ? (
                <div className="p-3 rounded-lg bg-surface-low border border-border-subdued space-y-1.5 text-xs">
                  <div className="text-[11px] font-mono-code text-diagnostic-amber font-semibold">
                    Identified Prerequisite Gaps:
                  </div>
                  <ul className="list-disc pl-4 text-slate-300 space-y-0.5 text-[11px]">
                    {topic.prerequisiteGaps.map((gap, i) => (
                      <li key={i}>{gap}</li>
                    ))}
                  </ul>
                  {topic.recommendedFollowUpProblemId && (
                    <div className="pt-2">
                      <button
                        onClick={() => onSelectProblem(topic.recommendedFollowUpProblemId!)}
                        className="flex items-center gap-1.5 text-neural hover:underline font-mono-code text-xs font-semibold"
                      >
                        <span>Solve Targeted Remediating Problem</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs text-mastery-emerald font-mono-code flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Prerequisites mastered. Ready for advanced dependent topics.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
