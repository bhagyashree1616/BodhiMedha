import { StudentAnalytics, TopicMastery, LeaderboardEntry } from '../types/analytics';
import { ExplainQuestion, TimedAssessment } from '../types/assessment';
import { DEFAULT_PROBLEMS } from './arenaService';

export class AdaptiveService {
  static getStudentAnalytics(): StudentAnalytics {
    return {
      studentId: 'std-ananya-409',
      overallMasteryPercentage: 78,
      practiceSolvedCount: 42,
      assessmentsCompletedCount: 6,
      pendingFlagsCount: 0,
      streakDays: 14,
      topicMasteries: [
        {
          conceptId: 'concept-bst',
          conceptName: 'Trees & Hierarchical Structures',
          moduleName: 'Data Structures: Trees & Graphs',
          masteryProbability: 0.45,
          status: 'WEAK',
          attemptsCount: 8,
          prerequisiteGaps: ['Tree Traversal Invariants', 'Recursion Call Stack'],
          recommendedFollowUpProblemId: 'prob-bst-lca'
        },
        {
          conceptId: 'concept-dp',
          conceptName: 'Dynamic Programming & Memoization',
          moduleName: 'Algorithms: Dynamic Programming',
          masteryProbability: 0.85,
          status: 'SOLID',
          attemptsCount: 14,
          prerequisiteGaps: []
        },
        {
          conceptId: 'concept-arrays',
          conceptName: 'Arrays & Two Pointers',
          moduleName: 'Data Structures: Arrays',
          masteryProbability: 0.92,
          status: 'SOLID',
          attemptsCount: 16,
          prerequisiteGaps: []
        },
        {
          conceptId: 'concept-graphs',
          conceptName: 'Graph Topological Sort & Cycles',
          moduleName: 'Data Structures: Trees & Graphs',
          masteryProbability: 0.62,
          status: 'DEVELOPING',
          attemptsCount: 5,
          prerequisiteGaps: ['Directed Cycle Detection (3-Color DFS)'],
          recommendedFollowUpProblemId: 'prob-course-schedule'
        }
      ]
    };
  }

  static getLeaderboard(): LeaderboardEntry[] {
    return [
      {
        rank: 1,
        studentId: 'std-rohit-102',
        studentName: 'Rohit Verma',
        demonstratedProficiency: 94.5,
        topicMasteryCount: 9,
        consistencyScore: 98,
        isCurrentUser: false
      },
      {
        rank: 2,
        studentId: 'std-meera-204',
        studentName: 'Meera Krishnan',
        demonstratedProficiency: 91.2,
        topicMasteryCount: 8,
        consistencyScore: 95,
        isCurrentUser: false
      },
      {
        rank: 3,
        studentId: 'std-ananya-409',
        studentName: 'Ananya Sharma (You)',
        demonstratedProficiency: 88.5,
        topicMasteryCount: 7,
        consistencyScore: 92,
        isCurrentUser: true
      },
      {
        rank: 4,
        studentId: 'std-sid-301',
        studentName: 'Siddharth Patel',
        demonstratedProficiency: 82.0,
        topicMasteryCount: 6,
        consistencyScore: 89,
        isCurrentUser: false
      },
      {
        rank: 5,
        studentId: 'std-priya-505',
        studentName: 'Priya Iyer',
        demonstratedProficiency: 79.4,
        topicMasteryCount: 5,
        consistencyScore: 84,
        isCurrentUser: false
      }
    ];
  }

  static getActiveTimedAssessment(): TimedAssessment {
    return {
      id: 'assessment-midterm-trees-dp',
      title: 'Mid-Term Coding Assessment: Trees, DP & Graphs',
      syllabusModuleName: 'CS201 Data Structures & Algorithms',
      durationMinutes: 45,
      totalQuestions: 3,
      authoritativeRemainingSeconds: 45 * 60,
      strictFullscreen: true,
      blockExternalPaste: true,
      status: 'NOT_STARTED',
      instructions: [
        'This assessment is strictly proctored under BodhiMedha AI Integrity Rules.',
        'Camera and microphone access must be maintained for the duration of the exam.',
        'Fullscreen mode is mandatory. Switching tabs or windows will trigger escalating warnings and flag the session for teacher review.',
        'External clipboard paste is prohibited. You may cut/copy within the code editor.',
        'Evaluation is authoritative on our isolated sandbox server with hidden test cases upon final submission.'
      ],
      questions: [
        {
          questionIndex: 0,
          problem: DEFAULT_PROBLEMS[0],
          status: 'UNATTEMPTED',
          currentCode: DEFAULT_PROBLEMS[0].starterCode.python,
          selectedLanguage: 'python'
        },
        {
          questionIndex: 1,
          problem: DEFAULT_PROBLEMS[1],
          status: 'UNATTEMPTED',
          currentCode: DEFAULT_PROBLEMS[1].starterCode.python,
          selectedLanguage: 'python'
        },
        {
          questionIndex: 2,
          problem: DEFAULT_PROBLEMS[2],
          status: 'UNATTEMPTED',
          currentCode: DEFAULT_PROBLEMS[2].starterCode.python,
          selectedLanguage: 'python'
        }
      ]
    };
  }

  static generateExplainQuestions(problemId: string): ExplainQuestion[] {
    if (problemId === 'prob-bst-lca') {
      return [
        {
          id: 'exp-1',
          prompt: 'Why does your solution compare both p.val and q.val against root.val before descending, and what property of the BST ensures this is sufficient?',
          sourceLineReference: 'Lines 10-14',
          targetConcept: 'BST Invariant Traversal'
        },
        {
          id: 'exp-2',
          prompt: 'What is the worst-case time complexity of your approach on a degenerate (skewed) binary search tree versus a balanced BST?',
          sourceLineReference: 'While loop traversal',
          targetConcept: 'Algorithmic Complexity & Tree Height'
        }
      ];
    }

    return [
      {
        id: 'exp-coin-1',
        prompt: 'Explain the base case of your DP table or recursion, and how it prevents an infinite loop when the target amount is 0.',
        sourceLineReference: 'dp[0] initialization',
        targetConcept: 'DP Base Cases'
      },
      {
        id: 'exp-coin-2',
        prompt: 'Why is a bottom-up 1D array sufficient rather than requiring a 2D table of size len(coins) x amount?',
        sourceLineReference: 'Space optimization',
        targetConcept: 'Space Complexity Optimization'
      }
    ];
  }
}
