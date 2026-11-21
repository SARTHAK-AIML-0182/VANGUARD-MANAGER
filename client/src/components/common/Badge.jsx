import React from 'react';

/**
 * Reusable Badge for status and categories
 */
export function Badge({
  children,
  variant = 'neutral', // 'pg', 'mess', 'resident', 'neutral', 'success', 'warning', 'danger'
  size = 'md',
  className = '',
  dot = false,
}) {
  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-medium px-2.5 py-1',
    lg: 'text-sm font-medium px-3 py-1.5',
  };

  const variantStyles = {
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    pg: 'bg-pg-badge text-pg-text border border-pg-border',
    mess: 'bg-mess-badge text-mess-text border border-mess-border',
    resident: 'bg-resident-badge text-resident-text border border-resident-border',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
  };

  const dotColors = {
    neutral: 'bg-slate-500',
    pg: 'bg-pg-primary',
    mess: 'bg-mess-primary',
    resident: 'bg-resident-primary',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`}></span>}
      {children}
    </span>
  );
}

export default Badge;
