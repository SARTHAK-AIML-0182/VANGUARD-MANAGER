import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Menu, X, ArrowRight, Building2, UtensilsCrossed, QrCode } from 'lucide-react';
import Button from '../common/Button';

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Portals', href: '#portals' },
    { label: 'Features', href: '#features' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Security & Privacy', href: '#security' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
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
            <a href="#portals">
              <Button variant="secondary" size="sm">
                View Portals
              </Button>
            </a>
            <a href="#portals">
              <Button variant="primary" size="sm" icon={ArrowRight} iconPosition="right">
                Get Started
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
            <a href="#portals" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" size="md" className="w-full justify-center">
                Select Portal
              </Button>
            </a>
            <a href="#portals" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full justify-center" icon={ArrowRight} iconPosition="right">
                Get Started
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default PublicNavbar;
