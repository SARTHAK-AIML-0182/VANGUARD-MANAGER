import React from 'react';

/**
 * Reusable Card Container for Vanguard Manager
 */
export function Card({
  children,
  className = '',
  hoverEffect = false,
  padding = 'md',
  borderAccent, // 'pg', 'mess', 'resident', or undefined
  onClick,
  ...props
}) {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const accentBorder = {
    pg: 'border-t-4 border-t-pg-primary',
    mess: 'border-t-4 border-t-mess-primary',
    resident: 'border-t-4 border-t-resident-primary',
  };

  const hoverClass = hoverEffect
    ? 'transition-all duration-200 hover:shadow-md hover:-translate-y-0.5'
    : '';

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 shadow-sm ${hoverClass} ${
        borderAccent ? accentBorder[borderAccent] : ''
      } ${paddingStyles[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, action, className = '' }) {
  return (
    <div className={`flex items-start justify-between pb-4 mb-4 border-b border-slate-100 ${className}`}>
      <div>
        {title && <h3 className="font-semibold text-slate-900 text-lg">{title}</h3>}
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0 ml-4">{action}</div>}
    </div>
  );
}

export default Card;
