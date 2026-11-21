import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Home,
  Receipt,
  CalendarCheck,
  CalendarDays,
  MessageSquareWarning,
  User,
  QrCode,
  LogOut,
  Building2,
  UtensilsCrossed,
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function ResidentLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, switchRole } = useAuth();

  const isPgResident = currentUser?.role === 'PG_STUDENT';

  const residentNavItems = [
    { label: 'My Dashboard', path: '/resident', icon: LayoutDashboard },
    {
      label: isPgResident ? 'My Room & Stay' : 'My Meal Subscription',
      path: '/resident/stay',
      icon: isPgResident ? Home : UtensilsCrossed
    },
    { label: 'Invoices & Payments', path: '/resident/payments', icon: Receipt },
    { label: 'Attendance History', path: '/resident/attendance', icon: CalendarCheck },
    ...(isPgResident ? [{ label: 'Apply Leave', path: '/resident/leave', icon: CalendarDays }] : []),
    { label: 'File Complaint', path: '/resident/complaints', icon: MessageSquareWarning },
    { label: 'My Profile & Proofs', path: '/resident/profile', icon: User }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* TOP HEADER */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link to="/resident" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-bold text-white shadow-sm">
                  <User className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm tracking-tight text-white block">Resident Hub</span>
                  <span className="text-[10px] text-purple-300 font-medium">
                    {currentUser?.businessName || 'Vanguard Linked Resident'}
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {residentNavItems.map(item => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Switcher Pill & Exit */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 bg-slate-800 px-2.5 py-1 rounded-full border border-slate-700 text-xs">
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                <span className="text-slate-300 text-[11px] font-medium">{currentUser?.name || 'Aarav Sharma'}</span>
              </div>
              <Link
                to="/"
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-700"
              >
                Exit
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 rounded-lg bg-slate-800 text-slate-200"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 px-4 pt-2 pb-4 space-y-1 border-t border-slate-800">
            {residentNavItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive ? 'bg-purple-600 text-white' : 'text-slate-300 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}

export default ResidentLayout;
