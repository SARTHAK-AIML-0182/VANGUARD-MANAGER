import React from 'react';
import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  Users,
  UserPlus,
  Package,
  Trash2,
  QrCode,
  CalendarDays,
  ArrowRight,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function MessDashboard() {
  const { data, approveApplication, rejectApplication } = useData();

  const business = data.businesses.biz_mess_01;
  const pendingApps = data.applications.filter(a => a.businessId === 'biz_mess_01' && a.status === 'PENDING');
  const lowStockItems = data.messInventory.filter(i => i.status === 'LOW_STOCK');

  const todayMenu = data.messMenu.Friday; // sample active day

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Mess & Dining Operational Command
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Annapurna Gourmet Mess & Tiffin
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            135 active dining subscribers. Manage meal plans, review new customer registrations, update daily menus, and prevent food wastage.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/mess/qr-code">
              <Button variant="mess" size="sm" icon={QrCode}>
                View Mess Registration QR
              </Button>
            </Link>
            <Link to="/mess/registrations">
              <Button variant="secondary" size="sm" icon={UserPlus}>
                Review Dining Requests ({pendingApps.length})
              </Button>
            </Link>
            <Link to="/mess/menus">
              <Button variant="outline" size="sm" className="text-white border-slate-700 hover:bg-slate-800">
                Today's Menu Live
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card borderAccent="mess" padding="md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Subscribers</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">135</span>
            <span className="text-xs font-semibold text-emerald-600">+12 this month</span>
          </div>
          <p className="mt-5 text-[11px] text-slate-500">84 Full Board, 36 Lunch/Dinner, 15 Flexi</p>
        </Card>

        <Card borderAccent="mess" padding="md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Registrations</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{pendingApps.length}</span>
            <span className="text-xs font-semibold text-amber-700">Needs Approval</span>
          </div>
          <p className="mt-5 text-[11px] text-slate-500">Scanned via dining hall QR code</p>
        </Card>

        <Card borderAccent="mess" padding="md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pantry Stock Status</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{lowStockItems.length} Low Items</span>
            <span className="text-xs font-semibold text-amber-600">Reorder</span>
          </div>
          <p className="mt-5 text-[11px] text-slate-500">Toor Dal & Fresh Paneer below threshold</p>
        </Card>

        <Card borderAccent="mess" padding="md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Avg Food Wastage</span>
            <div className="p-2 rounded-lg bg-slate-100 text-slate-700">
              <Trash2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">2.8 kg</span>
            <span className="text-xs font-semibold text-emerald-600">-18% vs Oct</span>
          </div>
          <p className="mt-5 text-[11px] text-slate-500">Optimized batch cooking in place</p>
        </Card>
      </div>

      {/* Main Grid: Today's Menu Live & Pending Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Today's Menu Schedule */}
        <div className="lg:col-span-2">
          <Card padding="md">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Today's Kitchen Menu (Friday)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Live schedule displayed on customer resident portal</p>
              </div>
              <Link to="/mess/menus">
                <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                  Manage Weekly Menu
                </Button>
              </Link>
            </div>

            <div className="space-y-3.5">
              <div className="p-4 rounded-xl border border-slate-200 bg-emerald-50/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Breakfast (7:30 AM - 9:30 AM)</span>
                  <Badge variant="success" size="sm">Served</Badge>
                </div>
                <p className="text-xs text-slate-800 font-medium">{todayMenu.breakfast}</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-emerald-50/30 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Lunch (12:30 PM - 2:30 PM)</span>
                  <Badge variant="success" size="sm">Active Window</Badge>
                </div>
                <p className="text-xs text-slate-800 font-medium">{todayMenu.lunch}</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Dinner (7:30 PM - 9:45 PM)</span>
                  <Badge variant="neutral" size="sm">Scheduled</Badge>
                </div>
                <p className="text-xs text-slate-800 font-medium">{todayMenu.dinner}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Pending Mess Applications */}
        <div>
          <Card padding="md">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">Pending Customers</h3>
              <Badge variant="warning" size="sm">{pendingApps.length}</Badge>
            </div>

            {pendingApps.length === 0 ? (
              <div className="text-center py-6 text-xs text-slate-400">
                <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-500 mb-1" />
                No pending customer requests.
              </div>
            ) : (
              <div className="space-y-3">
                {pendingApps.map(app => (
                  <div key={app.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{app.applicantName}</span>
                      <Badge variant="mess" size="sm">{app.dietaryPreference}</Badge>
                    </div>
                    <p className="text-slate-500">{app.phone} • Plan: {app.selectedPlan}</p>
                    <div className="pt-2 flex items-center gap-2">
                      <Button
                        variant="mess"
                        size="sm"
                        className="w-full justify-center text-[10px] py-1"
                        onClick={() => approveApplication(app.id, 'Approved via dashboard')}
                      >
                        Approve & Activate
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[10px] py-1"
                        onClick={() => rejectApplication(app.id, 'Capacity reached')}
                      >
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MessDashboard;
