import { Problem, SupportedLanguage } from './arena';

export type AssessmentStatus = 
  | 'NOT_STARTED'
  | 'PERMISSIONS_CHECK'
  | 'IN_PROGRESS'
  | 'SUBMISSION_PENDING'
  | 'EVALUATING'
  | 'COMPLETED'
  | 'EXPIRED';

export type ProctoringEventType = 
  | 'FOCUS_LOSS'
  | 'FULLSCREEN_EXIT'
  | 'PASTE_ATTEMPT'
  | 'WINDOW_BLUR'
  | 'AUDIO_SPIKE'
  | 'FACE_ABSENT'
  | 'MULTIPLE_FACES';

export interface ProctoringIncident {
  id: string;
  timestamp: string;
  type: ProctoringEventType;
  warningNumber: number; // 1, 2, 3
  description: string;
  metadata?: Record<string, unknown>;
  reviewedByTeacher?: boolean;
}

export interface AssessmentQuestion {
  questionIndex: number;
  problem: Problem;
  status: 'UNATTEMPTED' | 'DRAFT' | 'SUBMITTED';
  currentCode: string;
  selectedLanguage: SupportedLanguage;
}

export interface TimedAssessment {
  id: string;
  title: string;
  syllabusModuleName: string;
  durationMinutes: number;
  totalQuestions: number;
  questions: AssessmentQuestion[];
  instructions: string[];
  strictFullscreen: boolean;
  blockExternalPaste: boolean;
  authoritativeRemainingSeconds: number;
  status: AssessmentStatus;
  startedAt?: string;
  expiresAt?: string;
}

export interface ExplainQuestion {
  id: string;
  prompt: string;
  sourceLineReference?: string;
  targetConcept: string;
  studentAnswer?: string;
  rubricScore?: {
    correctness: number;
    clarity: number;
    relevance: number;
    confidence: number;
  };
}
