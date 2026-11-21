import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Home,
  Receipt,
  CalendarCheck,
  CalendarDays,
  MessageSquareWarning,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  UtensilsCrossed
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function ResidentDashboard() {
  const { currentUser } = useAuth();
  const { data } = useData();

  const isPg = currentUser?.role === 'PG_STUDENT';
  const myResidentInfo = data.pgResidents.find(r => r.name === currentUser?.name) || data.pgResidents[0];
  const myCustomerInfo = data.messCustomers.find(c => c.name === currentUser?.name) || data.messCustomers[0];

  const myInvoices = data.pgInvoices.filter(i => i.residentName === myResidentInfo.name);

  return (
    <div className="space-y-6">
      {/* Resident Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <User className="w-3.5 h-3.5" />
            Resident Self-Service Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser?.name || 'Aarav Sharma'}
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            {isPg ? (
              <>Resident at <strong>{currentUser?.businessName}</strong> • Room {myResidentInfo.roomNumber} ({myResidentInfo.bedNumber})</>
            ) : (
              <>Subscriber at <strong>{currentUser?.businessName}</strong> • Plan: {myCustomerInfo.planName}</>
            )}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/resident/stay">
              <Button variant="resident" size="sm" icon={isPg ? Home : UtensilsCrossed}>
                {isPg ? 'My Room & Bed Details' : 'My Meal Plan'}
              </Button>
            </Link>
            <Link to="/resident/payments">
              <Button variant="secondary" size="sm" icon={Receipt}>
                View Rent Invoices
              </Button>
            </Link>
            {isPg && (
              <Link to="/resident/leave">
                <Button variant="outline" size="sm" className="text-white border-slate-700 hover:bg-slate-800" icon={CalendarDays}>
                  Apply for Leave
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 3 Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card borderAccent="resident" padding="md">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Status</span>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="success" size="lg" dot>
              Active & Verified
            </Badge>
          </div>
          <p className="mt-4 text-[11px] text-slate-500 font-mono">
            Resident Code: {myResidentInfo.residentCode}
          </p>
        </Card>

        <Card borderAccent="resident" padding="md">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {isPg ? 'Monthly Rent' : 'Meal Subscription'}
          </span>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {isPg ? `₹${myResidentInfo.monthlyRent.toLocaleString()}` : `₹3,400`}
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold">November Dues Cleared</span>
        </Card>

        <Card borderAccent="resident" padding="md">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nightly Curfew Check</span>
          <p className="text-sm font-bold text-slate-900 mt-2 flex items-center gap-1.5 text-emerald-600">
            <CheckCircle2 className="w-4 h-4" /> Marked Present Tonight
          </p>
          <span className="text-[11px] text-slate-400 mt-2 block">Punched at 9:42 PM</span>
        </Card>
      </div>

      {/* Main Grid: My Invoices & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card padding="md">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">My Rent & Payment Records</h3>
              <Link to="/resident/payments">
                <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                  View Full History
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {myInvoices.map((inv) => (
                <div key={inv.id} className="p-3.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{inv.month} Rent Bill</span>
                    <span className="text-slate-500">Invoice: {inv.id} • Due: {inv.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-sm text-slate-900">₹{inv.amount.toLocaleString()}</span>
                    <Badge variant={inv.status === 'PAID' ? 'success' : 'warning'} size="sm">
                      {inv.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card padding="md">
            <h3 className="font-bold text-slate-900 text-base mb-3">Resident Support</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Encountered any maintenance issue with your room, Wi-Fi, or plumbing?
            </p>

            <div className="space-y-2.5">
              <Link to="/resident/complaints">
                <Button variant="resident" size="sm" className="w-full justify-center" icon={MessageSquareWarning}>
                  File Maintenance Ticket
                </Button>
              </Link>
              {isPg && (
                <Link to="/resident/leave">
                  <Button variant="secondary" size="sm" className="w-full justify-center" icon={CalendarDays}>
                    Apply Weekend Leave
                  </Button>
                </Link>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ResidentDashboard;
