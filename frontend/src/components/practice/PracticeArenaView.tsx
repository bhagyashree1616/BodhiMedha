import React, { useState } from 'react';
import { Problem, Difficulty } from '../../types/arena';
import { DifficultyBadge, Badge } from '../common/Badge';
import { Search, Filter, Code2, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

interface PracticeArenaViewProps {
  problems: Problem[];
  onSelectProblem: (problemId: string) => void;
}

export const PracticeArenaView: React.FC<PracticeArenaViewProps> = ({
  problems,
  onSelectProblem
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'ALL'>('ALL');
  const [selectedModule, setSelectedModule] = useState<string>('ALL');

  const modules = Array.from(new Set(problems.map(p => p.syllabusModuleName)));

  const filteredProblems = problems.filter((prob) => {
    const matchesSearch = 
      prob.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.conceptName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prob.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDifficulty = difficultyFilter === 'ALL' || prob.difficulty === difficultyFilter;
    const matchesModule = selectedModule === 'ALL' || prob.syllabusModuleName === selectedModule;

    return matchesSearch && matchesDifficulty && matchesModule;
  });

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* Header & Description */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border-subdued">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Code2 className="w-5 h-5 text-neural" />
            <h1 className="text-xl font-bold text-white tracking-tight">Self-Paced Practice Library</h1>
          </div>
          <p className="text-xs text-slate-400">
            Strengthen your conceptual understanding with repeated executions, progressive hints, and syllabus-aligned challenges.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-surface-mid/80 border border-border-subdued space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems, concepts, or algorithms..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-surface-editor border border-border-subdued text-xs text-slate-200 placeholder-slate-500 outline-none focus:border-neural"
            />
          </div>

          {/* Difficulty Segment */}
          <div className="flex items-center gap-1 bg-surface-low p-1 rounded-lg border border-border-subdued shrink-0">
            {(['ALL', 'EASY', 'MEDIUM', 'HARD'] as const).map((diff) => (
              <button
                key={diff}
                onClick={() => setDifficultyFilter(diff)}
                className={`px-3 py-1 rounded text-xs font-mono-code transition-colors ${
                  difficultyFilter === diff
                    ? 'bg-surface-elevated text-white font-medium border border-border-prominent shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {diff === 'ALL' ? 'All' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Module Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs font-mono-code">
          <span className="text-slate-500 text-[11px] shrink-0">Module:</span>
          <button
            onClick={() => setSelectedModule('ALL')}
            className={`px-2.5 py-1 rounded-full text-[11px] transition-colors shrink-0 ${
              selectedModule === 'ALL'
                ? 'bg-neural/20 text-neural border border-neural/40 font-semibold'
                : 'text-slate-400 hover:text-slate-200 bg-surface-low'
            }`}
          >
            All Modules
          </button>
          {modules.map((mod) => (
            <button
              key={mod}
              onClick={() => setSelectedModule(mod)}
              className={`px-2.5 py-1 rounded-full text-[11px] transition-colors shrink-0 ${
                selectedModule === mod
                  ? 'bg-neural/20 text-neural border border-neural/40 font-semibold'
                  : 'text-slate-400 hover:text-slate-200 bg-surface-low'
              }`}
            >
              {mod}
            </button>
          ))}
        </div>
      </div>

      {/* Problem Cards Table */}
      <div className="rounded-xl bg-surface-mid/70 border border-border-subdued overflow-hidden shadow-sm">
        <div className="px-5 py-3 bg-surface-low/80 border-b border-border-subdued text-[11px] font-mono-code text-slate-500 uppercase tracking-wider grid grid-cols-12 gap-4">
          <span className="col-span-6">Problem & Concept</span>
          <span className="col-span-2">Difficulty</span>
          <span className="col-span-2">Acceptance</span>
          <span className="col-span-2 text-right">Action</span>
        </div>

        <div className="divide-y divide-border-subdued">
          {filteredProblems.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono-code text-slate-500">
              No problems match your current search and filter criteria.
            </div>
          ) : (
            filteredProblems.map((prob) => (
              <div 
                key={prob.id} 
                className="px-5 py-4 grid grid-cols-12 gap-4 items-center hover:bg-surface-mid transition-colors group"
              >
                <div className="col-span-6 space-y-1">
                  <div className="flex items-center gap-2">
                    <span 
                      onClick={() => onSelectProblem(prob.id)}
                      className="font-semibold text-sm text-slate-200 group-hover:text-neural transition-colors cursor-pointer"
                    >
                      {prob.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono-code">
                    <span className="text-neural">{prob.conceptName}</span>
                    <span>•</span>
                    <span>{prob.syllabusModuleName}</span>
                  </div>
                </div>

                <div className="col-span-2">
                  <DifficultyBadge difficulty={prob.difficulty} />
                </div>

                <div className="col-span-2 text-xs font-mono-code text-slate-300">
                  <span>{prob.acceptanceRate || 72.4}%</span>
                  <span className="text-[10px] text-slate-500 block">({prob.solvedCount || 400} solves)</span>
                </div>

                <div className="col-span-2 text-right">
                  <button
                    onClick={() => onSelectProblem(prob.id)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-surface-elevated group-hover:bg-neural text-slate-200 group-hover:text-white font-mono-code text-xs font-semibold border border-border-subdued group-hover:border-neural transition-all"
                  >
                    <span>Solve</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
