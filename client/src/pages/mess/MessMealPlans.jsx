import React from 'react';
import { ScrollText, Plus, CheckCircle2, Users } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function MessMealPlans() {
  const { data } = useData();
  const plans = data.messMealPlans;

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

        <Button variant="mess" size="sm" icon={Plus}>
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
              <Button variant="secondary" size="sm" className="w-full justify-center text-xs">
                Edit Details
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default MessMealPlans;
