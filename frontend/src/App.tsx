import React, { useState } from 'react';
import { Sidebar, NavTab } from './components/common/Sidebar';
import { Header } from './components/common/Header';
import { DashboardView } from './components/dashboard/DashboardView';
import { PracticeArenaView } from './components/practice/PracticeArenaView';
import { SharedPracticeWorkspace } from './components/workspace/SharedPracticeWorkspace';
import { TimedAssessmentView } from './components/assessment/TimedAssessmentView';
import { AssessmentResultView } from './components/assessment/AssessmentResultView';
import { PermissionSetupModal } from './components/proctoring/PermissionSetupModal';
import { LearningProgressView } from './components/analytics/LearningProgressView';
import { LeaderboardView } from './components/analytics/LeaderboardView';
import { ArenaService } from './services/arenaService';
import { AdaptiveService } from './services/adaptiveService';
import { Problem } from './types/arena';
import { TimedAssessment } from './types/assessment';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [activeProblem, setActiveProblem] = useState<Problem | null>(null);

  // Assessment states
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState<boolean>(false);
  const [isAssessmentRunning, setIsAssessmentRunning] = useState<boolean>(false);
  const [isAssessmentFinished, setIsAssessmentFinished] = useState<boolean>(false);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const [problems, setProblems] = useState<Problem[]>([]);
  const analytics = AdaptiveService.getStudentAnalytics();
  const activeAssessment: TimedAssessment = AdaptiveService.getActiveTimedAssessment();
  const leaderboard = AdaptiveService.getLeaderboard();

  React.useEffect(() => {
    ArenaService.getProblems().then(setProblems);
  }, []);

  const handleOpenProblem = (problemId: string) => {
    const found = problems.find(p => p.id === problemId || p.slug === problemId);
    if (found) {
      setActiveProblem(found);
    }
  };

  const handleStartExamSuccess = (stream: MediaStream) => {
    setMediaStream(stream);
    setIsPermissionModalOpen(false);
    setIsAssessmentRunning(true);
  };

  // Full-screen Workspace Views
  if (activeProblem) {
    return (
      <SharedPracticeWorkspace
        problem={activeProblem}
        onExit={() => setActiveProblem(null)}
      />
    );
  }

  if (isAssessmentRunning) {
    return (
      <TimedAssessmentView
        assessment={activeAssessment}
        mediaStream={mediaStream}
        onFinishAssessment={() => {
          setIsAssessmentRunning(false);
          setIsAssessmentFinished(true);
        }}
        onExit={() => setIsAssessmentRunning(false)}
      />
    );
  }

  if (isAssessmentFinished) {
    return (
      <div className="flex-1 flex flex-col h-screen bg-background overflow-hidden">
        <Header
          breadcrumb="Timed Assessments / Submission Result"
          activeMode="assessment"
          onExitWorkspace={() => setIsAssessmentFinished(false)}
        />
        <AssessmentResultView
          assessment={activeAssessment}
          onReturnDashboard={() => {
            setIsAssessmentFinished(false);
            setCurrentTab('dashboard');
          }}
          onViewProgress={() => {
            setIsAssessmentFinished(false);
            setCurrentTab('mastery');
          }}
        />
      </div>
    );
  }

  // Standard Navigation Layout
  return (
    <div className="flex h-screen bg-background overflow-hidden font-sans">
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        activeAssessmentsCount={1}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header
          breadcrumb={
            currentTab === 'dashboard' ? 'Dashboard' :
            currentTab === 'practice' ? 'Practice Arena' :
            currentTab === 'assessment' ? 'Timed Assessments' :
            currentTab === 'submissions' ? 'My Submissions' :
            currentTab === 'mastery' ? 'Concept Mastery' :
            'Class Leaderboard'
          }
          activeMode={currentTab === 'assessment' ? 'assessment' : 'practice'}
          onSwitchMode={(mode) => {
            setCurrentTab(mode === 'assessment' ? 'assessment' : 'practice');
          }}
        />

        {currentTab === 'dashboard' && (
          <DashboardView
            analytics={analytics}
            problems={problems}
            activeAssessment={activeAssessment}
            onOpenProblem={handleOpenProblem}
            onStartAssessmentModal={() => setIsPermissionModalOpen(true)}
            onSwitchTab={setCurrentTab}
          />
        )}

        {currentTab === 'practice' && (
          <PracticeArenaView
            problems={problems}
            onSelectProblem={handleOpenProblem}
          />
        )}

        {currentTab === 'assessment' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto">
            <div className="p-6 rounded-2xl bg-surface-mid/80 border border-border-prominent shadow-xl space-y-4">
              <span className="text-xs font-mono-code text-neural bg-neural/15 px-2.5 py-0.5 rounded-full border border-neural/30 font-semibold">
                Proctored Coding Exam
              </span>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                {activeAssessment.title}
              </h1>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                This timed coding assessment evaluates your algorithmic problem solving across Trees, Dynamic Programming, and Graph Traversals.
                Evaluation is server-authoritative and proctored under BodhiMedha AI Integrity Rules.
              </p>

              <div className="p-4 rounded-xl bg-surface-editor border border-border-subdued space-y-2 text-xs font-mono-code text-slate-300">
                <div className="text-slate-400 font-semibold">Assessment Parameters:</div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>• Duration: 45 Minutes</div>
                  <div>• Total Problems: 3 Coding Tasks</div>
                  <div>• Language: Python 3.10</div>
                  <div>• Proctoring: Camera + Audio Verified</div>
                </div>
              </div>

              <button
                onClick={() => setIsPermissionModalOpen(true)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-diagnostic-amber to-amber-600 hover:from-amber-600 hover:to-diagnostic-amber text-slate-950 font-mono-code text-sm font-bold shadow-lg shadow-diagnostic-amber/20 transition-all"
              >
                Begin Hardware Verification & Start Assessment
              </button>
            </div>
          </div>
        )}

        {currentTab === 'submissions' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-between pb-4 border-b border-border-subdued">
              <div>
                <h1 className="text-xl font-bold text-white tracking-tight">My Submission History</h1>
                <p className="text-xs text-slate-400">
                  Inspect your permitted compilation and sandbox execution verdicts across problems and assessments.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-surface-mid/70 border border-border-subdued divide-y divide-border-subdued overflow-hidden">
              {problems.map((p) => {
                const subs = ArenaService.getSubmissionHistory(p.id);
                return (
                  <div key={p.id} className="p-4 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm text-slate-200 block">{p.title}</span>
                      <span className="text-xs font-mono-code text-slate-400">{p.conceptName} • {subs.length} Recorded Attempts</span>
                    </div>
                    <button
                      onClick={() => handleOpenProblem(p.id)}
                      className="px-3 py-1.5 rounded bg-surface-elevated hover:bg-surface-mid font-mono-code text-xs text-slate-300 border border-border-subdued transition-colors"
                    >
                      Open in Editor
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {currentTab === 'mastery' && (
          <LearningProgressView
            analytics={analytics}
            onSelectProblem={handleOpenProblem}
            onGenerateFollowUp={() => {
              alert('AI follow-up engine requested: generating targeted questions for Tree Traversals & BST Invariants.');
            }}
          />
        )}

        {currentTab === 'leaderboard' && (
          <LeaderboardView entries={leaderboard} />
        )}
      </div>

      {/* Pre-Exam Hardware & Permission Modal */}
      <PermissionSetupModal
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        onSuccess={handleStartExamSuccess}
        assessmentTitle={activeAssessment.title}
      />
    </div>
  );
};
