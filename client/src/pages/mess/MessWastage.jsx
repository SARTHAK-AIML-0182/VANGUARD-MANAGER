import React from 'react';
import { Trash2, AlertTriangle, Plus, CheckCircle2, TrendingDown } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function MessWastage() {
  const { data } = useData();
  const wastageLogs = data.messWastage;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Food Wastage Tracker & Audits</h1>
            <Badge variant="mess" size="md">Sustainability</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Audit daily meal wastage, identify root causes, and optimize kitchen batch preparation.
          </p>
        </div>

        <Button variant="mess" size="sm" icon={Plus}>
          Log Today's Wastage
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card padding="md">
          <span className="text-xs font-semibold text-slate-500">Average Daily Wastage</span>
          <p className="text-2xl font-black text-slate-900 mt-1">2.85 kg</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
            <TrendingDown className="w-3.5 h-3.5" /> -18% reduction over past 30 days
          </span>
        </Card>
        <Card padding="md">
          <span className="text-xs font-semibold text-slate-500">Highest Wastage Meal</span>
          <p className="text-2xl font-black text-amber-700 mt-1">Sunday Dinner</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Due to weekend resident outings</span>
        </Card>
        <Card padding="md">
          <span className="text-xs font-semibold text-slate-500">Cost Impact Avoided</span>
          <p className="text-2xl font-black text-emerald-700 mt-1">₹14,200</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Through automated headcount forecasting</span>
        </Card>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-3.5">Date</th>
              <th className="p-3.5">Meal</th>
              <th className="p-3.5">Wasted (kg)</th>
              <th className="p-3.5">Reported Reason</th>
              <th className="p-3.5">Audited By</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {wastageLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="p-3.5 font-medium">{log.date}</td>
                <td className="p-3.5 font-bold text-slate-900">{log.meal}</td>
                <td className="p-3.5 font-bold text-amber-700">{log.wastedKg} kg</td>
                <td className="p-3.5 text-slate-600">{log.reason}</td>
                <td className="p-3.5 text-slate-500">{log.auditedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MessWastage;
