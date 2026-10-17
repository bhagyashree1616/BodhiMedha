import React, { useState, useEffect } from 'react';
import { TimedAssessment, ProctoringIncident } from '../../types/assessment';
import { Problem } from '../../types/arena';
import { RunCodeResponse } from '../../types/api';
import { CodingArenaLayout } from '../workspace/CodingArenaLayout';
import { ProblemStatement } from '../workspace/ProblemStatement';
import { CodeEditor } from '../workspace/CodeEditor';
import { ExecutionPanel } from '../workspace/ExecutionPanel';
import { LiveProctoringFeed } from '../proctoring/LiveProctoringFeed';
import { IntegrityAlertModal } from '../proctoring/IntegrityAlertModal';
import { ProctoringService } from '../../services/proctoringService';
import { ExecutionService } from '../../services/executionService';
import { 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Send, 
  Play,
  ArrowRight
} from 'lucide-react';

interface TimedAssessmentViewProps {
  assessment: TimedAssessment;
  mediaStream: MediaStream | null;
  onFinishAssessment: () => void;
  onExit: () => void;
}

export const TimedAssessmentView: React.FC<TimedAssessmentViewProps> = ({
  assessment,
  mediaStream,
  onFinishAssessment,
  onExit
}) => {
  const [activeQuestionIdx, setActiveQuestionIdx] = useState<number>(0);
  const [remainingSeconds, setRemainingSeconds] = useState<number>(assessment.authoritativeRemainingSeconds);
  const [activeIncident, setActiveIncident] = useState<ProctoringIncident | null>(null);
  const [warningsCount, setWarningsCount] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(true);

  // Per-question code states
  const [questionCodes, setQuestionCodes] = useState<Record<number, string>>({
    0: assessment.questions[0].currentCode,
    1: assessment.questions[1].currentCode,
    2: assessment.questions[2].currentCode,
  });

  const [questionStatus, setQuestionStatus] = useState<Record<number, 'UNATTEMPTED' | 'DRAFT' | 'SUBMITTED'>>({
    0: 'UNATTEMPTED',
    1: 'UNATTEMPTED',
    2: 'UNATTEMPTED'
  });

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [lastResponse, setLastResponse] = useState<RunCodeResponse | null>(null);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState<boolean>(true);
  const [customInput, setCustomInput] = useState<string>('');

  const currentQuestion = assessment.questions[activeQuestionIdx];
  const currentProblem = currentQuestion.problem;
  const currentCode = questionCodes[activeQuestionIdx] || '';

  // Server-Authoritative Countdown Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          onFinishAssessment(); // Auto-submit when time expires
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onFinishAssessment]);

  // Subscribe to proctoring incidents
  useEffect(() => {
    const unsubscribe = ProctoringService.subscribe((incident) => {
      setActiveIncident(incident);
      setWarningsCount(ProctoringService.getWarningCount());
    });

    const cleanupListeners = ProctoringService.startMonitoring(
      assessment.strictFullscreen,
      assessment.blockExternalPaste
    );

    return () => {
      unsubscribe();
      cleanupListeners();
    };
  }, [assessment]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setIsConsoleExpanded(true);
    try {
      const res = await ExecutionService.runCode({
        problemId: currentProblem.id,
        language: currentQuestion.selectedLanguage,
        code: currentCode,
        customInput: customInput || undefined,
        isAssessment: true,
        assessmentId: assessment.id
      }, currentProblem);
      setLastResponse(res);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitQuestion = () => {
    setQuestionStatus(prev => ({ ...prev, [activeQuestionIdx]: 'SUBMITTED' }));
    if (activeQuestionIdx < assessment.questions.length - 1) {
      setActiveQuestionIdx(activeQuestionIdx + 1);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-background overflow-hidden relative">
      {/* Assessment Header Bar */}
      <div className="h-14 px-4 bg-surface-low border-b border-border-subdued flex items-center justify-between shrink-0 select-none">
        {/* Left: Title & Question Stepper */}
        <div className="flex items-center gap-4">
          <div>
            <span className="text-xs font-mono-code font-bold text-white block">
              {assessment.title}
            </span>
            <span className="text-[10px] text-slate-400 font-mono-code block">
              Question {activeQuestionIdx + 1} of {assessment.questions.length}
            </span>
          </div>

          <div className="h-6 w-px bg-border-prominent" />

          {/* Question Stepper Tabs */}
          <div className="flex items-center gap-1.5 font-mono-code text-xs">
            {assessment.questions.map((q, idx) => {
              const status = questionStatus[idx];
              const isActive = activeQuestionIdx === idx;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveQuestionIdx(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-all ${
                    isActive
                      ? 'bg-neural/20 text-white font-semibold border border-neural/50 shadow-sm'
                      : status === 'SUBMITTED'
                      ? 'bg-mastery-emerald/10 text-mastery-emerald border border-mastery-emerald/30'
                      : 'bg-surface-mid text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {status === 'SUBMITTED' && <CheckCircle2 className="w-3.5 h-3.5 text-mastery-emerald" />}
                  <span>Q{idx + 1}: {q.problem.title.substring(0, 16)}...</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Authoritative Timer */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-md font-mono-code text-xs font-bold bg-diagnostic-amber/15 text-diagnostic-amber border border-diagnostic-amber/40 shadow-sm">
          <Clock className="w-4 h-4 animate-pulse" />
          <span>{formatTimer(remainingSeconds)} Remaining</span>
          <span className="text-[10px] font-normal text-slate-400 pl-2 border-l border-border-prominent">
            Auto-submits at 00:00
          </span>
        </div>

        {/* Right Actions: Run, Submit Question, Finish Exam */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSubmitQuestion}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-mastery-emerald/20 hover:bg-mastery-emerald/30 text-mastery-emerald border border-mastery-emerald/40 font-mono-code text-xs font-semibold transition-all"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Submit Q{activeQuestionIdx + 1}</span>
          </button>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to finalize and submit your proctored assessment? This will lock all answers and submit your timeline for grading.')) {
                onFinishAssessment();
              }
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded bg-gradient-to-r from-diagnostic-rose to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-mono-code text-xs font-bold shadow-lg shadow-diagnostic-rose/25 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Finish & Submit Exam</span>
          </button>
        </div>
      </div>

      {/* Main Workbench */}
      <div className="flex-1 relative overflow-hidden">
        <CodingArenaLayout
          leftPane={
            <ProblemStatement
              problem={currentProblem}
              submissions={[]}
              activeHintIndex={0}
              onUnlockNextHint={() => {}}
              onRequestSolutionReveal={() => {}}
              isSolutionRevealed={false}
            />
          }
          editorPane={
            <CodeEditor
              code={currentCode}
              onChangeCode={(newCode) => {
                setQuestionCodes(prev => ({ ...prev, [activeQuestionIdx]: newCode }));
              }}
              language={currentQuestion.selectedLanguage}
              onChangeLanguage={() => {}}
              availableLanguages={[currentQuestion.selectedLanguage]}
              onRunCode={handleRunCode}
              onSubmit={handleSubmitQuestion}
              isRunning={isRunning}
              submitLabel={`Submit Q${activeQuestionIdx + 1}`}
              isAssessmentMode={true}
              blockExternalPaste={assessment.blockExternalPaste}
              onResetCode={() => {
                setQuestionCodes(prev => ({
                  ...prev,
                  [activeQuestionIdx]: currentProblem.starterCode[currentQuestion.selectedLanguage]
                }));
              }}
            />
          }
          bottomPane={
            <ExecutionPanel
              testCases={currentProblem.testCases}
              lastResponse={lastResponse}
              isRunning={isRunning}
              customInput={customInput}
              onChangeCustomInput={setCustomInput}
              isExpanded={isConsoleExpanded}
              onToggleExpand={() => setIsConsoleExpanded(!isConsoleExpanded)}
            />
          }
        />

        {/* Live Proctoring Webcam PiP Feed (Docked in Left Corner) */}
        <LiveProctoringFeed
          mediaStream={mediaStream}
          isFullscreen={isFullscreen}
          warningsCount={warningsCount}
        />
      </div>

      {/* Red Alert Modal for Integrity Violations */}
      <IntegrityAlertModal
        incident={activeIncident}
        onAcknowledge={() => setActiveIncident(null)}
      />
    </div>
  );
};
