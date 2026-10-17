import React, { useState, useEffect } from 'react';
import { Problem, SupportedLanguage, SubmissionResult } from '../../types/arena';
import { RunCodeResponse } from '../../types/api';
import { CodingArenaLayout } from './CodingArenaLayout';
import { ProblemStatement } from './ProblemStatement';
import { CodeEditor } from './CodeEditor';
import { ExecutionPanel } from './ExecutionPanel';
import { SolutionRevealModal } from './SolutionRevealModal';
import { Header } from '../common/Header';
import { ArenaService } from '../../services/arenaService';
import { ExecutionService } from '../../services/executionService';

interface SharedPracticeWorkspaceProps {
  problem: Problem;
  onExit: () => void;
}

export const SharedPracticeWorkspace: React.FC<SharedPracticeWorkspaceProps> = ({
  problem,
  onExit
}) => {
  const [language, setLanguage] = useState<SupportedLanguage>('python');
  const [code, setCode] = useState<string>('');
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [lastResponse, setLastResponse] = useState<(RunCodeResponse & { isAuthoritativeServer?: boolean }) | null>(null);
  const [customInput, setCustomInput] = useState<string>('');
  const [isConsoleExpanded, setIsConsoleExpanded] = useState<boolean>(true);
  const [submissions, setSubmissions] = useState<SubmissionResult[]>([]);
  
  // Hints & Solution reveal state
  const [activeHintIndex, setActiveHintIndex] = useState<number>(0);
  const [isSolutionModalOpen, setIsSolutionModalOpen] = useState<boolean>(false);
  const [isSolutionRevealed, setIsSolutionRevealed] = useState<boolean>(false);
  const [autosaveTime, setAutosaveTime] = useState<string>('just now');

  // Load draft & hint states on problem/language change
  useEffect(() => {
    const savedDraft = ArenaService.getSavedDraft(problem.id, language);
    setCode(savedDraft || problem.starterCode[language] || '');
    setActiveHintIndex(ArenaService.getActiveHintLevel(problem.id));
    setIsSolutionRevealed(ArenaService.isSolutionRevealed(problem.id));
    setSubmissions(ArenaService.getSubmissionHistory(problem.id));
  }, [problem.id, language]);

  // Code change with autosave debouncer
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    ArenaService.saveDraft(problem.id, language, newCode);
    setAutosaveTime(new Date().toLocaleTimeString());
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setIsConsoleExpanded(true);
    try {
      const res = await ExecutionService.runCode({
        problemId: problem.id,
        language,
        code,
        customInput: customInput || undefined,
        isAssessment: false
      }, problem);
      setLastResponse(res);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsConsoleExpanded(true);
    try {
      const res = await ExecutionService.runCode({
        problemId: problem.id,
        language,
        code,
        isAssessment: false
      }, problem);
      setLastResponse(res);

      // Record to history
      const subResult: SubmissionResult = {
        id: `sub-${Date.now()}`,
        problemId: problem.id,
        language,
        code,
        status: res.verdict === 'AC' ? 'ACCEPTED' : 'WRONG_ANSWER',
        executionTimeMs: res.executionTimeMs,
        memoryUsedMb: res.memoryUsedMb,
        testsPassed: res.testsPassed,
        totalTests: res.totalTests,
        timestamp: new Date().toISOString()
      };
      ArenaService.recordSubmission(subResult);
      setSubmissions(prev => [subResult, ...prev]);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUnlockHint = () => {
    const next = ArenaService.unlockNextHint(problem.id, problem.hints.length);
    setActiveHintIndex(next);
  };

  const handleConfirmSolutionReveal = () => {
    ArenaService.revealSolution(problem.id);
    setIsSolutionRevealed(true);
  };

  return (
    <div className="flex-1 flex flex-col h-screen bg-background overflow-hidden">
      {/* Workspace Header */}
      <Header
        breadcrumb={`Practice / ${problem.title}`}
        activeMode="practice"
        onExitWorkspace={onExit}
        autosaveTime={autosaveTime}
      />

      {/* Main Workspace Splitter */}
      <div className="flex-1 overflow-hidden">
        <CodingArenaLayout
          leftPane={
            <ProblemStatement
              problem={problem}
              submissions={submissions}
              activeHintIndex={activeHintIndex}
              onUnlockNextHint={handleUnlockHint}
              onRequestSolutionReveal={() => setIsSolutionModalOpen(true)}
              isSolutionRevealed={isSolutionRevealed}
            />
          }
          editorPane={
            <CodeEditor
              code={code}
              onChangeCode={handleCodeChange}
              language={language}
              onChangeLanguage={setLanguage}
              availableLanguages={problem.supportedLanguages}
              onRunCode={handleRunCode}
              onSubmit={handleSubmit}
              isRunning={isRunning}
              isSubmitting={isSubmitting}
              submitLabel="Submit Practice"
              isAssessmentMode={false}
              onResetCode={() => {
                const defaultCode = problem.starterCode[language] || '';
                handleCodeChange(defaultCode);
              }}
            />
          }
          bottomPane={
            <ExecutionPanel
              testCases={problem.testCases}
              lastResponse={lastResponse}
              isRunning={isRunning}
              customInput={customInput}
              onChangeCustomInput={setCustomInput}
              isExpanded={isConsoleExpanded}
              onToggleExpand={() => setIsConsoleExpanded(!isConsoleExpanded)}
            />
          }
        />
      </div>

      {/* Solution Reveal Confirmation Modal */}
      <SolutionRevealModal
        isOpen={isSolutionModalOpen}
        onClose={() => setIsSolutionModalOpen(false)}
        onConfirmReveal={handleConfirmSolutionReveal}
        isAlreadyRevealed={isSolutionRevealed}
        solutionExplanation={problem.solutionExplanation}
      />
    </div>
  );
};
