import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Building2,
  UtensilsCrossed,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  Lock,
  Smartphone,
  Users,
  FileText,
  BadgeAlert,
  Server,
  Sparkles,
  ChevronRight,
  XCircle,
  HelpCircle,
  UserCheck,
  Plus
} from 'lucide-react';
import Card, { CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function LandingPage() {
  const navigate = useNavigate();
  const { switchRole, registerPGOwner, registerMessOwner, login } = useAuth();
  const { createBusiness, data } = useData();

  // Modals state
  const [activePortalModal, setActivePortalModal] = useState(null); // 'pg', 'mess', 'resident'
  const [authMode, setAuthMode] = useState('REGISTER'); // 'REGISTER' | 'LOGIN'
  const [qrDemoOpen, setQrDemoOpen] = useState(false);

  // PG Owner Registration Form
  const [pgForm, setPgForm] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    totalBeds: '24',
    password: ''
  });

  // Mess Owner Registration Form
  const [messForm, setMessForm] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    password: ''
  });

  // Login Form
  const [loginForm, setLoginForm] = useState({
    identifier: '',
    password: ''
  });

  // Student QR Code Entry
  const [studentTokenInput, setStudentTokenInput] = useState('');

  // Handle PG Owner Registration Submit
  const handlePgRegister = (e) => {
    e.preventDefault();
    if (!pgForm.businessName || !pgForm.ownerName || !pgForm.phone) {
      alert('Please fill in all required fields');
      return;
    }
    const result = registerPGOwner(pgForm, createBusiness);
    setActivePortalModal(null);
    alert(`Congratulations! Your PG "${result.business.name}" has been created. Opening your PG Management Portal...`);
    navigate('/pg');
  };

  // Handle Mess Owner Registration Submit
  const handleMessRegister = (e) => {
    e.preventDefault();
    if (!messForm.businessName || !messForm.ownerName || !messForm.phone) {
      alert('Please fill in all required fields');
      return;
    }
    const result = registerMessOwner(messForm, createBusiness);
    setActivePortalModal(null);
    alert(`Congratulations! Your Mess "${result.business.name}" has been created. Opening your Mess Management Portal...`);
    navigate('/mess');
  };

  // Handle Login
  const handleLoginSubmit = (role, redirectPath) => (e) => {
    e.preventDefault();
    login(loginForm.identifier || 'admin@vanguard.com', loginForm.password, role);
    setActivePortalModal(null);
    navigate(redirectPath);
  };

  // Handle Student QR Start
  const handleStudentQrGo = (e) => {
    e.preventDefault();
    const token = studentTokenInput || data.businesses.biz_pg_01.activeQrToken;
    navigate(`/register?token=${token}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. HERO SECTION */}
      <section id="home" className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-white border-b border-slate-200/80">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold tracking-wide uppercase shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
            Smart Management. Simplified Operations.
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            The Purpose-Built SaaS Platform for <span className="text-blue-600">PGs</span> & <span className="text-emerald-600">Messes</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Digitise accommodation inventory, dining subscriptions, automated billing, and resident attendance with complete business separation and secure, QR-driven self-registration.
          </p>

          {/* CRITICAL PRODUCT DISTINCTION CALLOUT */}
          <div className="mt-8 max-w-3xl mx-auto bg-amber-50/70 border border-amber-200/90 rounded-xl p-4 sm:p-5 text-left flex items-start gap-3.5 shadow-sm">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 space-y-1">
              <strong className="font-semibold block text-amber-950">Important Product Distinction:</strong>
              <p className="leading-relaxed">
                Vanguard Manager is an <strong>operational business management platform</strong> for existing hostels, PGs, and commercial dining messes. We are <strong>not</strong> a PG discovery portal, booking aggregator, or accommodation marketplace. Residents and dining patrons register exclusively with their known business using a unique, business-specific QR code.
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#portals">
              <Button size="xl" variant="primary" icon={ArrowRight} iconPosition="right">
                Enter Or Register Your Portal
              </Button>
            </a>
            <Button
              size="xl"
              variant="secondary"
              icon={QrCode}
              onClick={() => setQrDemoOpen(true)}
            >
              How QR Registration Works
            </Button>
          </div>

          {/* Quick Metrics */}
          <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-3.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Verticals</span>
              <span className="text-base font-bold text-slate-900">100% Isolated Workflows</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-3.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Onboarding</span>
              <span className="text-base font-bold text-slate-900">Cryptographic QR Tokens</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-3.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Security</span>
              <span className="text-base font-bold text-slate-900">Strict Tenant Guard</span>
            </div>
            <div className="bg-slate-50 border border-slate-200/90 rounded-lg p-3.5">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Verification</span>
              <span className="text-base font-bold text-slate-900">Manual Owner Approval</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE THREE INDEPENDENT PORTAL CARDS */}
      <section id="portals" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="neutral" size="md" className="mb-3">Independent Access Points</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Three Independent Portals. One United Engine.
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Select your portal below to register your business, sign in, or explore via 1-click live demo accounts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PORTAL CARD 1: PG MANAGEMENT */}
            <Card
              borderAccent="pg"
              hoverEffect
              className="flex flex-col justify-between border-slate-200/90 shadow-sm relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <Badge variant="pg" size="md">PG Vertical</Badge>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">PG Management Portal</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  For Paying Guest accommodations, student hostels, and co-living operators. Complete physical inventory, room allocations, and curfew attendance.
                </p>

                <div className="space-y-2.5 pb-6 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Key Operational Modules:</h4>
                  {[
                    'Property, Floor, Room & Bed hierarchy',
                    'Room allocation & vacant bed tracking',
                    'Nightly curfew & resident attendance',
                    'Monthly automated rent invoices & receipts',
                    'Leave request & parental consent status',
                    'Maintenance ticketing & vendor expenses',
                    'Dynamic Business Registration QR Code',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-2 space-y-2">
                <Button
                  variant="pg"
                  size="md"
                  className="w-full justify-between"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => {
                    setAuthMode('REGISTER');
                    setActivePortalModal('pg');
                  }}
                >
                  Register or Enter PG Portal
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    switchRole('PG_OWNER');
                    navigate('/pg');
                  }}
                  className="w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-800 py-1"
                >
                  ⚡ Or Open Demo as Rajesh Kumar (PG Owner)
                </button>
              </div>
            </Card>

            {/* PORTAL CARD 2: MESS MANAGEMENT */}
            <Card
              borderAccent="mess"
              hoverEffect
              className="flex flex-col justify-between border-slate-200/90 shadow-sm relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <UtensilsCrossed className="w-6 h-6" />
                  </div>
                  <Badge variant="mess" size="md">Mess Vertical</Badge>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">Mess Management Portal</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  For commercial dining messes, tiffin operators, and catering services. Structured subscription, meal punch attendance, and kitchen inventory.
                </p>

                <div className="space-y-2.5 pb-6 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Key Operational Modules:</h4>
                  {[
                    'Meal plan creation (Monthly, 15-day, Custom)',
                    'Customer dining pass subscriptions',
                    'Dynamic weekly breakfast, lunch & dinner menu',
                    'Meal attendance & duplicate punch blocker',
                    'Pantry grocery inventory & stock alerts',
                    'Food wastage tracker & cost analytics',
                    'Unique Mess Registration QR Code',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-2 space-y-2">
                <Button
                  variant="mess"
                  size="md"
                  className="w-full justify-between"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => {
                    setAuthMode('REGISTER');
                    setActivePortalModal('mess');
                  }}
                >
                  Register or Enter Mess Portal
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    switchRole('MESS_OWNER');
                    navigate('/mess');
                  }}
                  className="w-full text-center text-xs font-semibold text-emerald-600 hover:text-emerald-800 py-1"
                >
                  ⚡ Or Open Demo as Suresh Patel (Mess Owner)
                </button>
              </div>
            </Card>

            {/* PORTAL CARD 3: STUDENT / CUSTOMER PORTAL */}
            <Card
              borderAccent="resident"
              hoverEffect
              className="flex flex-col justify-between border-slate-200/90 shadow-sm relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <Badge variant="resident" size="md">Resident Portal</Badge>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">Student & Customer Portal</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  For existing residents and dining subscribers. Frictionless QR-based registration, application tracking, and personal records.
                </p>

                <div className="space-y-2.5 pb-6 border-b border-slate-100">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Key Self-Service Features:</h4>
                  {[
                    'Scan business QR code to trigger registration',
                    'Mobile OTP authentication & verified identity',
                    'Tailored multi-step form (PG or Mess specific)',
                    'Live application status (Pending -> Approved)',
                    'Personal room / meal plan dashboard',
                    'Digital rent & meal payment histories',
                    'Raise maintenance tickets & leave requests',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-2 space-y-2">
                <Button
                  variant="resident"
                  size="md"
                  className="w-full justify-between"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => {
                    setActivePortalModal('resident');
                  }}
                >
                  Student / Customer Access
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    switchRole('RESIDENT_PG');
                    navigate('/resident');
                  }}
                  className="w-full text-center text-xs font-semibold text-purple-600 hover:text-purple-800 py-1"
                >
                  ⚡ Or Open Demo as Aarav Sharma (Resident)
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. HOW QR REGISTRATION WORKS */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="neutral" size="md" className="mb-3">Cryptographic Onboarding Flow</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Zero-Discovery, QR-Driven Self-Registration
            </h2>
            <p className="mt-4 text-base text-slate-600">
              How residents and dining customers safely onboard without marketplace listings or public data exposure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-base mb-4">1</div>
              <h4 className="font-bold text-slate-900 text-base mb-2">QR Code Generation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The PG or Mess owner generates their official registration QR code from their dashboard. An unguessable, 256-bit cryptographic token is created.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-base mb-4">2</div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Scan & Resolve</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applicant scans the QR at the reception desk. The server resolves the verified business profile, identifying whether it is a PG or Mess.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
              <div className="w-10 h-10 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-base mb-4">3</div>
              <h4 className="font-bold text-slate-900 text-base mb-2">OTP & Form Submission</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applicant completes mobile OTP verification and submits only necessary details. Application status is saved as <strong className="text-amber-700">PENDING</strong>.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-base mb-4">4</div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Manual Owner Approval</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The owner reviews the application, allocates the bed or meal pass, and grants approval. Only then is the resident account activated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PG OWNER REGISTRATION & LOGIN MODAL */}
      <Modal
        isOpen={activePortalModal === 'pg'}
        onClose={() => setActivePortalModal(null)}
        title="PG Management Portal Gateway"
        subtitle="Register your PG business or sign in to your dashboard"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthMode('REGISTER')}
              className={`flex-1 py-1.5 rounded-md transition-all ${
                authMode === 'REGISTER' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Register New PG
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('LOGIN')}
              className={`flex-1 py-1.5 rounded-md transition-all ${
                authMode === 'LOGIN' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Sign In
            </button>
          </div>

          {authMode === 'REGISTER' ? (
            <form onSubmit={handlePgRegister} className="space-y-3 text-xs">
              <Input
                label="PG Business / Hostel Name"
                placeholder="e.g. Sunrise Luxury PG & Hostel"
                value={pgForm.businessName}
                onChange={(e) => setPgForm({ ...pgForm, businessName: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Owner Full Name"
                  placeholder="e.g. Ramesh Kumar"
                  value={pgForm.ownerName}
                  onChange={(e) => setPgForm({ ...pgForm, ownerName: e.target.value })}
                  required
                />
                <Input
                  label="Contact Phone"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={pgForm.phone}
                  onChange={(e) => setPgForm({ ...pgForm, phone: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="owner@sunrisepg.com"
                  value={pgForm.email}
                  onChange={(e) => setPgForm({ ...pgForm, email: e.target.value })}
                  required
                />
                <Input
                  label="City"
                  placeholder="e.g. Greater Noida"
                  value={pgForm.city}
                  onChange={(e) => setPgForm({ ...pgForm, city: e.target.value })}
                  required
                />
              </div>
              <Input
                label="Street / Campus Address"
                placeholder="e.g. Sector 62, Near Metro Station"
                value={pgForm.address}
                onChange={(e) => setPgForm({ ...pgForm, address: e.target.value })}
                required
              />
              <Input
                label="Initial Planned Capacity (Beds)"
                type="number"
                value={pgForm.totalBeds}
                onChange={(e) => setPgForm({ ...pgForm, totalBeds: e.target.value })}
                required
              />

              <div className="pt-2">
                <Button variant="pg" size="md" type="submit" className="w-full justify-center">
                  Create PG Business & Open Console
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit('PG_OWNER', '/pg')} className="space-y-3 text-xs">
              <Input
                label="Email or Mobile Phone"
                placeholder="rajesh@vanguardpg.com"
                value={loginForm.identifier}
                onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
              <div className="pt-2">
                <Button variant="pg" size="md" type="submit" className="w-full justify-center">
                  Sign In to PG Dashboard
                </Button>
              </div>
            </form>
          )}

          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                switchRole('PG_OWNER');
                setActivePortalModal(null);
                navigate('/pg');
              }}
              className="w-full p-2.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold hover:bg-blue-100 transition-colors text-center"
            >
              ⚡ Instant 1-Click Demo: Enter as Rajesh Kumar (48 Beds)
            </button>
          </div>
        </div>
      </Modal>

      {/* 5. MESS OWNER REGISTRATION & LOGIN MODAL */}
      <Modal
        isOpen={activePortalModal === 'mess'}
        onClose={() => setActivePortalModal(null)}
        title="Mess Management Portal Gateway"
        subtitle="Register your commercial mess or sign in to your dashboard"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex rounded-lg bg-slate-100 p-1 text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthMode('REGISTER')}
              className={`flex-1 py-1.5 rounded-md transition-all ${
                authMode === 'REGISTER' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Register New Mess
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('LOGIN')}
              className={`flex-1 py-1.5 rounded-md transition-all ${
                authMode === 'LOGIN' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Sign In
            </button>
          </div>

          {authMode === 'REGISTER' ? (
            <form onSubmit={handleMessRegister} className="space-y-3 text-xs">
              <Input
                label="Mess / Dining Business Name"
                placeholder="e.g. Shanti Food Services & Tiffin"
                value={messForm.businessName}
                onChange={(e) => setMessForm({ ...messForm, businessName: e.target.value })}
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Owner / Caterer Name"
                  placeholder="e.g. Suresh Patel"
                  value={messForm.ownerName}
                  onChange={(e) => setMessForm({ ...messForm, ownerName: e.target.value })}
                  required
                />
                <Input
                  label="Contact Phone"
                  type="tel"
                  placeholder="e.g. 9876588990"
                  value={messForm.phone}
                  onChange={(e) => setMessForm({ ...messForm, phone: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="info@shantifood.com"
                  value={messForm.email}
                  onChange={(e) => setMessForm({ ...messForm, email: e.target.value })}
                  required
                />
                <Input
                  label="City"
                  placeholder="e.g. Greater Noida"
                  value={messForm.city}
                  onChange={(e) => setMessForm({ ...messForm, city: e.target.value })}
                  required
                />
              </div>
              <Input
                label="Location / Campus Address"
                placeholder="e.g. Shop 12, Student Center"
                value={messForm.address}
                onChange={(e) => setMessForm({ ...messForm, address: e.target.value })}
                required
              />

              <div className="pt-2">
                <Button variant="mess" size="md" type="submit" className="w-full justify-center">
                  Create Mess Business & Open Console
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleLoginSubmit('MESS_OWNER', '/mess')} className="space-y-3 text-xs">
              <Input
                label="Email or Mobile Phone"
                placeholder="suresh@annapurnamess.com"
                value={loginForm.identifier}
                onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                required
              />
              <div className="pt-2">
                <Button variant="mess" size="md" type="submit" className="w-full justify-center">
                  Sign In to Mess Dashboard
                </Button>
              </div>
            </form>
          )}

          <div className="pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => {
                switchRole('MESS_OWNER');
                setActivePortalModal(null);
                navigate('/mess');
              }}
              className="w-full p-2.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition-colors text-center"
            >
              ⚡ Instant 1-Click Demo: Enter as Suresh Patel (135 Subscribers)
            </button>
          </div>
        </div>
      </Modal>

      {/* 6. STUDENT / CUSTOMER ACCESS MODAL */}
      <Modal
        isOpen={activePortalModal === 'resident'}
        onClose={() => setActivePortalModal(null)}
        title="Student & Customer Resident Gateway"
        subtitle="Self-register with your PG/Mess or log in to your personal dashboard"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          {/* Option A: Scan / Enter QR Token */}
          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-3">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-purple-700" />
              <span className="font-bold text-slate-900 text-sm">New Resident / Subscriber Registration</span>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              If your PG or Mess gave you a registration QR code or code token, enter it below to start onboarding:
            </p>
            <form onSubmit={handleStudentQrGo} className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. tk_pg_rc_8923a4f89d021c7e"
                value={studentTokenInput}
                onChange={(e) => setStudentTokenInput(e.target.value)}
                className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
              <Button variant="resident" size="sm" type="submit">
                Start Registration
              </Button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-purple-700 font-semibold pt-1">
              <button
                type="button"
                onClick={() => navigate(`/register?token=${data.businesses.biz_pg_01.activeQrToken}`)}
                className="underline hover:text-purple-900"
              >
                Sample PG Form (Royal Comfort)
              </button>
              <button
                type="button"
                onClick={() => navigate(`/register?token=${data.businesses.biz_mess_01.activeQrToken}`)}
                className="underline hover:text-purple-900"
              >
                Sample Mess Form (Annapurna)
              </button>
            </div>
          </div>

          {/* Option B: 1-Click Resident Access */}
          <div className="space-y-2 pt-2">
            <span className="font-bold text-slate-700 block">Existing Resident Sign In:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  switchRole('RESIDENT_PG');
                  setActivePortalModal(null);
                  navigate('/resident');
                }}
                className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-left font-semibold"
              >
                <span className="block text-slate-900 text-xs">Aarav Sharma</span>
                <span className="text-[10px] text-blue-600 font-normal">PG Resident (Room 101-A)</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  switchRole('CUSTOMER_MESS');
                  setActivePortalModal(null);
                  navigate('/resident');
                }}
                className="p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-left font-semibold"
              >
                <span className="block text-slate-900 text-xs">Priya Iyer</span>
                <span className="text-[10px] text-emerald-600 font-normal">Mess Subscriber (Full Board)</span>
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* 7. INTERACTIVE QR DEMO EXPLAINER MODAL */}
      <Modal
        isOpen={qrDemoOpen}
        onClose={() => setQrDemoOpen(false)}
        title="How QR-Based Registration Works"
        subtitle="Security-first resident & customer onboarding workflow"
        maxWidth="max-w-xl"
      >
        <div className="space-y-4">
          <div className="bg-slate-900 rounded-xl p-5 text-white flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-lg p-1.5 shrink-0 flex items-center justify-center">
              <QrCode className="w-12 h-12 text-slate-900" />
            </div>
            <div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 uppercase tracking-wider border border-blue-400/30">
                Sample Business QR
              </span>
              <h4 className="text-base font-bold text-white mt-1">Royal Comfort PG — Block A</h4>
              <p className="text-xs text-slate-400 mt-0.5">Token: <code>tk_pg_rc_8923a4f89d021c7e</code></p>
            </div>
          </div>

          <div className="space-y-3 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
            <p className="font-semibold text-slate-900">Security Safeguards Active:</p>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Token validated on server before displaying the business registration form</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Applicant mobile number must pass OTP verification before submission</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Form binds strictly to the verified business ID; client-side tampering is blocked</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Account is locked in <strong>PENDING</strong> until owner reviews documents</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Link to={`/register?token=${data.businesses.biz_pg_01.activeQrToken}`}>
              <Button variant="primary" size="md">
                Test Live QR Registration
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LandingPage;
