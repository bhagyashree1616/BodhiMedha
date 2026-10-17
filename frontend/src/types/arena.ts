export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD';

export type SupportedLanguage = 'python' | 'java' | 'cpp';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation?: string;
  isHidden?: boolean;
}

export interface ExampleCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  conceptId: string;
  conceptName: string;
  syllabusModuleId: string;
  syllabusModuleName: string;
  prerequisiteConceptName?: string;
  description: string;
  constraints: string[];
  examples: ExampleCase[];
  starterCode: Record<SupportedLanguage, string>;
  testCases: TestCase[];
  hints: string[];
  solutionExplanation?: string;
  supportedLanguages: SupportedLanguage[];
  solvedCount?: number;
  acceptanceRate?: number;
}

export interface SubmissionResult {
  id: string;
  problemId: string;
  language: SupportedLanguage;
  code: string;
  status: 'PENDING' | 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'MEMORY_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'SECURITY_VIOLATION';
  executionTimeMs: number;
  memoryUsedMb: number;
  testsPassed: number;
  totalTests: number;
  timestamp: string;
  stderr?: string;
}
