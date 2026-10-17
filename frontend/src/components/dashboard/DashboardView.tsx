import React from 'react';
import { Problem } from '../../types/arena';
import { StudentAnalytics } from '../../types/analytics';
import { TimedAssessment } from '../../types/assessment';
import { MetricCard } from './MetricCard';
import { TopicMasteryWidget } from './TopicMasteryWidget';
import { DifficultyBadge, Badge } from '../common/Badge';
import { 
  Sparkles, 
  Play, 
  ArrowRight, 
  CheckCircle2, 
  Timer, 
  Trophy, 
  ShieldCheck,
  Code2,
  Clock,
  BookOpen
} from 'lucide-react';

interface DashboardViewProps {
  analytics: StudentAnalytics;
  problems: Problem[];
  activeAssessment: TimedAssessment;
  onOpenProblem: (problemId: string) => void;
  onStartAssessmentModal: () => void;
  onSwitchTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  analytics,
  problems,
  activeAssessment,
  onOpenProblem,
  onStartAssessmentModal,
  onSwitchTab
}) => {
  const recommendedProblem = problems[0]; // BST LCA problem

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Hero Welcome Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-surface-mid to-surface-low border border-border-subdued shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-neural/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-neural/15 text-neural border border-neural/30 text-xs font-mono-code font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Knowledge-Graph Calibrated</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Welcome back, Ananya! Ready to strengthen your weak prerequisites?
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed font-sans">
            BodhiMedha's Bayesian Knowledge Tracing evaluated your last 12 attempts across hierarchical tree structures. 
            A targeted prerequisite practice path has been calibrated for your session.
          </p>

          {/* Recommended Problem Spotlight Card */}
          {recommendedProblem && (
            <div className="mt-4 p-4 rounded-xl bg-surface-elevated/80 border border-border-prominent shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono-code font-semibold text-neural flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Targeting Prerequisite: {recommendedProblem.prerequisiteConceptName || 'Tree Traversal'}
                  </span>
                  <DifficultyBadge difficulty={recommendedProblem.difficulty} />
                </div>
                <div className="text-base font-bold text-white">
                  {recommendedProblem.title}
                </div>
                <div className="text-xs text-slate-400 font-mono-code">
                  Est. Time: 25 mins • Expected Mastery Gain: +12% BKT Posterior
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => onOpenProblem(recommendedProblem.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neural to-neural-deep hover:from-neural-deep hover:to-neural text-white font-mono-code text-xs font-semibold shadow-md shadow-neural/25 transition-all"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Solve Problem</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Summary Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="TOPIC MASTERY"
          value={`${analytics.overallMasteryPercentage}%`}
          subtitle="Target: 85% Cohort Benchmark"
          badge="+4.2% this week"
          badgeVariant="emerald"
          icon={CheckCircle2}
          progressPercent={analytics.overallMasteryPercentage}
        />
        <MetricCard
          title="PRACTICE SOLVED"
          value={analytics.practiceSolvedCount}
          subtitle="18 Easy • 19 Medium • 5 Hard"
          badge="Top 15% in Class"
          badgeVariant="neural"
          icon={Code2}
        />
        <MetricCard
          title="ASSESSMENTS TAKEN"
          value={analytics.assessmentsCompletedCount}
          subtitle="Avg Score: 88.5% • 1 Live Exam"
          badge="Proctored"
          badgeVariant="amber"
          icon={Timer}
        />
        <MetricCard
          title="REVIEW QUEUE / FLAGS"
          value={analytics.pendingFlagsCount}
          subtitle="Clean slate • Verified audit integrity"
          badge="Zero Penalties"
          badgeVariant="emerald"
          icon={ShieldCheck}
        />
      </div>

      {/* Split Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): In-Progress & Recommended Practice */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active In-Progress Session */}
          <div className="p-4 rounded-xl bg-surface-mid/80 border border-border-prominent shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[11px] font-mono-code text-mastery-emerald flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-mastery-emerald animate-pulse"></span>
                In-Progress Practice Session
              </span>
              <div className="font-semibold text-white text-sm">
                Red-Black Tree Balancing (3/5 test cases passing)
              </div>
              <div className="text-xs text-slate-400 font-mono-code flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>28:14 elapsed • Draft cached locally</span>
              </div>
            </div>
            <button
              onClick={() => onOpenProblem(problems[0].id)}
              className="px-3.5 py-1.5 rounded-lg bg-surface-elevated hover:bg-surface-mid text-xs font-mono-code font-semibold text-slate-200 border border-border-prominent transition-colors"
            >
              Resume Editor
            </button>
          </div>

          {/* Recommended Practice Problems Table */}
          <div className="p-4 rounded-xl bg-surface-mid/70 border border-border-subdued shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-subdued">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-neural" />
                <h3 className="font-semibold text-sm text-white">Recommended Practice Problems</h3>
              </div>
              <button
                onClick={() => onSwitchTab('practice')}
                className="text-xs font-mono-code text-neural hover:underline flex items-center gap-1"
              >
                <span>View All ({problems.length})</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="divide-y divide-border-subdued">
              {problems.map((prob) => (
                <div key={prob.id} className="py-3 flex items-center justify-between gap-4 group">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-200 text-xs group-hover:text-neural transition-colors cursor-pointer" onClick={() => onOpenProblem(prob.id)}>
                        {prob.title}
                      </span>
                      <DifficultyBadge difficulty={prob.difficulty} />
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono-code flex items-center gap-3">
                      <span>Syllabus: {prob.conceptName}</span>
                      <span>•</span>
                      <span>{prob.supportedLanguages.join(', ').toUpperCase()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenProblem(prob.id)}
                    className="px-3 py-1.5 rounded bg-surface-elevated hover:bg-neural text-xs font-mono-code text-slate-200 hover:text-white border border-border-subdued hover:border-neural transition-all shrink-0"
                  >
                    Solve
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Timed Assessment & Topic Mastery */}
        <div className="lg:col-span-5 space-y-6">
          {/* AI-Generated Timed Assessment Card */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-surface-mid to-surface-low border border-border-prominent shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-code text-neural bg-neural/15 px-2.5 py-0.5 rounded-full border border-neural/30 font-semibold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                AI-Generated Assessment
              </span>
              <span className="text-xs font-mono-code text-diagnostic-amber">45 Mins</span>
            </div>

            <div>
              <h3 className="font-bold text-white text-base">
                {activeAssessment.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Generated from teacher syllabus: {activeAssessment.syllabusModuleName}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-surface-editor border border-border-subdued space-y-1.5 text-xs font-mono-code text-slate-300">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Structure:</span>
                <span>3 Questions (Trees, DP, Graphs)</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Security:</span>
                <span className="text-mastery-emerald">Webcam & Audio Monitored</span>
              </div>
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Clipboard:</span>
                <span className="text-diagnostic-amber">External Paste Guard Active</span>
              </div>
            </div>

            <button
              onClick={onStartAssessmentModal}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-diagnostic-amber/20 hover:bg-diagnostic-amber/30 text-diagnostic-amber border border-diagnostic-amber/40 font-mono-code text-xs font-bold tracking-wide transition-all shadow-md shadow-diagnostic-amber/10"
            >
              <Timer className="w-4 h-4" />
              <span>Begin Timed Assessment</span>
            </button>
          </div>

          {/* Topic Mastery Widget */}
          <TopicMasteryWidget
            topics={analytics.topicMasteries}
            onSelectTopicProblem={(probId) => onOpenProblem(probId)}
            onGenerateFollowUp={() => {
              alert('AI follow-up engine requested: generating targeted questions for Tree Traversals & BST Invariants.');
            }}
          />
        </div>
      </div>
    </div>
  );
};
