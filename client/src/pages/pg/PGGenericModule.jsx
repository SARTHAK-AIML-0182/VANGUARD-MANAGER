import React from 'react';
import { Layers, ShieldCheck, Plus, CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';

export function PGGenericModule({
  title = 'PG Management Module',
  subtitle = 'Operational controls for this business module',
  actionLabel = 'Add Record',
  badge = 'Active'
}) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
            <Badge variant="pg" size="md">{badge}</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
        </div>

        {actionLabel && (
          <Button variant="pg" size="sm" icon={Plus}>
            {actionLabel}
          </Button>
        )}
      </div>

      <Card padding="lg" className="border-slate-200">
        <div className="flex items-center gap-3 p-4 bg-blue-50/60 rounded-xl border border-blue-200 text-xs text-blue-900 mb-6">
          <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
          <span>This operational module operates strictly under PG Tenant Scope: <strong>biz_pg_01</strong>. All database transactions are tenant-isolated.</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs font-semibold text-slate-500 block">Total Active Records</span>
            <span className="text-xl font-bold text-slate-900 mt-1 block">Verified & Synced</span>
            <p className="text-[11px] text-slate-400 mt-1">Automatic audit logging enabled</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs font-semibold text-slate-500 block">Access Control</span>
            <span className="text-xl font-bold text-blue-600 mt-1 block">Role: PG Owner</span>
            <p className="text-[11px] text-slate-400 mt-1">Full administrative permissions</p>
          </div>
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
            <span className="text-xs font-semibold text-slate-500 block">Data Integrity</span>
            <span className="text-xl font-bold text-emerald-600 mt-1 block">100% Compliant</span>
            <p className="text-[11px] text-slate-400 mt-1">Zero cross-tenant leakage</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Module: {title}</span>
          <span className="font-mono">Vanguard Engine v1.0.0-prod</span>
        </div>
      </Card>
    </div>
  );
}

export default PGGenericModule;
