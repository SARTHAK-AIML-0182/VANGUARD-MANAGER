import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Receipt,
  Zap,
  Wifi,
  Droplets,
  Wrench,
  ShoppingBag,
  TrendingDown,
  Calendar
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export function PGExpenses() {
  const { data, addPgExpense } = useData();
  const { currentUser } = useAuth();
  const [expenseModal, setExpenseModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [newExpense, setNewExpense] = useState({
    title: '',
    category: 'ELECTRICITY',
    amount: '',
    paidTo: ''
  });

  const currentBizId = currentUser?.businessId || 'biz_pg_01';
  const allExpenses = (data.pgExpenses || []).filter(e => !e.businessId || e.businessId === currentBizId);
  const filteredExpenses = filterCategory === 'ALL'
    ? allExpenses
    : allExpenses.filter(e => e.category === filterCategory);

  const totalExpenseAmount = allExpenses.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) return;
    addPgExpense({
      ...newExpense,
      businessId: currentBizId,
      amount: parseFloat(newExpense.amount)
    });
    setNewExpense({ title: '', category: 'ELECTRICITY', amount: '', paidTo: '' });
    setExpenseModal(false);
    alert('Operational expense recorded successfully!');
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'ELECTRICITY': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'WIFI': return <Wifi className="w-4 h-4 text-sky-500" />;
      case 'WATER': return <Droplets className="w-4 h-4 text-blue-500" />;
      case 'MAINTENANCE': return <Wrench className="w-4 h-4 text-purple-500" />;
      default: return <ShoppingBag className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Operational Expenses & Bills</h1>
            <Badge variant="pg" size="md">Accounting</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track utility bills, electricity, water tankers, Wi-Fi lines, generator fuel, and repairs.
          </p>
        </div>

        <Button variant="pg" size="sm" icon={Plus} onClick={() => setExpenseModal(true)}>
          Record New Expense
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Total Expenses This Month</span>
          <p className="text-2xl font-black text-rose-600 mt-1">₹{totalExpenseAmount.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{allExpenses.length} audited expense vouchers</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Highest Cost Driver</span>
          <p className="text-2xl font-black text-slate-900 mt-1">Commercial Power</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">UPPCL Commercial Tariff</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Operating Expense Ratio</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">21.4%</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Healthy operating margin &gt; 75%</span>
        </Card>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['ALL', 'ELECTRICITY', 'WIFI', 'WATER', 'MAINTENANCE', 'SUPPLIES'].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Expense Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-3.5">Voucher #</th>
              <th className="p-3.5">Expense Description</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Paid To / Vendor</th>
              <th className="p-3.5">Date</th>
              <th className="p-3.5">Amount</th>
              <th className="p-3.5 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredExpenses.map((exp) => (
              <tr key={exp.id} className="hover:bg-slate-50">
                <td className="p-3.5 font-mono font-bold text-slate-900">{exp.id}</td>
                <td className="p-3.5 font-medium text-slate-900">{exp.title}</td>
                <td className="p-3.5">
                  <div className="flex items-center gap-1.5">
                    {getCategoryIcon(exp.category)}
                    <span className="font-semibold text-slate-700">{exp.category}</span>
                  </div>
                </td>
                <td className="p-3.5 text-slate-600">{exp.paidTo}</td>
                <td className="p-3.5 text-slate-500">{exp.date}</td>
                <td className="p-3.5 font-bold text-rose-600">₹{exp.amount?.toLocaleString()}</td>
                <td className="p-3.5 text-right">
                  <Badge variant="success" size="sm">PAID</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredExpenses.length === 0 && (
          <div className="p-8 text-center text-slate-400 text-xs">
            No expense records found under this filter.
          </div>
        )}
      </div>

      {/* Record Expense Modal */}
      <Modal
        isOpen={expenseModal}
        onClose={() => setExpenseModal(false)}
        title="Record Operational Expense"
        subtitle="Log utility, diesel, internet, or maintenance bill"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
          <Input
            label="Expense Description"
            placeholder="e.g. UPPCL Commercial Power Bill (Nov)"
            value={newExpense.title}
            onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="ELECTRICITY">Electricity Bill</option>
                <option value="WIFI">Wi-Fi & Internet</option>
                <option value="WATER">Water Supply</option>
                <option value="MAINTENANCE">Maintenance & Diesel</option>
                <option value="SUPPLIES">Housekeeping Supplies</option>
                <option value="MISC">Miscellaneous</option>
              </select>
            </div>
            <Input
              label="Amount Paid (₹)"
              type="number"
              placeholder="e.g. 14500"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              required
            />
          </div>
          <Input
            label="Paid To / Vendor Name"
            placeholder="e.g. UP Power Corporation Ltd"
            value={newExpense.paidTo}
            onChange={(e) => setNewExpense({ ...newExpense, paidTo: e.target.value })}
            required
          />
          <div className="pt-3">
            <Button variant="pg" size="md" type="submit" className="w-full justify-center">
              Save Expense Voucher
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PGExpenses;