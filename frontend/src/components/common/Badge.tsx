import React from 'react';
import { Difficulty } from '../../types/arena';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neural' | 'emerald' | 'amber' | 'rose' | 'muted' | 'teal';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neural',
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    neural: 'bg-neural/10 text-neural border border-neural/30',
    emerald: 'bg-mastery-emerald/10 text-mastery-emerald border border-mastery-emerald/30',
    amber: 'bg-diagnostic-amber/10 text-diagnostic-amber border border-diagnostic-amber/30',
    rose: 'bg-diagnostic-rose/10 text-diagnostic-rose border border-diagnostic-rose/30',
    teal: 'bg-mastery-teal/10 text-mastery-teal border border-mastery-teal/30',
    muted: 'bg-surface-elevated text-slate-400 border border-border-subdued'
  };

  const sizeStyles = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2.5 py-1'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono-code font-medium rounded-full ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {children}
    </span>
  );
};

export const DifficultyBadge: React.FC<{ difficulty: Difficulty }> = ({ difficulty }) => {
  const config = {
    EASY: { variant: 'emerald' as const, label: 'Easy' },
    MEDIUM: { variant: 'amber' as const, label: 'Medium' },
    HARD: { variant: 'rose' as const, label: 'Hard' }
  }[difficulty];

  return <Badge variant={config.variant}>{config.label}</Badge>;
};
