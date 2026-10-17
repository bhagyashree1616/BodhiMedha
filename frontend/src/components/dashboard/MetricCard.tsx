import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  badge?: string;
  badgeVariant?: 'emerald' | 'amber' | 'rose' | 'neural';
  icon: LucideIcon;
  progressPercent?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  badge,
  badgeVariant = 'neural',
  icon: Icon,
  progressPercent
}) => {
  const badgeColors = {
    emerald: 'bg-mastery-emerald/15 text-mastery-emerald border-mastery-emerald/30',
    amber: 'bg-diagnostic-amber/15 text-diagnostic-amber border-diagnostic-amber/30',
    rose: 'bg-diagnostic-rose/15 text-diagnostic-rose border-diagnostic-rose/30',
    neural: 'bg-neural/15 text-neural border-neural/30'
  };

  return (
    <div className="p-4 rounded-xl bg-surface-mid/70 border border-border-subdued hover:border-border-prominent transition-all shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-mono-code text-slate-400">{title}</span>
        <div className="p-1.5 rounded-lg bg-surface-elevated text-slate-300">
          <Icon className="w-4 h-4 text-neural" />
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-bold font-mono-code text-white tracking-tight">
          {value}
        </div>
        {badge && (
          <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full border ${badgeColors[badgeVariant]}`}>
            {badge}
          </span>
        )}
      </div>

      {progressPercent !== undefined && (
        <div className="mt-3">
          <div className="h-1.5 w-full rounded-full bg-surface-elevated overflow-hidden">
            <div 
              style={{ width: `${progressPercent}%` }} 
              className="h-full rounded-full bg-gradient-to-r from-neural to-mastery-teal transition-all duration-500"
            />
          </div>
        </div>
      )}

      {subtitle && (
        <div className="text-[11px] text-slate-500 font-sans mt-2">
          {subtitle}
        </div>
      )}
    </div>
  );
};
