import React from 'react';
import { 
  LayoutDashboard, 
  Code2, 
  Timer, 
  History, 
  Network, 
  Trophy,
  Flame,
  User,
  Sparkles
} from 'lucide-react';

export type NavTab = 'dashboard' | 'practice' | 'assessment' | 'submissions' | 'mastery' | 'leaderboard';

interface SidebarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  activeAssessmentsCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  activeAssessmentsCount = 1
}) => {
  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'practice' as NavTab, label: 'Practice Arena', icon: Code2 },
    { 
      id: 'assessment' as NavTab, 
      label: 'Timed Assessments', 
      icon: Timer,
      badge: activeAssessmentsCount > 0 ? `${activeAssessmentsCount} Live` : undefined 
    },
    { id: 'submissions' as NavTab, label: 'My Submissions', icon: History },
    { id: 'mastery' as NavTab, label: 'Concept Mastery', icon: Network },
    { id: 'leaderboard' as NavTab, label: 'Class Leaderboard', icon: Trophy }
  ];

  return (
    <aside className="w-64 h-screen bg-surface-low border-r border-border-subdued flex flex-col shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-border-subdued flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-neural to-mastery-teal flex items-center justify-center shadow-lg shadow-neural/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-semibold text-base tracking-tight text-white block">BodhiMedha</span>
            <span className="text-[10px] text-slate-400 font-mono-code tracking-wider uppercase block">Knowledge Engine</span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2 font-mono-code">
          Coding Arena
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm transition-all duration-150 group ${
                isActive 
                  ? 'bg-neural/15 text-white font-medium border border-neural/30 shadow-sm shadow-neural/10' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-surface-mid'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-neural' : 'text-slate-400 group-hover:text-slate-200'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-mono-code font-semibold px-1.5 py-0.5 rounded bg-diagnostic-amber/20 text-diagnostic-amber border border-diagnostic-amber/40">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Card */}
      <div className="p-3 border-t border-border-subdued bg-surface-low/80">
        <div className="p-3 rounded-lg bg-surface-mid/80 border border-border-subdued flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-surface-elevated border border-border-prominent flex items-center justify-center text-neural font-semibold text-xs shrink-0">
              AS
            </div>
            <div className="truncate">
              <span className="text-xs font-semibold text-white block truncate">Ananya Sharma</span>
              <span className="text-[11px] text-slate-400 block truncate">Student · CS Major</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[11px] text-diagnostic-amber font-mono-code bg-diagnostic-amber/10 px-1.5 py-0.5 rounded border border-diagnostic-amber/30 shrink-0" title="14-day practice streak">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>14d</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
