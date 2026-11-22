import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';
import {
  UtensilsCrossed,
  DollarSign,
  Trash2,
  Users,
  Download,
  Calendar,
  Sparkles
} from 'lucide-react';
import Card, { CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

const weeklyMealData = [
  { day: 'Mon', breakfast: 112, lunch: 128, dinner: 125, wasteKg: 2.1 },
  { day: 'Tue', breakfast: 118, lunch: 130, dinner: 126, wasteKg: 1.8 },
  { day: 'Wed', breakfast: 115, lunch: 132, dinner: 128, wasteKg: 2.3 },
  { day: 'Thu', breakfast: 120, lunch: 129, dinner: 124, wasteKg: 2.0 },
  { day: 'Fri', breakfast: 116, lunch: 135, dinner: 130, wasteKg: 2.5 },
  { day: 'Sat', breakfast: 98, lunch: 110, dinner: 104, wasteKg: 3.2 },
  { day: 'Sun', breakfast: 105, lunch: 135, dinner: 92, wasteKg: 3.8 }
];

const financialMessHistory = [
  { month: 'Jun', revenue: 480000, foodCost: 195000, staffCost: 79000, netProfit: 206000 },
  { month: 'Jul', revenue: 510000, foodCost: 205000, staffCost: 79000, netProfit: 226000 },
  { month: 'Aug', revenue: 545000, foodCost: 218000, staffCost: 79000, netProfit: 248000 },
  { month: 'Sep', revenue: 540000, foodCost: 216000, staffCost: 79000, netProfit: 245000 },
  { month: 'Oct', revenue: 560000, foodCost: 224000, staffCost: 79000, netProfit: 257000 },
  { month: 'Nov', revenue: 567000, foodCost: 226800, staffCost: 79000, netProfit: 261200 }
];

export function MessReports() {
  const { data } = useData();

  const totalSubscribers = data.messCustomers.length || 135;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Dining & Kitchen Analytics</h1>
            <Badge variant="mess" size="md">Operational Reports</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Weekly meal consumption trends, food waste cost impact, and monthly subscription margins.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={() => alert('Exporting audited mess consumption & procurement report...')}
        >
          Export Kitchen Audit
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Monthly Subscription Revenue</span>
          <p className="text-2xl font-black text-slate-900 mt-1">₹5,67,000</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">135 active dining passes</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Weekly Meals Served</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">2,580 Plates</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Average 368 meals / day</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Food Waste Ratio</span>
          <p className="text-2xl font-black text-amber-600 mt-1">1.8%</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">17.7 kg weekly batch waste</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Net Operating Margin</span>
          <p className="text-2xl font-black text-slate-900 mt-1">46.1%</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Zero food deficit</span>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Meals Breakdown */}
        <Card padding="md" className="border-slate-200">
          <CardHeader
            title="Weekly Meal Attendance Breakdown"
            subtitle="Plates served per meal window (Breakfast, Lunch, Dinner)"
          />
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyMealData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#fff', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="breakfast" name="Breakfast" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="lunch" name="Lunch" fill="#10B981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="dinner" name="Dinner" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Financial Margins */}
        <Card padding="md" className="border-slate-200">
          <CardHeader
            title="Monthly Revenue vs Kitchen Procurement Cost"
            subtitle="Subscription collection against raw ingredients (in ₹)"
          />
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={financialMessHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="messRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip
                  formatter={(v) => [`₹${v.toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="revenue" name="Subscription Revenue" stroke="#10B981" fill="url(#messRevGrad)" strokeWidth={2.5} />
                <Area type="monotone" dataKey="foodCost" name="Ingredient Costs" stroke="#F43F5E" fill="none" strokeWidth={2} strokeDasharray="4 4" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MessReports;