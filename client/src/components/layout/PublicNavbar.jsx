import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Menu,
  X,
  ArrowRight,
  Building2,
  UtensilsCrossed,
  RotateCcw,
  Sparkles,
  UserCheck
} from 'lucide-react';
import Button from '../common/Button';
import Modal from '../common/Modal';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoLoginModal, setDemoLoginModal] = useState(false);
  const { switchRole } = useAuth();
  const { mode, loadDemoData, startCleanLiveMode, resetDemoData } = useData();
  const navigate = useNavigate();

  const handleDemoLogin = (roleKey, redirectPath) => {
    switchRole(roleKey);
    setDemoLoginModal(false);
    navigate(redirectPath);
  };

  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'PG Portal', href: '/pg' },
    { label: 'Mess Portal', href: '/mess' },
    { label: 'Resident Portal', href: '/resident' },
    { label: 'Student QR Registration', href: '/register' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        {/* TOP DEMO / LIVE MODE SWITCHER ANNOUNCEMENT BAR */}
        <div className="bg-slate-900 text-white text-xs py-2 px-4 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className={`w-2.5 h-2.5 rounded-full ${mode === 'LIVE' ? 'bg-sky-400' : 'bg-emerald-400'} animate-pulse`}></span>
            <span className="font-semibold text-slate-100">
              {mode === 'LIVE'
                ? '🟢 LIVE MODE: Clean Slate (Zero Pre-saved Data — Everything configured live by owners & students)'
                : '⚡ DEMO SHOWCASE: Realistic Pre-filled Data (Rooms, Menus, Invoices, Subscriptions)'}
            </span>
          </div>
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            {mode === 'LIVE' ? (
              <button
                type="button"
                onClick={() => {
                  loadDemoData();
                  alert('Demo Showcase Mode enabled with full pre-seeded data for presentation!');
                }}
                className="flex items-center gap-1.5 text-[11px] font-bold text-amber-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                title="Populate demo data"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Load Demo Showcase Data
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Wipe pre-filled demo data and switch to Clean Live Mode with zero pre-saved data?')) {
                    startCleanLiveMode();
                    alert('Switched to Clean Live Mode! All mock data removed. You can now register your real PG/Mess.');
                  }
                }}
                className="flex items-center gap-1.5 text-[11px] font-bold text-sky-300 hover:text-white px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
                title="Wipe to clean state"
              >
                <RotateCcw className="w-3.5 h-3.5 text-sky-400" />
                Start Clean Live Mode (Zero Data)
              </button>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo & Name */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-11 h-11 rounded-xl bg-slate-900 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="w-8 h-8" fill="none">
                  <path d="M12 11L20 27L28 11" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11L20 20L24 11" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="20" cy="30" r="1.75" fill="#38BDF8"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-slate-900">Vanguard Manager</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 tracking-wider uppercase border border-slate-200">SaaS</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 tracking-wide">Smart Management. Simplified Operations.</p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Action CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                icon={UserCheck}
                onClick={() => setDemoLoginModal(true)}
              >
                1-Click Demo Logins
              </Button>
              <a href="#portals">
                <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                  Open Portals
                </Button>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-slate-600 hover:text-slate-900 p-2 rounded-lg"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <nav className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <Button
                variant="secondary"
                size="md"
                className="w-full justify-center"
                icon={UserCheck}
                onClick={() => {
                  setMobileMenuOpen(false);
                  setDemoLoginModal(true);
                }}
              >
                1-Click Demo Logins
              </Button>
              <a href="#portals" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" className="w-full justify-center" icon={ArrowRight} iconPosition="right">
                  Open Portals
                </Button>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 1-CLICK DEMO LOGIN MODAL */}
      <Modal
        isOpen={demoLoginModal}
        onClose={() => setDemoLoginModal(false)}
        title="Select Demo Persona"
        subtitle="Experience Vanguard Manager instantly with pre-seeded commercial data"
        maxWidth="max-w-lg"
      >
        <div className="space-y-3 text-xs">
          <div
            onClick={() => handleDemoLogin('PG_OWNER', '/pg')}
            className="p-4 rounded-xl border border-blue-200 bg-blue-50/50 hover:bg-blue-50 cursor-pointer transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 block">PG Owner Console</span>
                <span className="text-slate-500">Rajesh Kumar • Royal Comfort PG (48 Beds)</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </div>

          <div
            onClick={() => handleDemoLogin('MESS_OWNER', '/mess')}
            className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 cursor-pointer transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 block">Mess Owner Console</span>
                <span className="text-slate-500">Suresh Patel • Annapurna Gourmet (135 Subscribers)</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-600" />
          </div>

          <div
            onClick={() => handleDemoLogin('RESIDENT_PG', '/resident')}
            className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 hover:bg-purple-50 cursor-pointer transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 block">PG Resident Student</span>
                <span className="text-slate-500">Aarav Sharma • Room 101-A (Rent, Leave, Complaints)</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-600" />
          </div>

          <div
            onClick={() => handleDemoLogin('CUSTOMER_MESS', '/resident')}
            className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 cursor-pointer transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-white font-bold flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm text-slate-900 block">Mess Customer Subscriber</span>
                <span className="text-slate-500">Priya Iyer • Standard Full Board (Meal Attendance)</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-600" />
          </div>
        </div>
      </Modal>
    </>
  );
}

export default PublicNavbar;