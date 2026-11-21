import React, { useState } from 'react';
import { ScrollText, Plus, CheckCircle2, Users } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useData } from '../../context/DataContext';

export function MessMealPlans() {
  const { data, addMealPlan } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: '',
    type: 'MONTHLY',
    meals: 'Breakfast + Dinner',
    price: 3600
  });

  const plans = data.messMealPlans;

  const handleCreate = (e) => {
    e.preventDefault();
    if (!newPlan.name) return;
    addMealPlan({
      ...newPlan,
      price: parseFloat(newPlan.price)
    });
    setNewPlan({ name: '', type: 'MONTHLY', meals: 'Breakfast + Dinner', price: 3600 });
    setModalOpen(false);
    alert('New dining plan created!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Meal Plans & Pricing</h1>
            <Badge variant="mess" size="md">Subscriptions</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Configure monthly dining packages, meal inclusions, and flexi passes.
          </p>
        </div>

        <Button variant="mess" size="sm" icon={Plus} onClick={() => setModalOpen(true)}>
          Create New Meal Plan
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} borderAccent="mess" padding="md">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                  {plan.type}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{plan.name}</h3>
              </div>
              <div className="text-right">
                <span className="text-2xl font-extrabold text-emerald-700">₹{plan.price.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 block">/ cycle</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Inclusions:</span>
                <span className="font-semibold text-slate-800">{plan.meals}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Subscribers:</span>
                <span className="font-bold text-emerald-600">{plan.activeSubscribers} Active</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-center text-xs"
                onClick={() => alert(`Plan "${plan.name}" is currently active for ${plan.activeSubscribers} subscribers.`)}
              >
                Inspect Plan Metrics
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* CREATE PLAN MODAL */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Dining Package"
        subtitle="Offer custom dining plans to students and working professionals"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
          <Input
            label="Plan Title"
            placeholder="e.g. Breakfast + Dinner Saver"
            value={newPlan.name}
            onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            required
          />
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Billing Cycle</label>
            <select
              value={newPlan.type}
              onChange={(e) => setNewPlan({ ...newPlan, type: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="MONTHLY">Monthly (30 Days)</option>
              <option value="15_DAYS">15 Days</option>
              <option value="FLEXI_PASS">Flexi Punch Pass</option>
            </select>
          </div>
          <Input
            label="Meal Inclusions"
            placeholder="e.g. Breakfast + Dinner (Mon-Sun)"
            value={newPlan.meals}
            onChange={(e) => setNewPlan({ ...newPlan, meals: e.target.value })}
            required
          />
          <Input
            label="Price (₹)"
            type="number"
            value={newPlan.price}
            onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="mess" size="sm" type="submit">
              Save Dining Plan
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default MessMealPlans;
