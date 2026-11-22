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
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Bed,
  Users,
  Download,
  Calendar,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import Card, { CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const financialHistory = [
  { month: 'Jun', revenue: 280000, expenses: 62000, profit: 218000 },
  { month: 'Jul', revenue: 310000, expenses: 68000, profit: 242000 },
  { month: 'Aug', revenue: 345000, expenses: 74000, profit: 271000 },
  { month: 'Sep', revenue: 342000, expenses: 71000, profit: 271000 },
  { month: 'Oct', revenue: 352000, expenses: 76000, profit: 276000 },
  { month: 'Nov', revenue: 348500, expenses: 77100, profit: 271400 }
];

const occupancyHistory = [
  { month: 'Jun', occupancyRate: 78 },
  { month: 'Jul', occupancyRate: 82 },
  { month: 'Aug', occupancyRate: 88 },
  { month: 'Sep', occupancyRate: 86 },
  { month: 'Oct', occupancyRate: 89 },
  { month: 'Nov', occupancyRate: 87.5 }
];

const expenseCategoryBreakdown = [
  { name: 'Electricity', value: 38400, color: '#F59E0B' },
  { name: 'Staff Salaries', value: 84000, color: '#3B82F6' },
  { name: 'Maintenance & Fuel', value: 10800, color: '#8B5CF6' },
  { name: 'Water & Supplies', value: 12000, color: '#10B981' },
  { name: 'Internet & Tech', value: 6500, color: '#06B6D4' }
];

export function PGReports() {
  const { data } = useData();
  const { currentUser } = useAuth();

  const totalBeds = data.pgBeds.length || 48;
  const occupiedBeds = data.pgBeds.filter(b => b.status === 'OCCUPIED').length || 42;
  const occupancyPercentage = ((occupiedBeds / totalBeds) * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Financial & Operational Analytics</h1>
            <Badge variant="pg" size="md">Audited Reports</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Historical revenue tracking, occupancy performance, expense ratios, and tax readiness.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={() => alert('Exporting full audited annual financial report (PDF/Excel)...')}
        >
          Download Audit Report
        </Button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">6-Month Gross Revenue</span>
          <p className="text-2xl font-black text-slate-900 mt-1">₹19,77,500</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">↑ 12.4% vs Last Semester</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Average Occupancy Rate</span>
          <p className="text-2xl font-black text-blue-600 mt-1">{occupancyPercentage}%</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">{occupiedBeds} occupied of {totalBeds} total beds</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Net Operating Margin</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">77.9%</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">After utilities, staff & diesel</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Rent Collection Efficiency</span>
          <p className="text-2xl font-black text-slate-900 mt-1">98.2%</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">Zero default accounts</span>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <Card padding="md" className="border-slate-200">
          <CardHeader
            title="Monthly Revenue vs Operating Expenses"
            subtitle="Financial performance across past 6 months (in ₹)"
          />
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={financialHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(val) => `₹${val / 1000}k`} />
                <Tooltip
                  formatter={(value) => [`₹${value.toLocaleString()}`, '']}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="revenue" name="Rent Collected" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expenses" name="Operating Expenses" fill="#F43F5E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Occupancy Trend */}
        <Card padding="md" className="border-slate-200">
          <CardHeader
            title="Bed Occupancy Trajectory"
            subtitle="Percentage of physical capacity occupied over time"
          />
          <div className="h-72 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={occupancyHistory} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="occupancyGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(val) => `${val}%`} />
                <Tooltip
                  formatter={(value) => [`${value}%`, 'Occupancy Rate']}
                  contentStyle={{ backgroundColor: '#0F172A', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="occupancyRate" stroke="#2563EB" strokeWidth={2.5} fillOpacity={1} fill="url(#occupancyGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PGReports;