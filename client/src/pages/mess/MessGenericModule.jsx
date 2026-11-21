import React from 'react';
import { ShieldCheck, Plus, CheckCircle2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export function MessGenericModule({
  title = 'Mess Management Module',
  subtitle = 'Operational controls for this dining module',
  actionLabel = 'Add Record',
  badge = 'Active'
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <Badge variant="mess" size="md">{badge}</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>

        {actionLabel && (
          <Button variant="mess" size="sm" icon={Plus}>
            {actionLabel}
          </Button>
        )}
      </div>

      <Card padding="lg" className="border-slate-200">
        <div className="flex items-center gap-3 p-4 bg-emerald-50/60 rounded-xl border border-emerald-200 text-xs text-emerald-950 mb-6">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
          <span>This operational dining module operates strictly under Mess Tenant Scope: <strong>biz_mess_01</strong>. Isolated from PG workflows.</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs font-semibold text-slate-500 block">Active Status</span>
            <span className="text-xl font-bold text-slate-900 mt-1 block">Live & Synced</span>
            <p className="text-[11px] text-slate-400 mt-1">Automatic kitchen logging active</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs font-semibold text-slate-500 block">Access Control</span>
            <span className="text-xl font-bold text-emerald-700 mt-1 block">Role: Mess Owner</span>
            <p className="text-[11px] text-slate-400 mt-1">Catering administration enabled</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs font-semibold text-slate-500 block">Compliance</span>
            <span className="text-xl font-bold text-blue-600 mt-1 block">Data Minimized</span>
            <p className="text-[11px] text-slate-400 mt-1">Zero non-essential PII required</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Module: {title}</span>
          <span className="font-mono">Vanguard Dining Engine v1.0.0-prod</span>
        </div>
      </Card>
    </div>
  );
}

export default MessGenericModule;
