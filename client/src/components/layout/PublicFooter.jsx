import React from 'react';
import { ShieldCheck, Lock, Building2, UtensilsCrossed, QrCode } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="w-7 h-7" fill="none">
                  <path d="M12 11L20 27L28 11" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11L20 20L24 11" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="20" cy="30" r="1.75" fill="#38BDF8"/>
                </svg>
              </div>
              <div>
                <span className="text-xl font-bold text-white tracking-tight">Vanguard Manager</span>
                <p className="text-xs text-slate-400">Smart Management. Simplified Operations.</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              A high-precision, multi-tenant SaaS management system designed strictly for existing PG and Mess businesses. Eliminates paperwork and streamlines resident onboarding via cryptographically isolated QR codes.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strictly Operational SaaS — Not a Public Booking Marketplace</span>
            </div>
          </div>

          {/* Independent Portals */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Independent Portals</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#portals" className="hover:text-blue-400 flex items-center gap-2 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  PG Management Portal
                </a>
              </li>
              <li>
                <a href="#portals" className="hover:text-emerald-400 flex items-center gap-2 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Mess Management Portal
                </a>
              </li>
              <li>
                <a href="#portals" className="hover:text-purple-400 flex items-center gap-2 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                  Resident & Customer Portal
                </a>
              </li>
              <li>
                <a href="#portals" className="hover:text-slate-300 flex items-center gap-2 transition-colors">
                  <QrCode className="w-3.5 h-3.5 text-slate-400" />
                  QR Self-Registration
                </a>
              </li>
            </ul>
          </div>

          {/* Architecture & Security */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Security Standards</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                Multi-Tenant Isolation
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                Cryptographic Unguessable QR Tokens
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                Zero Plaintext Identity Proofs
              </li>
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-slate-500" />
                Manual Owner Approval Gate
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Vanguard Manager. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Designed for privacy, reliability, and rigorous operational control.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default PublicFooter;
