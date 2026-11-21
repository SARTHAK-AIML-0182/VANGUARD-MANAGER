import React from 'react';
import { Receipt, CheckCircle2, Download, AlertCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function ResidentPayments() {
  const { data } = useData();
  const invoices = data.pgInvoices.filter(i => i.residentName === 'Aarav Sharma');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Invoices & Payment Receipts</h1>
            <Badge variant="resident" size="md">Financial Records</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Download verified rent receipts and inspect past payment histories.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {invoices.map((inv) => (
          <Card key={inv.id} padding="md" className="border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{inv.month} Rent Bill</span>
                  <Badge variant={inv.status === 'PAID' ? 'success' : 'warning'} size="sm">
                    {inv.status}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500">
                  Invoice Ref: <span className="font-mono">{inv.id}</span> • Due Date: {inv.dueDate}
                </p>
                {inv.paidDate && (
                  <p className="text-[11px] text-emerald-600 font-medium">
                    Payment confirmed on {inv.paidDate}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4">
                <span className="text-lg font-black text-slate-900">₹{inv.amount.toLocaleString()}</span>
                {inv.status === 'PAID' ? (
                  <Button variant="outline" size="sm" icon={Download}>
                    Receipt
                  </Button>
                ) : (
                  <Button variant="pg" size="sm">
                    Pay Now
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ResidentPayments;
