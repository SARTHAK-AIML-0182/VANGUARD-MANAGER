import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Building,
  Layers,
  DoorClosed,
  Bed,
  UserPlus,
  Users,
  KeyRound,
  CalendarCheck,
  CalendarDays,
  Receipt,
  CreditCard,
  MessageSquareWarning,
  Wrench,
  UserCheck,
  DollarSign,
  Truck,
  BarChart3,
  QrCode,
  Settings,
  Building2,
  Menu,
  X,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function PGLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, switchRole, logout } = useAuth();
  const { data } = useData();

  const activeBusinessId = currentUser?.businessId || 'biz_pg_01';
  const business = data.businesses[activeBusinessId] || data.businesses.biz_pg_01;

  const pendingCount = data.applications.filter(
    a => (a.businessId === activeBusinessId || a.businessId === 'biz_pg_01') && a.status === 'PENDING'
  ).length;

  const pgNavItems = [
    { label: 'Dashboard', path: '/pg', icon: LayoutDashboard },
    { label: 'Business Profile', path: '/pg/profile', icon: Building2 },
    { label: 'Properties', path: '/pg/properties', icon: Building },
    { label: 'Floors', path: '/pg/floors', icon: Layers },
    { label: 'Rooms', path: '/pg/rooms', icon: DoorClosed },
    { label: 'Beds', path: '/pg/beds', icon: Bed },
    { label: 'Student Registrations', path: '/pg/registrations', icon: UserPlus, badge: pendingCount > 0 ? pendingCount : null },
    { label: 'Student Management', path: '/pg/students', icon: Users },
    { label: 'Room Allocation', path: '/pg/allocations', icon: KeyRound },
    { label: 'Attendance', path: '/pg/attendance', icon: CalendarCheck },
    { label: 'Leave Requests', path: '/pg/leaves', icon: CalendarDays },
    { label: 'Rent and Invoices', path: '/pg/invoices', icon: Receipt },
    { label: 'Payments', path: '/pg/payments', icon: CreditCard },
    { label: 'Complaints', path: '/pg/complaints', icon: MessageSquareWarning },
    { label: 'Maintenance', path: '/pg/maintenance', icon: Wrench },
    { label: 'Staff Management', path: '/pg/staff', icon: UserCheck },
    { label: 'Expenses', path: '/pg/expenses', icon: DollarSign },
    { label: 'Vendors', path: '/pg/vendors', icon: Truck },
    { label: 'Reports and Analytics', path: '/pg/reports', icon: BarChart3 },
    { label: 'Registration QR Code', path: '/pg/qr-code', icon: QrCode, highlight: true },
    { label: 'Settings', path: '/pg/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* MOBILE HEADER */}
      <div className="md:hidden bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-200"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span className="font-bold text-sm tracking-tight truncate max-w-[150px]">
              {currentUser?.businessName || business?.name || 'PG Portal'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500 text-white">
              {pendingCount} Pending
            </span>
          )}
          <Link to="/" className="text-xs text-slate-400 hover:text-white">Exit</Link>
        </div>
      </div>

      {/* DESKTOP & MOBILE SIDEBAR */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand Banner */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="overflow-hidden">
              <h2 className="text-sm font-bold text-white truncate tracking-tight">
                {currentUser?.businessName || business?.name || 'Royal Comfort PG'}
              </h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
                <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider">PG Vertical</span>
              </div>
            </div>
          </div>
        </div>

        {/* 21 Nav Modules List */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 py-1">
            21 Operational Modules
          </div>
          {pgNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                } ${item.highlight && !isActive ? 'text-blue-400 font-semibold bg-blue-950/30 border border-blue-900/40' : ''}`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : item.highlight ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span className="ml-2 px-1.5 py-0.5 text-[10px] font-extrabold rounded-full bg-blue-500 text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User & Portal Switcher Footer */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
          <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] uppercase font-bold text-slate-500">Quick Role Switch:</span>
              <span className="text-[10px] text-blue-400 font-semibold">Demo Sandbox</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => { switchRole('PG_OWNER'); navigate('/pg'); }}
                className="px-2 py-1 rounded bg-blue-600 text-white font-medium text-[10px] truncate"
              >
                PG Owner
              </button>
              <button
                type="button"
                onClick={() => { switchRole('MESS_OWNER'); navigate('/mess'); }}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-emerald-900/60 text-slate-300 font-medium text-[10px] truncate"
              >
                Mess Owner
              </button>
              <button
                type="button"
                onClick={() => { switchRole('RESIDENT_PG'); navigate('/resident'); }}
                className="px-2 py-1 rounded bg-slate-800 hover:bg-purple-900/60 text-slate-300 font-medium text-[10px] truncate"
              >
                PG Student
              </button>
              <Link
                to="/"
                className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-[10px] text-center truncate"
              >
                Exit Portal
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="hidden md:flex h-16 bg-white border-b border-slate-200/90 items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              PG Management Console
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-500 font-medium truncate max-w-sm">
              {currentUser?.businessName || business?.name}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/pg/registrations"
              className="relative p-2 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              title="Pending Student Applications"
            >
              <Bell className="w-4 h-4" />
              {pendingCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600"></span>
              )}
            </Link>

            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                {currentUser?.avatar || 'PG'}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 leading-tight">{currentUser?.name || 'PG Owner'}</p>
                <p className="text-[10px] text-slate-400 font-medium">PG Owner (Primary Admin)</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Rendered Here */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PGLayout;
