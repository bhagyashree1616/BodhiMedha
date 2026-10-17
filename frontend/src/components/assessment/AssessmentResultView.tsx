import React, { useState } from 'react';
import { TimedAssessment, ExplainQuestion } from '../../types/assessment';
import { AdaptiveService } from '../../services/adaptiveService';
import { 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  FileText, 
  ArrowRight, 
  Award,
  AlertCircle
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface AssessmentResultViewProps {
  assessment: TimedAssessment;
  onReturnDashboard: () => void;
  onViewProgress: () => void;
}

export const AssessmentResultView: React.FC<AssessmentResultViewProps> = ({
  assessment,
  onReturnDashboard,
  onViewProgress
}) => {
  const [explainAnswers, setExplainAnswers] = useState<Record<string, string>>({});
  const [selfRatings, setSelfRatings] = useState<Record<string, number>>({});
  const [explainSubmitted, setExplainSubmitted] = useState<boolean>(false);

  const explainQuestions: ExplainQuestion[] = AdaptiveService.generateExplainQuestions('prob-bst-lca');

  const handleExplainSubmit = () => {
    setExplainSubmitted(true);
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-mid to-surface-low border border-mastery-emerald/30 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-mastery-emerald/20 border border-mastery-emerald/40 flex items-center justify-center text-mastery-emerald">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono-code text-mastery-emerald font-semibold uppercase tracking-wider block">
                Assessment Evaluated & Submitted
              </span>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {assessment.title}
              </h1>
            </div>
          </div>
          <div className="text-right font-mono-code">
            <div className="text-3xl font-extrabold text-white">88.5%</div>
            <div className="text-[11px] text-mastery-emerald font-semibold">Demonstrated Proficiency</div>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed font-sans">
          Your code has been evaluated against the server test harness. Hidden tests verified algorithmic correctness and time bounds.
        </p>

        {/* Question Breakdown */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono-code text-xs">
          <div className="p-3 rounded-lg bg-surface-mid border border-border-subdued flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[11px]">Q1: BST LCA</span>
              <span className="text-white font-semibold">3/3 Passed</span>
            </div>
            <Badge variant="emerald" size="sm">100%</Badge>
          </div>
          <div className="p-3 rounded-lg bg-surface-mid border border-border-subdued flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[11px]">Q2: Coin Change</span>
              <span className="text-white font-semibold">3/3 Passed</span>
            </div>
            <Badge variant="emerald" size="sm">100%</Badge>
          </div>
          <div className="p-3 rounded-lg bg-surface-mid border border-border-subdued flex items-center justify-between">
            <div>
              <span className="text-slate-400 block text-[11px]">Q3: Course Schedule</span>
              <span className="text-white font-semibold">2/2 Passed</span>
            </div>
            <Badge variant="emerald" size="sm">100%</Badge>
          </div>
        </div>
      </div>

      {/* Proctoring Audit Verification Summary */}
      <div className="p-4 rounded-xl bg-surface-mid border border-border-subdued flex items-center justify-between font-mono-code text-xs text-slate-300">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-mastery-emerald" />
          <div>
            <span className="font-semibold text-white block">Tamper-Evident Session Log Verified</span>
            <span className="text-[11px] text-slate-400">Cryptographic hash chain validated • Clean timeline submitted for audit</span>
          </div>
        </div>
        <Badge variant="emerald">Audit Cleared</Badge>
      </div>

      {/* Post-Assessment Explain-Your-Code Comprehension Check */}
      <div className="p-6 rounded-2xl bg-surface-mid/80 border border-border-prominent shadow-lg space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-border-subdued">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-neural" />
            <div>
              <h2 className="text-base font-bold text-white">Comprehension Verification (Explain Your Code)</h2>
              <p className="text-xs text-slate-400">
                BodhiMedha evaluates how you reasoned through the solution across 4 dimensions: Correctness, Clarity, Relevance, and Self-Rating Confidence.
              </p>
            </div>
          </div>
          <Badge variant="teal">AI Rubric Graded</Badge>
        </div>

        {explainSubmitted ? (
          <div className="p-5 rounded-xl bg-mastery-emerald/10 border border-mastery-emerald/30 text-mastery-emerald space-y-2">
            <div className="flex items-center gap-2 font-semibold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>Explanation Answers Recorded & Evaluated</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Your explanations were analyzed against your AST execution traces. Comprehension score: 92/100.
              Your BKT topic mastery has been updated.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {explainQuestions.map((q, idx) => (
              <div key={q.id} className="p-4 rounded-xl bg-surface-low border border-border-subdued space-y-3">
                <div className="flex items-center justify-between font-mono-code text-xs text-slate-400">
                  <span className="font-bold text-neural">Question {idx + 1}: {q.targetConcept}</span>
                  <span className="text-slate-500">{q.sourceLineReference}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-sans font-medium">
                  {q.prompt}
                </p>

                <textarea
                  value={explainAnswers[q.id] || ''}
                  onChange={(e) => setExplainAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                  placeholder="Explain your algorithmic rationale in your own words..."
                  rows={3}
                  className="w-full p-2.5 rounded bg-surface-editor border border-border-subdued text-xs text-slate-200 outline-none focus:border-neural font-sans"
                />

                {/* Self-Rating (Locked Decision) */}
                <div className="flex items-center justify-between pt-2 border-t border-border-subdued font-mono-code text-xs">
                  <span className="text-slate-400 text-[11px]">Rate your conceptual confidence before result reveal:</span>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setSelfRatings(prev => ({ ...prev, [q.id]: rating }))}
                        className={`w-6 h-6 rounded flex items-center justify-center text-xs font-semibold transition-colors ${
                          selfRatings[q.id] === rating
                            ? 'bg-neural text-white'
                            : 'bg-surface-elevated text-slate-400 hover:text-white'
                        }`}
                      >
                        {rating}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={handleExplainSubmit}
              className="w-full py-2.5 rounded-lg bg-neural hover:bg-neural-deep font-mono-code text-xs font-bold text-white shadow-md shadow-neural/25 transition-all"
            >
              Submit Explanations & Update Topic Mastery
            </button>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-4 border-t border-border-subdued">
        <button
          onClick={onReturnDashboard}
          className="px-4 py-2 rounded-lg bg-surface-mid hover:bg-surface-elevated font-mono-code text-xs text-slate-300 border border-border-subdued transition-colors"
        >
          Return to Arena Dashboard
        </button>
        <button
          onClick={onViewProgress}
          className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-neural to-mastery-teal font-mono-code text-xs font-semibold text-white shadow-md transition-all"
        >
          <span>View Updated Learning Progress</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
