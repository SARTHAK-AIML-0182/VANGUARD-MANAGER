import React, { useState } from 'react';
import {
  DollarSign,
  Plus,
  Wheat,
  Apple,
  Flame,
  Milk,
  Receipt,
  Users
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export function MessExpenses() {
  const { data, addMessExpense } = useData();
  const { currentUser } = useAuth();
  const [expenseModal, setExpenseModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [newExpense, setNewExpense] = useState({
    title: '',
    category: 'GROCERIES',
    amount: '',
    paidTo: ''
  });

  const currentBizId = currentUser?.businessId || 'biz_mess_01';
  const allExpenses = (data.messExpenses || []).filter(e => !e.businessId || e.businessId === currentBizId);
  const filteredExpenses = filterCategory === 'ALL'
    ? allExpenses
    : allExpenses.filter(e => e.category === filterCategory);

  const totalExpenseAmount = allExpenses.reduce((acc, curr) => acc + (parseFloat(curr.amount) || 0), 0);

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title || !newExpense.amount) return;
    addMessExpense({
      ...newExpense,
      businessId: currentBizId,
      amount: parseFloat(newExpense.amount)
    });
    setNewExpense({ title: '', category: 'GROCERIES', amount: '', paidTo: '' });
    setExpenseModal(false);
    alert('Kitchen expense logged into accounts successfully!');
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'GROCERIES': return <Wheat className="w-4 h-4 text-amber-500" />;
      case 'VEGETABLES': return <Apple className="w-4 h-4 text-emerald-500" />;
      case 'GAS': return <Flame className="w-4 h-4 text-rose-500" />;
      case 'DAIRY': return <Milk className="w-4 h-4 text-sky-500" />;
      default: return <Receipt className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Kitchen Expenses & Food Procurement</h1>
            <Badge variant="mess" size="md">Procurement</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track wholesale grains, daily vegetables, milk, commercial gas cylinders, and kitchen overheads.
          </p>
        </div>

        <Button variant="mess" size="sm" icon={Plus} onClick={() => setExpenseModal(true)}>
          Record Kitchen Expense
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Total Procurement This Month</span>
          <p className="text-2xl font-black text-rose-600 mt-1">₹{totalExpenseAmount.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{allExpenses.length} wholesale purchases audited</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Average Raw Material / Plate</span>
          <p className="text-2xl font-black text-slate-900 mt-1">₹18.40</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Optimal food cost ratio (38%)</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Commercial LPG Consumption</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">6 Cylinders</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Estimated 4.2 days per cylinder</span>
        </Card>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {['ALL', 'GROCERIES', 'VEGETABLES', 'GAS', 'DAIRY', 'MISC'].map((cat) => (
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
              <th className="p-3.5">Invoice #</th>
              <th className="p-3.5">Purchase Item / Invoice</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Vendor / Mandi</th>
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
            No kitchen expense records found under this filter.
          </div>
        )}
      </div>

      {/* Record Expense Modal */}
      <Modal
        isOpen={expenseModal}
        onClose={() => setExpenseModal(false)}
        title="Record Kitchen Procurement / Expense"
        subtitle="Log grain, vegetable, milk, spice, or commercial gas purchase"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddExpense} className="space-y-3 text-xs">
          <Input
            label="Procurement Description"
            placeholder="e.g. 50kg Basmati Rice + 40kg Toor Dal"
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
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="GROCERIES">Wholesale Grains & Pulses</option>
                <option value="VEGETABLES">Mandi Fresh Vegetables</option>
                <option value="GAS">Commercial LPG Cylinders</option>
                <option value="DAIRY">Milk, Paneer & Curd</option>
                <option value="SPICES">Cooking Oil & Spices</option>
                <option value="MISC">Kitchen Disposables & Cleaning</option>
              </select>
            </div>
            <Input
              label="Invoice Amount (₹)"
              type="number"
              placeholder="e.g. 8400"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              required
            />
          </div>
          <Input
            label="Supplier / Wholesale Vendor"
            placeholder="e.g. Aggarwal Grain Mandi Traders"
            value={newExpense.paidTo}
            onChange={(e) => setNewExpense({ ...newExpense, paidTo: e.target.value })}
            required
          />
          <div className="pt-3">
            <Button variant="mess" size="md" type="submit" className="w-full justify-center">
              Save Kitchen Expense
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default MessExpenses;