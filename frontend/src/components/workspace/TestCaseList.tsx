import React, { useState } from 'react';
import { TestCase } from '../../types/arena';
import { TestCaseResult } from '../../types/api';
import { CheckCircle2, XCircle, Clock, Cpu } from 'lucide-react';

interface TestCaseListProps {
  testCases: TestCase[];
  results?: TestCaseResult[];
  customInput: string;
  onChangeCustomInput: (val: string) => void;
  allowCustomInput?: boolean;
}

export const TestCaseList: React.FC<TestCaseListProps> = ({
  testCases,
  results,
  customInput,
  onChangeCustomInput,
  allowCustomInput = true
}) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const isCustomTab = activeTab === testCases.length;

  return (
    <div className="flex flex-col h-full bg-surface-low text-slate-200">
      {/* Case Tabs Bar */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border-subdued bg-surface-mid/50 overflow-x-auto shrink-0">
        {testCases.map((tc, idx) => {
          const res = results?.find(r => r.testCaseId === tc.id);
          const hasPassed = res?.passed;
          const hasRun = res !== undefined;

          return (
            <button
              key={tc.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono-code transition-all ${
                activeTab === idx
                  ? 'bg-surface-elevated text-white font-medium border border-border-prominent shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-surface-mid'
              }`}
            >
              {hasRun && (
                hasPassed 
                  ? <CheckCircle2 className="w-3.5 h-3.5 text-mastery-emerald shrink-0" />
                  : <XCircle className="w-3.5 h-3.5 text-diagnostic-rose shrink-0" />
              )}
              <span>Case {idx + 1}</span>
            </button>
          );
        })}

        {allowCustomInput && (
          <button
            onClick={() => setActiveTab(testCases.length)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono-code transition-all ${
              isCustomTab
                ? 'bg-surface-elevated text-white font-medium border border-border-prominent shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-surface-mid'
            }`}
          >
            <span>+ Custom Input</span>
          </button>
        )}
      </div>

      {/* Case Content Panel */}
      <div className="flex-1 p-3 overflow-y-auto font-mono-code text-xs">
        {isCustomTab ? (
          <div className="space-y-2">
            <div className="text-[11px] text-slate-400">Enter custom test arguments:</div>
            <textarea
              value={customInput}
              onChange={(e) => onChangeCustomInput(e.target.value)}
              placeholder="e.g. root = [3,5,1,6,2,0,8], p = 5, q = 1"
              rows={4}
              className="w-full p-2.5 rounded bg-surface-editor border border-border-subdued text-slate-200 outline-none focus:border-neural font-mono-code text-xs"
            />
          </div>
        ) : (
          (() => {
            const currentCase = testCases[activeTab];
            const currentResult = results?.find(r => r.testCaseId === currentCase?.id);

            if (!currentCase) return null;

            return (
              <div className="space-y-3">
                {/* Status Telemetry Banner (If Executed) */}
                {currentResult && (
                  <div className={`p-2.5 rounded border flex items-center justify-between text-xs ${
                    currentResult.passed 
                      ? 'bg-mastery-emerald/10 border-mastery-emerald/30 text-mastery-emerald' 
                      : 'bg-diagnostic-rose/10 border-diagnostic-rose/30 text-diagnostic-rose'
                  }`}>
                    <div className="flex items-center gap-2">
                      {currentResult.passed ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      <span className="font-semibold">{currentResult.passed ? 'Assertion Passed' : 'Assertion Failed'}</span>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {currentResult.runtimeMs}ms
                      </span>
                      <span className="flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5" />
                        {currentResult.memoryMb}MB
                      </span>
                    </div>
                  </div>
                )}

                {/* Input Block */}
                <div>
                  <div className="text-[11px] text-slate-400 mb-1">Input:</div>
                  <pre className="p-2 rounded bg-surface-editor border border-border-subdued text-slate-200 overflow-x-auto">
                    {currentCase.input}
                  </pre>
                </div>

                {/* Expected Output */}
                <div>
                  <div className="text-[11px] text-slate-400 mb-1">Expected Output:</div>
                  <pre className="p-2 rounded bg-surface-editor border border-border-subdued text-slate-200 overflow-x-auto">
                    {currentCase.expectedOutput}
                  </pre>
                </div>

                {/* Actual Output (if available) */}
                {currentResult?.actualOutput !== undefined && (
                  <div>
                    <div className="text-[11px] text-slate-400 mb-1">Actual Output:</div>
                    <pre className={`p-2 rounded bg-surface-editor border overflow-x-auto ${
                      currentResult.passed ? 'border-mastery-emerald/40 text-mastery-emerald' : 'border-diagnostic-rose/40 text-diagnostic-rose'
                    }`}>
                      {currentResult.actualOutput}
                    </pre>
                  </div>
                )}

                {currentResult?.error && (
                  <div>
                    <div className="text-[11px] text-diagnostic-rose mb-1">Error Trace:</div>
                    <pre className="p-2 rounded bg-diagnostic-rose/5 border border-diagnostic-rose/20 text-diagnostic-rose overflow-x-auto">
                      {currentResult.error}
                    </pre>
                  </div>
                )}
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
};
