import React from 'react';
import { LeaderboardEntry } from '../../types/analytics';
import { Trophy, Medal, Star, ShieldCheck, Info } from 'lucide-react';
import { Badge } from '../common/Badge';

interface LeaderboardViewProps {
  entries: LeaderboardEntry[];
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ entries }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-5xl mx-auto">
      {/* Title */}
      <div className="flex items-center justify-between pb-4 border-b border-border-subdued">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-diagnostic-amber" />
            <h1 className="text-xl font-bold text-white tracking-tight">Class Cohort Leaderboard</h1>
          </div>
          <p className="text-xs text-slate-400">
            Fair, transparent rankings based on Demonstrated Proficiency, Topic Mastery, and Assessment Consistency.
          </p>
        </div>
        <Badge variant="amber">CS201 Cohort</Badge>
      </div>

      {/* Fairness & Transparency Notice */}
      <div className="p-4 rounded-xl bg-surface-mid/80 border border-border-subdued text-xs text-slate-300 leading-relaxed flex items-start gap-3">
        <Info className="w-4 h-4 text-neural shrink-0 mt-0.5" />
        <div>
          <strong className="text-white block mb-0.5">Fair Ranking Policy:</strong>
          Scores are derived from formal proctored assessments and verifiable comprehension checks. Informal experimentation in the self-paced arena does not negatively affect your demonstrated proficiency.
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-xl bg-surface-mid/70 border border-border-subdued overflow-hidden shadow-sm">
        <div className="px-5 py-3 bg-surface-low/80 border-b border-border-subdued text-[11px] font-mono-code text-slate-500 uppercase tracking-wider grid grid-cols-12 gap-4">
          <span className="col-span-1">Rank</span>
          <span className="col-span-5">Student</span>
          <span className="col-span-2 text-center">Demonstrated Proficiency</span>
          <span className="col-span-2 text-center">Topics Mastered</span>
          <span className="col-span-2 text-right">Consistency</span>
        </div>

        <div className="divide-y divide-border-subdued">
          {entries.map((entry) => {
            const isTop3 = entry.rank <= 3;

            return (
              <div
                key={entry.studentId}
                className={`px-5 py-3.5 grid grid-cols-12 gap-4 items-center transition-colors font-mono-code text-xs ${
                  entry.isCurrentUser
                    ? 'bg-neural/10 border-l-2 border-neural text-white font-semibold'
                    : 'hover:bg-surface-mid text-slate-300'
                }`}
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center gap-1.5">
                  {entry.rank === 1 && <Medal className="w-4 h-4 text-diagnostic-amber" />}
                  {entry.rank === 2 && <Medal className="w-4 h-4 text-slate-300" />}
                  {entry.rank === 3 && <Medal className="w-4 h-4 text-amber-600" />}
                  <span className={isTop3 ? 'font-bold' : ''}>#{entry.rank}</span>
                </div>

                {/* Name */}
                <div className="col-span-5 flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    entry.isCurrentUser
                      ? 'bg-neural text-white'
                      : 'bg-surface-elevated text-slate-400'
                  }`}>
                    {entry.studentName.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <span className="block">{entry.studentName}</span>
                    {entry.isCurrentUser && (
                      <span className="text-[10px] text-neural font-normal block">Your Active Ranking</span>
                    )}
                  </div>
                </div>

                {/* Demonstrated Proficiency */}
                <div className="col-span-2 text-center font-bold text-sm text-mastery-emerald">
                  {entry.demonstratedProficiency}%
                </div>

                {/* Topics Mastered */}
                <div className="col-span-2 text-center">
                  <span className="px-2 py-0.5 rounded bg-surface-elevated text-slate-200 border border-border-subdued text-[11px]">
                    {entry.topicMasteryCount} Topics
                  </span>
                </div>

                {/* Consistency */}
                <div className="col-span-2 text-right text-slate-200">
                  <span className="text-slate-400 text-[11px]">{entry.consistencyScore}% consistent</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
