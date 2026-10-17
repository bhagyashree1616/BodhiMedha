export interface TopicMastery {
  conceptId: string;
  conceptName: string;
  moduleName: string;
  masteryProbability: number; // 0.0 to 1.0 (from BKT)
  status: 'SOLID' | 'DEVELOPING' | 'WEAK';
  attemptsCount: number;
  prerequisiteGaps: string[];
  recommendedFollowUpProblemId?: string;
}

export interface LeaderboardEntry {
  rank: number;
  studentId: string;
  studentName: string;
  avatarUrl?: string;
  demonstratedProficiency: number; // 0-100%
  topicMasteryCount: number;
  consistencyScore: number;
  isCurrentUser: boolean;
}

export interface StudentAnalytics {
  studentId: string;
  overallMasteryPercentage: number;
  practiceSolvedCount: number;
  assessmentsCompletedCount: number;
  pendingFlagsCount: number;
  streakDays: number;
  topicMasteries: TopicMastery[];
}
