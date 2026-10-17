import React, { useState } from 'react';
import { TestCase } from '../../types/arena';
import { RunCodeResponse } from '../../types/api';
import { TestCaseList } from './TestCaseList';
import { 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  ChevronUp, 
  ChevronDown, 
  Sparkles,
  Server
} from 'lucide-react';
import { Badge } from '../common/Badge';

interface ExecutionPanelProps {
  testCases: TestCase[];
  lastResponse: (RunCodeResponse & { isAuthoritativeServer?: boolean }) | null;
  isRunning: boolean;
  customInput: string;
  onChangeCustomInput: (val: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  activeExplainQuestions?: any[];
}

export const ExecutionPanel: React.FC<ExecutionPanelProps> = ({
  testCases,
  lastResponse,
  isRunning,
  customInput,
  onChangeCustomInput,
  isExpanded,
  onToggleExpand,
  activeExplainQuestions
}) => {
  const [activeTab, setActiveTab] = useState<'tests' | 'output' | 'explain'>('tests');

  const getVerdictBadge = () => {
    if (isRunning) {
      return (
        <Badge variant="amber" size="sm" className="animate-pulse">
          Executing in Sandbox...
        </Badge>
      );
    }
    if (!lastResponse) {
      return <span className="text-[11px] font-mono-code text-slate-500">Ready to run</span>;
    }

    switch (lastResponse.verdict) {
      case 'AC':
        return (
          <Badge variant="emerald" size="sm">
            <CheckCircle2 className="w-3 h-3" />
            Accepted ({lastResponse.testsPassed}/{lastResponse.totalTests} passed)
          </Badge>
        );
      case 'WA':
        return (
          <Badge variant="rose" size="sm">
            <XCircle className="w-3 h-3" />
            Wrong Answer ({lastResponse.testsPassed}/{lastResponse.totalTests} passed)
          </Badge>
        );
      case 'TLE':
        return <Badge variant="amber" size="sm">Time Limit Exceeded</Badge>;
      case 'RE':
        return <Badge variant="rose" size="sm">Runtime Error</Badge>;
      default:
        return <Badge variant="muted" size="sm">{lastResponse.verdict}</Badge>;
    }
  };

  return (
    <div className={`flex flex-col bg-surface-low border-t border-border-subdued transition-all duration-150 ${
      isExpanded ? 'h-72' : 'h-10'
    }`}>
      {/* Panel Top Bar */}
      <div className="h-10 px-3 bg-surface-mid/80 border-b border-border-subdued flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          {/* Tabs */}
          <div className="flex items-center gap-1 font-mono-code text-xs">
            <button
              onClick={() => { setActiveTab('tests'); if (!isExpanded) onToggleExpand(); }}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === 'tests' && isExpanded
                  ? 'bg-surface-elevated text-white font-medium border border-border-prominent'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Test Cases
            </button>
            <button
              onClick={() => { setActiveTab('output'); if (!isExpanded) onToggleExpand(); }}
              className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                activeTab === 'output' && isExpanded
                  ? 'bg-surface-elevated text-white font-medium border border-border-prominent'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>Execution Output</span>
            </button>
            {activeExplainQuestions && activeExplainQuestions.length > 0 && (
              <button
                onClick={() => { setActiveTab('explain'); if (!isExpanded) onToggleExpand(); }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded transition-colors ${
                  activeTab === 'explain' && isExpanded
                    ? 'bg-neural/20 text-neural font-medium border border-neural/40'
                    : 'text-neural hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3" />
                <span>Explain Understanding ({activeExplainQuestions.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Info & Toggle */}
        <div className="flex items-center gap-3">
          {lastResponse && isExpanded && (
            <div className="flex items-center gap-2 text-[11px] font-mono-code text-slate-400 hidden sm:flex">
              <span className="flex items-center gap-1">
                <Server className="w-3 h-3 text-slate-500" />
                {lastResponse.isAuthoritativeServer ? 'Server Sandbox' : 'Local Harness'}
              </span>
              <span>•</span>
              <span>{lastResponse.executionTimeMs}ms</span>
              <span>•</span>
              <span>{lastResponse.memoryUsedMb}MB</span>
            </div>
          )}

          {getVerdictBadge()}

          <button
            onClick={onToggleExpand}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-surface-elevated transition-colors"
            title={isExpanded ? 'Collapse Console' : 'Expand Console'}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Panel Body */}
      {isExpanded && (
        <div className="flex-1 overflow-hidden">
          {activeTab === 'tests' && (
            <TestCaseList
              testCases={testCases}
              results={lastResponse?.results}
              customInput={customInput}
              onChangeCustomInput={onChangeCustomInput}
            />
          )}

          {activeTab === 'output' && (
            <div className="h-full p-3 font-mono-code text-xs text-slate-300 bg-surface-editor overflow-y-auto space-y-2">
              {lastResponse ? (
                <>
                  {lastResponse.stdout && (
                    <pre className="text-slate-300 whitespace-pre-wrap">{lastResponse.stdout}</pre>
                  )}
                  {lastResponse.stderr && (
                    <pre className="text-diagnostic-rose whitespace-pre-wrap">{lastResponse.stderr}</pre>
                  )}
                  {!lastResponse.stdout && !lastResponse.stderr && (
                    <span className="text-slate-500 italic">No output produced to stdout/stderr.</span>
                  )}
                </>
              ) : (
                <span className="text-slate-500 italic">Run code to see stdout, stderr, and sandbox execution logs.</span>
              )}
            </div>
          )}

          {activeTab === 'explain' && (
            <div className="h-full p-4 font-sans text-xs bg-surface-low overflow-y-auto space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-border-subdued">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-neural" />
                  <span className="font-semibold text-slate-200">BodhiMedha Post-Execution Comprehension Verification</span>
                </div>
                <Badge variant="teal" size="sm">4-Dimension AI Rubric</Badge>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed">
                To evaluate comprehension beyond answer correctness, answer these AST-grounded questions about your code:
              </p>
              {activeExplainQuestions?.map((q, idx) => (
                <div key={q.id} className="p-3 rounded-lg bg-surface-mid border border-border-subdued space-y-2">
                  <div className="flex items-center justify-between font-mono-code text-[11px] text-slate-400">
                    <span className="font-semibold text-neural">Question {idx + 1} ({q.targetConcept})</span>
                    <span>{q.sourceLineReference}</span>
                  </div>
                  <p className="text-slate-200 text-xs">{q.prompt}</p>
                  <textarea
                    placeholder="Type your explanation here. Graded on Correctness, Clarity, Relevance, and Confidence."
                    rows={2}
                    className="w-full p-2 rounded bg-surface-editor border border-border-subdued text-slate-200 text-xs font-sans outline-none focus:border-neural"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
