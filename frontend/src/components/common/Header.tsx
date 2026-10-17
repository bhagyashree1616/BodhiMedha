import React from 'react';
import { 
  Bell, 
  Search, 
  Clock, 
  ShieldCheck, 
  AlertTriangle,
  Radio,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { Badge } from './Badge';

interface HeaderProps {
  breadcrumb: string;
  activeMode: 'practice' | 'assessment';
  onSwitchMode?: (mode: 'practice' | 'assessment') => void;
  // Assessment specific props
  isAssessmentActive?: boolean;
  remainingSeconds?: number;
  warningsCount?: number;
  onExitWorkspace?: () => void;
  autosaveTime?: string;
}

export const Header: React.FC<HeaderProps> = ({
  breadcrumb,
  activeMode,
  onSwitchMode,
  isAssessmentActive = false,
  remainingSeconds,
  warningsCount = 0,
  onExitWorkspace,
  autosaveTime
}) => {
  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="h-14 bg-surface-low border-b border-border-subdued px-4 flex items-center justify-between shrink-0 select-none">
      {/* Left: Breadcrumbs & Back */}
      <div className="flex items-center gap-3">
        {onExitWorkspace && (
          <button
            onClick={onExitWorkspace}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-mid hover:bg-surface-elevated text-xs font-mono-code text-slate-300 border border-border-subdued transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Arena</span>
          </button>
        )}
        <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
          <span className="text-slate-500">BodhiMedha</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-200 font-medium">{breadcrumb}</span>
        </div>
      </div>

      {/* Center: Mode Selector OR Assessment Timer */}
      <div className="flex items-center gap-3">
        {isAssessmentActive && remainingSeconds !== undefined ? (
          <div className="flex items-center gap-3">
            {/* Server Authoritative Timer */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-md font-mono-code text-xs font-semibold border ${
              remainingSeconds < 300 
                ? 'bg-diagnostic-rose/15 text-diagnostic-rose border-diagnostic-rose/40 animate-pulse' 
                : 'bg-diagnostic-amber/15 text-diagnostic-amber border-diagnostic-amber/40'
            }`}>
              <Clock className="w-4 h-4" />
              <span>{formatTime(remainingSeconds)} Remaining</span>
              <span className="text-[10px] text-slate-400 font-normal border-l border-border-prominent pl-2">
                Server Synced
              </span>
            </div>

            {/* Proctoring Status Pill */}
            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-surface-mid border border-border-subdued text-xs font-mono-code text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mastery-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mastery-emerald"></span>
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-mastery-emerald" />
              <span>Proctoring Active</span>
              {warningsCount > 0 ? (
                <span className="flex items-center gap-1 text-diagnostic-rose font-semibold bg-diagnostic-rose/15 px-1.5 py-0.5 rounded border border-diagnostic-rose/30">
                  <AlertTriangle className="w-3 h-3" />
                  <span>{warningsCount} Warn</span>
                </span>
              ) : (
                <span className="text-slate-500 text-[10px]">0 Flags</span>
              )}
            </div>
          </div>
        ) : (
          /* Segmented Mode Selector for Dashboard/Practice */
          onSwitchMode && (
            <div className="flex items-center p-0.5 rounded-lg bg-surface-mid border border-border-subdued text-xs">
              <button
                onClick={() => onSwitchMode('practice')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  activeMode === 'practice'
                    ? 'bg-neural text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Self-Paced Practice
              </button>
              <button
                onClick={() => onSwitchMode('assessment')}
                className={`px-3 py-1 rounded-md font-medium transition-all ${
                  activeMode === 'assessment'
                    ? 'bg-neural text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Timed Assessments
              </button>
            </div>
          )
        )}
      </div>

      {/* Right Cluster: Autosave & Telemetry */}
      <div className="flex items-center gap-3">
        {autosaveTime && (
          <span className="text-[11px] font-mono-code text-slate-400 flex items-center gap-1.5 hidden sm:inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-mastery-emerald"></span>
            <span>Draft saved {autosaveTime}</span>
          </span>
        )}
        <div className="flex items-center gap-2 pl-2 border-l border-border-subdued">
          <div className="flex items-center gap-1.5 text-[11px] font-mono-code text-slate-400 bg-surface-mid px-2 py-1 rounded border border-border-subdued" title="Knowledge Graph real-time synchronization">
            <Radio className="w-3 h-3 text-mastery-teal animate-pulse" />
            <span className="hidden md:inline">Graph Active</span>
          </div>
          <button className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-surface-mid transition-colors relative" title="Notifications">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-neural"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
