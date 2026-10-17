import { Problem, SubmissionResult } from '../types/arena';

// Standard syllabus-linked problem library reflecting BodhiMedha's core CS syllabus modules
export const DEFAULT_PROBLEMS: Problem[] = [
  {
    id: 'prob-bst-lca',
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    slug: 'lowest-common-ancestor-of-a-bst',
    difficulty: 'MEDIUM',
    conceptId: 'concept-bst-lca',
    conceptName: 'Tree Traversal & Invariant Properties',
    syllabusModuleId: 'module-trees-graphs',
    syllabusModuleName: 'Data Structures & Algorithms: Trees',
    prerequisiteConceptName: 'Recursion Depth & BST Properties',
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes \`p\` and \`q\` as the lowest node in \`T\` that has both \`p\` and \`q\` as descendants (where we allow a node to be a descendant of itself).”`,
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^5].',
      '-10^9 <= Node.val <= 10^9',
      'All Node.val are unique.',
      'p != q and both p and q exist in the BST.'
    ],
    examples: [
      {
        input: 'root = [6,2,8,0,4,7,9], p = 2, q = 8',
        output: '6',
        explanation: 'The LCA of nodes 2 and 8 is 6.'
      },
      {
        input: 'root = [6,2,8,0,4,7,9], p = 2, q = 4',
        output: '2',
        explanation: 'The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.'
      }
    ],
    starterCode: {
      python: `# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, x):
#         self.val = x
#         self.left = None
#         self.right = None

class Solution:
    def lowestCommonAncestor(self, root: 'TreeNode', p: 'TreeNode', q: 'TreeNode') -> 'TreeNode':
        # Write your adaptive solution here
        pass
`,
      java: `/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        // Write your adaptive solution here
        return null;
    }
}
`,
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        // Write your adaptive solution here
        return nullptr;
    }
};
`
    },
    testCases: [
      {
        id: 'tc-1',
        input: 'root = [6,2,8,0,4,7,9], p = 2, q = 8',
        expectedOutput: '6',
        explanation: 'Roots branch into left (2) and right (8) subtrees; root 6 is LCA.'
      },
      {
        id: 'tc-2',
        input: 'root = [6,2,8,0,4,7,9], p = 2, q = 4',
        expectedOutput: '2',
        explanation: 'Node 2 is an ancestor of node 4.'
      },
      {
        id: 'tc-3',
        input: 'root = [2,1], p = 2, q = 1',
        expectedOutput: '2',
        explanation: 'Simple two-node BST LCA.'
      }
    ],
    hints: [
      'Remember the invariant property of a Binary Search Tree: for any node, all values in its left subtree are strictly smaller, and all values in its right subtree are strictly greater.',
      'If both p.val and q.val are greater than the current node value, the LCA must reside in the right subtree.',
      'If both p.val and q.val are smaller than the current node value, the LCA must reside in the left subtree. Otherwise, the current node is the split point (the LCA).'
    ],
    solutionExplanation: `Optimal Algorithm:
We can traverse down the BST iteratively or recursively starting from root.
1. If both p and q have values greater than root.val, we descend to root.right.
2. If both p and q have values less than root.val, we descend to root.left.
3. The moment one value is on the left and the other is on the right (or one value equals root.val), we have found the split point, which is the Lowest Common Ancestor.

Time Complexity: O(h) where h is tree height (O(log n) balanced, O(n) worst case).
Space Complexity: O(1) iterative.`,
    supportedLanguages: ['python', 'java', 'cpp'],
    solvedCount: 1420,
    acceptanceRate: 78.4
  },
  {
    id: 'prob-coin-change',
    title: 'Coin Change (Fewest Coins to Make Target)',
    slug: 'coin-change',
    difficulty: 'MEDIUM',
    conceptId: 'concept-dp-coin-change',
    conceptName: 'Dynamic Programming & Memoization',
    syllabusModuleId: 'module-dynamic-programming',
    syllabusModuleName: 'Algorithms: Dynamic Programming',
    prerequisiteConceptName: 'Recursion Trees & Overlapping Subproblems',
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1 (3 coins total).'
      },
      {
        input: 'coins = [2], amount = 3',
        output: '-1',
        explanation: 'No combination of 2-coins can sum to 3.'
      },
      {
        input: 'coins = [1], amount = 0',
        output: '0',
        explanation: '0 amount requires 0 coins.'
      }
    ],
    starterCode: {
      python: `class Solution:
    def coinChange(self, coins: list[int], amount: int) -> int:
        # Write your dynamic programming solution here
        pass
`,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        // Write your dynamic programming solution here
        return -1;
    }
}
`,
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        // Write your dynamic programming solution here
        return -1;
    }
};
`
    },
    testCases: [
      {
        id: 'tc-1',
        input: 'coins = [1,2,5], amount = 11',
        expectedOutput: '3'
      },
      {
        id: 'tc-2',
        input: 'coins = [2], amount = 3',
        expectedOutput: '-1'
      },
      {
        id: 'tc-3',
        input: 'coins = [1], amount = 0',
        expectedOutput: '0'
      }
    ],
    hints: [
      'Think bottom-up: what is the minimum coins needed for amount 0, 1, 2, ..., up to target?',
      'Let dp[i] be the minimum coins needed to make amount i. dp[0] = 0, and all other dp entries initialized to infinity.',
      'For each amount i from 1 to target, and for each coin c in coins: if i - c >= 0, then dp[i] = min(dp[i], dp[i - c] + 1).'
    ],
    solutionExplanation: `Optimal Algorithm:
