import React, { useState } from 'react';
import { Problem, SubmissionResult } from '../../types/arena';
import { DifficultyBadge, Badge } from '../common/Badge';
import { HintPanel } from './HintPanel';
import { 
  FileText, 
  Network, 
  History, 
  Lightbulb, 
  CheckCircle2, 
  XCircle,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ProblemStatementProps {
  problem: Problem;
  submissions: SubmissionResult[];
  activeHintIndex: number;
  onUnlockNextHint: () => void;
  onRequestSolutionReveal: () => void;
  isSolutionRevealed: boolean;
}

export const ProblemStatement: React.FC<ProblemStatementProps> = ({
  problem,
  submissions,
  activeHintIndex,
  onUnlockNextHint,
  onRequestSolutionReveal,
  isSolutionRevealed
}) => {
  const [activeTab, setActiveTab] = useState<'desc' | 'graph' | 'subs' | 'hints'>('desc');

  return (
    <div className="flex flex-col h-full bg-surface-low border-r border-border-subdued select-none">
      {/* Tab Navigation Header */}
      <div className="h-10 px-3 bg-surface-mid/80 border-b border-border-subdued flex items-center justify-between shrink-0">
        <div className="flex items-center gap-1 font-mono-code text-xs">
          <button
            onClick={() => setActiveTab('desc')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === 'desc'
                ? 'bg-surface-elevated text-white font-medium border border-border-prominent'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Description</span>
          </button>
          <button
            onClick={() => setActiveTab('graph')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === 'graph'
                ? 'bg-surface-elevated text-white font-medium border border-border-prominent'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Network className="w-3.5 h-3.5 text-neural" />
            <span>Knowledge Graph</span>
          </button>
          <button
            onClick={() => setActiveTab('subs')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === 'subs'
                ? 'bg-surface-elevated text-white font-medium border border-border-prominent'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Submissions ({submissions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('hints')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
              activeTab === 'hints'
                ? 'bg-diagnostic-amber/15 text-diagnostic-amber font-medium border border-diagnostic-amber/30'
                : 'text-slate-400 hover:text-diagnostic-amber'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Hints ({activeHintIndex}/{problem.hints.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto select-text">
        {activeTab === 'desc' && (
          <div className="p-5 space-y-5 text-sm text-slate-300">
            {/* Title & Metadata */}
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <DifficultyBadge difficulty={problem.difficulty} />
                <Badge variant="neural">{problem.conceptName}</Badge>
                <Badge variant="muted">{problem.syllabusModuleName}</Badge>
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                {problem.title}
              </h1>
            </div>

            {/* Narrative */}
            <div className="prose prose-invert max-w-none text-xs leading-relaxed text-slate-300 space-y-3 font-sans">
              <p className="whitespace-pre-line">{problem.description}</p>
            </div>

            {/* Examples */}
            <div className="space-y-4">
              <div className="text-xs font-mono-code text-slate-400 uppercase tracking-wider font-semibold">
                Examples
              </div>
              {problem.examples.map((ex, idx) => (
                <div key={idx} className="p-3.5 rounded-lg bg-surface-mid/80 border border-border-subdued space-y-2">
                  <div className="text-xs font-mono-code font-semibold text-slate-300">
                    Example {idx + 1}:
                  </div>
                  <div className="font-mono-code text-xs space-y-1">
                    <div>
                      <span className="text-slate-500">Input: </span>
                      <span className="text-slate-200">{ex.input}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Output: </span>
                      <span className="text-mastery-emerald font-semibold">{ex.output}</span>
                    </div>
                    {ex.explanation && (
                      <div className="text-slate-400 text-[11px] pt-1 border-t border-border-subdued">
                        <span className="text-slate-500 font-sans">Explanation: </span>
                        <span className="font-sans">{ex.explanation}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-2">
              <div className="text-xs font-mono-code text-slate-400 uppercase tracking-wider font-semibold">
                Constraints
              </div>
              <ul className="list-disc pl-5 font-mono-code text-xs text-slate-400 space-y-1">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'graph' && (
          <div className="p-5 space-y-4 text-xs text-slate-300 font-sans">
            <div className="flex items-center gap-2 pb-3 border-b border-border-subdued">
              <Network className="w-5 h-5 text-neural" />
              <div>
                <h3 className="font-semibold text-white text-sm">Adaptive Syllabus Knowledge Graph</h3>
                <span className="text-[11px] text-slate-400">BodhiMedha Bayesian Knowledge Tracing (BKT) Alignment</span>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-surface-mid border border-border-subdued space-y-3">
              <div className="text-[11px] font-mono-code text-slate-400 uppercase tracking-wider">
                Active Prerequisite Chain
              </div>
              <div className="flex items-center gap-2 text-xs font-mono-code flex-wrap">
                <span className="px-2.5 py-1 rounded bg-surface-elevated text-slate-300 border border-border-prominent">
                  {problem.prerequisiteConceptName || 'Foundational Recursion'}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-neural" />
                <span className="px-2.5 py-1 rounded bg-neural/20 text-neural border border-neural/40 font-semibold">
                  {problem.conceptName} (Current Target)
                </span>
              </div>
            </div>

            <div className="space-y-2 text-slate-400 text-xs leading-relaxed">
              <p>
                <strong className="text-slate-200">Why was this problem served?</strong>
              </p>
              <p>
                BodhiMedha's adaptive engine detected that your prerequisite understanding of <em>{problem.prerequisiteConceptName || 'Tree Traversals'}</em> was in developing status (BKT Posterior: 0.54). 
                Solving this item reinforces the tree invariant property before advancing to complex balanced structures.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'subs' && (
          <div className="p-4 space-y-3">
            <div className="text-xs font-mono-code text-slate-400 uppercase tracking-wider">
              Attempt History
            </div>
            {submissions.length === 0 ? (
              <div className="p-8 text-center text-xs font-mono-code text-slate-500">
                No recorded submissions yet for this problem.
              </div>
            ) : (
              submissions.map((sub) => (
                <div key={sub.id} className="p-3 rounded bg-surface-mid border border-border-subdued flex items-center justify-between text-xs font-mono-code">
                  <div className="flex items-center gap-2">
                    {sub.status === 'ACCEPTED' ? (
                      <CheckCircle2 className="w-4 h-4 text-mastery-emerald" />
                    ) : (
                      <XCircle className="w-4 h-4 text-diagnostic-rose" />
                    )}
                    <div>
                      <span className={`font-semibold block ${sub.status === 'ACCEPTED' ? 'text-mastery-emerald' : 'text-diagnostic-rose'}`}>
                        {sub.status}
                      </span>
                      <span className="text-[10px] text-slate-400">{sub.language.toUpperCase()} • {sub.testsPassed}/{sub.totalTests} Passed</span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-400">
                    <div>{sub.executionTimeMs}ms • {sub.memoryUsedMb}MB</div>
                    <div className="text-[10px] text-slate-500">{new Date(sub.timestamp).toLocaleTimeString()}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'hints' && (
          <HintPanel
            hints={problem.hints}
            activeHintIndex={activeHintIndex}
            onUnlockNextHint={onUnlockNextHint}
            onRequestSolutionReveal={onRequestSolutionReveal}
            isSolutionRevealed={isSolutionRevealed}
          />
        )}
      </div>
    </div>
  );
};
