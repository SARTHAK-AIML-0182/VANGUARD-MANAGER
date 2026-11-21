import React from 'react';
import { Receipt, CheckCircle2, Clock, AlertCircle, Plus, DollarSign } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function PGInvoices() {
  const { data } = useData();
  const invoices = data.pgInvoices;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Rent Invoices & Payments</h1>
            <Badge variant="pg" size="md">Billing</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Automated monthly rent generation, receipt dispatch, and overdue tracking.
          </p>
        </div>

        <Button variant="pg" size="sm" icon={Plus}>
          Generate Rent Invoices
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Collected (Nov 2026)</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹3,48,500</p>
          <span className="text-[11px] text-slate-400">41 residents cleared</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Pending Dues</span>
          <p className="text-2xl font-black text-amber-600 mt-1">₹17,000</p>
          <span className="text-[11px] text-slate-400">2 invoices unpaid</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Security Deposits Held</span>
          <p className="text-2xl font-black text-slate-900 mt-1">₹7,14,000</p>
          <span className="text-[11px] text-slate-400">Refundable at checkout</span>
        </Card>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-3.5">Invoice #</th>
              <th className="p-3.5">Resident</th>
              <th className="p-3.5">Billing Month</th>
              <th className="p-3.5">Amount</th>
              <th className="p-3.5">Due Date</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-slate-900">{inv.id}</td>
                <td className="p-3.5 font-medium">{inv.residentName} ({inv.room})</td>
                <td className="p-3.5">{inv.month}</td>
                <td className="p-3.5 font-bold text-slate-900">₹{inv.amount.toLocaleString()}</td>
                <td className="p-3.5 text-slate-500">{inv.dueDate}</td>
                <td className="p-3.5">
                  <Badge variant={inv.status === 'PAID' ? 'success' : 'warning'} size="sm">
                    {inv.status}
                  </Badge>
                </td>
                <td className="p-3.5 text-right">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    Receipt
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PGInvoices;