Build a 1D DP table of size amount + 1.
Initialize dp[0] = 0 and all other cells to amount + 1 (representing infinity).
Iterate from 1 to amount, taking the minimum of 1 + dp[i - coin].
Return dp[amount] if dp[amount] <= amount else -1.

Time Complexity: O(amount * len(coins)).
Space Complexity: O(amount).`,
    supportedLanguages: ['python', 'java', 'cpp'],
    solvedCount: 980,
    acceptanceRate: 54.2
  },
  {
    id: 'prob-course-schedule',
    title: 'Course Schedule (Topological Sort / Cycle Detection)',
    slug: 'course-schedule',
    difficulty: 'HARD',
    conceptId: 'concept-graph-cycles',
    conceptName: 'Directed Graphs & Topological Ordering',
    syllabusModuleId: 'module-trees-graphs',
    syllabusModuleName: 'Data Structures & Algorithms: Graphs',
    prerequisiteConceptName: 'Graph Representation & DFS Traversal',
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take course \`b_i\` first if you want to take course \`a_i\`.

For example, the pair \`[0, 1]\` indicates that to take course \`0\` you have to first take course \`1\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000',
      'prerequisites[i].length == 2',
      '0 <= a_i, b_i < numCourses',
      'All the pairs prerequisites[i] are unique.'
    ],
    examples: [
      {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: 'true',
        explanation: 'There are 2 courses. To take course 1 you must have finished course 0. So it is possible.'
      },
      {
        input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
        output: 'false',
        explanation: 'There are 2 courses to take. To take course 1 you must have finished course 0, and to take course 0 you must also have finished course 1. So it is impossible.'
      }
    ],
    starterCode: {
      python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        # Write your cycle detection / topological sort solution here
        pass
`,
      java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        // Write your cycle detection / topological sort solution here
        return false;
    }
}
`,
      cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        // Write your cycle detection / topological sort solution here
        return false;
    }
};
`
    },
    testCases: [
      {
        id: 'tc-1',
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        expectedOutput: 'true'
      },
      {
        id: 'tc-2',
        input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]',
        expectedOutput: 'false'
      }
    ],
    hints: [
      'This problem is equivalent to finding if a cycle exists in a directed graph.',
      'You can use Kahn algorithm (BFS with in-degree array) or 3-color DFS (WHITE, GRAY, BLACK).',
      'If you encounter a node that is currently in the active recursion stack (GRAY), a cycle is detected.'
    ],
    solutionExplanation: `Optimal Algorithm:
Compute in-degree for all vertices. Enqueue nodes with in-degree 0 into a queue.
While queue is not empty, pop a course, increment count of processed courses, and decrease in-degree of its neighbors. If a neighbor reaches in-degree 0, enqueue it.
If processed courses equals numCourses, return true, otherwise false (cycle exists).`,
    supportedLanguages: ['python', 'java', 'cpp'],
    solvedCount: 650,
    acceptanceRate: 46.1
  }
];

export class ArenaService {
  private static DRAFT_KEY_PREFIX = 'bodhimedha_draft_';
  private static HINT_INDEX_PREFIX = 'bodhimedha_hint_';
  private static SOLUTION_REVEALED_PREFIX = 'bodhimedha_sol_revealed_';

  static async getProblems(): Promise<Problem[]> {
    return DEFAULT_PROBLEMS;
  }

  static async getProblemById(id: string): Promise<Problem | null> {
    const prob = DEFAULT_PROBLEMS.find(p => p.id === id || p.slug === id);
    return prob || null;
  }

  static getSavedDraft(problemId: string, language: string): string | null {
    try {
      return localStorage.getItem(`${this.DRAFT_KEY_PREFIX}${problemId}_${language}`);
    } catch {
      return null;
    }
  }

  static saveDraft(problemId: string, language: string, code: string): void {
    try {
      localStorage.setItem(`${this.DRAFT_KEY_PREFIX}${problemId}_${language}`, code);
    } catch {
      // LocalStorage quota or access error handled gracefully
    }
  }

  static getActiveHintLevel(problemId: string): number {
    try {
      const val = localStorage.getItem(`${this.HINT_INDEX_PREFIX}${problemId}`);
      return val ? parseInt(val, 10) : 0;
    } catch {
      return 0;
    }
  }

  static unlockNextHint(problemId: string, maxHints: number): number {
    const current = this.getActiveHintLevel(problemId);
    const next = Math.min(current + 1, maxHints);
    try {
      localStorage.setItem(`${this.HINT_INDEX_PREFIX}${problemId}`, next.toString());
    } catch {
      // Ignore
    }
    return next;
  }

  static isSolutionRevealed(problemId: string): boolean {
    try {
      return localStorage.getItem(`${this.SOLUTION_REVEALED_PREFIX}${problemId}`) === 'true';
    } catch {
      return false;
    }
  }

  static revealSolution(problemId: string): void {
    try {
      localStorage.setItem(`${this.SOLUTION_REVEALED_PREFIX}${problemId}`, 'true');
    } catch {
      // Ignore
    }
  }

  static getSubmissionHistory(problemId: string): SubmissionResult[] {
    try {
      const raw = localStorage.getItem(`bodhimedha_subs_${problemId}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  static recordSubmission(sub: SubmissionResult): void {
    try {
      const history = this.getSubmissionHistory(sub.problemId);
      history.unshift(sub);
      localStorage.setItem(`bodhimedha_subs_${sub.problemId}`, JSON.stringify(history.slice(0, 10)));
    } catch {
      // Ignore
    }
  }
}
