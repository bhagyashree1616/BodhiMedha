import { SupportedLanguage } from './arena';

export type ExecutionVerdict = 
  | 'AC'  // Accepted
  | 'WA'  // Wrong Answer
  | 'TLE' // Time Limit Exceeded
  | 'MLE' // Memory Limit Exceeded
  | 'RE'  // Runtime Error
  | 'SECURITY_VIOLATION';

export interface RunCodeRequest {
  problemId: string;
  language: SupportedLanguage;
  code: string;
  customInput?: string;
  isAssessment?: boolean;
  assessmentId?: string;
}

export interface TestCaseResult {
  testCaseId: string;
  passed: boolean;
  actualOutput: string;
  expectedOutput: string;
  runtimeMs: number;
  memoryMb: number;
  error?: string;
}

export interface RunCodeResponse {
  runId: string;
  verdict: ExecutionVerdict;
  executionTimeMs: number;
  memoryUsedMb: number;
  stdout: string;
  stderr: string;
  results: TestCaseResult[];
  testsPassed: number;
  totalTests: number;
}

export interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  isOfflineFallback: boolean;
}
