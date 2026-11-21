import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Menu,
  X,
  ArrowRight,
  Building2,
  UtensilsCrossed,
  QrCode,
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
  const { resetDemoData } = useData();
  const navigate = useNavigate();

  const handleDemoLogin = (roleKey, redirectPath) => {
    switchRole(roleKey);
    setDemoLoginModal(false);
    navigate(redirectPath);
  };

  const navLinks = [
    { label: 'Home', href: '/#home' },
    { label: 'Portals', href: '/#portals' },
    { label: 'Features', href: '/#features' },
    { label: 'Architecture', href: '/#architecture' },
    { label: 'Security & Privacy', href: '/#security' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
        {/* TOP DEMO ANNOUNCEMENT BAR */}
        <div className="bg-slate-900 text-white text-xs py-1.5 px-4 text-center flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">
              Commercial SaaS Demo Mode: 4 Pre-seeded Personas Ready for Live Presentation
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (window.confirm('Reset all demo state (rooms, registrations, payments, menus) to initial pristine data?')) {
                resetDemoData();
                alert('Demo database reset successfully!');
              }
            }}
            className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700"
            title="Reset sample database"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Data
          </button>
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
                <a
                  key={link.label}
                  href={link.href}
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
                >
                  {link.label}
                </a>
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
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  {link.label}
                </a>
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
