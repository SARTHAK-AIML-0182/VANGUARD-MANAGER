import React, { useState } from 'react';
import { Receipt, CheckCircle2, Clock, AlertCircle, Plus, DollarSign, Download, Check } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { useData } from '../../context/DataContext';

export function PGInvoices() {
  const { data, recordPayment, generateMonthlyInvoices } = useData();
  const [receiptModalInvoice, setReceiptModalInvoice] = useState(null);
  const invoices = data.pgInvoices;

  const totalCollected = invoices
    .filter(i => i.status === 'PAID')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalPending = invoices
    .filter(i => i.status === 'UNPAID')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Rent Invoices & Payments</h1>
            <Badge variant="pg" size="md">Billing</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Automated monthly rent generation, payment tracking, and digital receipt dispatch.
          </p>
        </div>

        <Button
          variant="pg"
          size="sm"
          icon={Plus}
          onClick={() => {
            generateMonthlyInvoices('December 2026');
            alert('Batch invoices generated for all active residents!');
          }}
        >
          Generate December Invoices
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Total Collected</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">₹{totalCollected.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400">Paid invoices recorded</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Pending Dues</span>
          <p className="text-2xl font-black text-amber-600 mt-1">₹{totalPending.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400">{invoices.filter(i => i.status === 'UNPAID').length} invoices pending</span>
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
                <td className="p-3.5 text-right space-x-2">
                  {inv.status === 'UNPAID' ? (
                    <Button
                      variant="pg"
                      size="sm"
                      className="text-[11px] py-1 px-2.5"
                      onClick={() => {
                        recordPayment(inv.id);
                        alert(`Payment recorded for ${inv.residentName}! Receipt issued.`);
                      }}
                    >
                      Record Payment
                    </Button>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 text-[11px] py-1"
                      icon={Download}
                      onClick={() => setReceiptModalInvoice(inv)}
                    >
                      Receipt
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RECEIPT MODAL */}
      <Modal
        isOpen={Boolean(receiptModalInvoice)}
        onClose={() => setReceiptModalInvoice(null)}
        title="Official Payment Receipt"
        subtitle="Vanguard Rent Invoicing Engine"
        maxWidth="max-w-md"
      >
        {receiptModalInvoice && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between font-bold text-slate-900 pb-2 border-b border-slate-200">
                <span>Royal Comfort PG & Hostels</span>
                <span className="font-mono">{receiptModalInvoice.id}</span>
              </div>
              <p>Resident: <strong>{receiptModalInvoice.residentName}</strong> (Room {receiptModalInvoice.room})</p>
              <p>Month: {receiptModalInvoice.month}</p>
              <p>Amount Paid: <strong className="text-base text-emerald-700 font-extrabold">₹{receiptModalInvoice.amount.toLocaleString()}</strong></p>
              <p>Paid Date: {receiptModalInvoice.paidDate || 'Today'}</p>
              <p className="text-[10px] text-slate-400 pt-2 border-t border-slate-200">
                Authorized Digital Receipt • Vanguard Manager Tenancy Compliance
              </p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" size="sm" onClick={() => setReceiptModalInvoice(null)}>
                Close
              </Button>
              <Button variant="pg" size="sm" onClick={() => { window.print(); setReceiptModalInvoice(null); }}>
                Print Receipt
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default PGInvoices;
