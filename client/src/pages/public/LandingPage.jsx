import React, { useState } from 'react';
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
  HelpCircle
} from 'lucide-react';
import Card, { CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';

export function LandingPage() {
  const [activePortalModal, setActivePortalModal] = useState(null);
  const [qrDemoOpen, setQrDemoOpen] = useState(false);

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

          {/* Subtitle with explicit distinction */}
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
                Explore The 3 Portals
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

          {/* Quick Metrics / Assurance Badges */}
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
              Each portal serves a dedicated stakeholder group with tailored layouts, specialized workflows, and strict role-based data isolation.
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
                  For Paying Guest accommodations, student hostels, and co-living operators. Complete physical inventory and tenancy lifecycle tracking.
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

              <div className="pt-6 mt-2">
                <Button
                  variant="pg"
                  size="md"
                  className="w-full justify-between"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => setActivePortalModal('pg')}
                >
                  Enter PG Portal View
                </Button>
                <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                  21 Complete Operational Modules
                </p>
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
                  For commercial dining messes, tiffin operators, and catering services. Structured subscription and kitchen inventory control.
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

              <div className="pt-6 mt-2">
                <Button
                  variant="mess"
                  size="md"
                  className="w-full justify-between"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => setActivePortalModal('mess')}
                >
                  Enter Mess Portal View
                </Button>
                <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                  19 Complete Operational Modules
                </p>
              </div>
            </Card>

            {/* PORTAL CARD 3: STUDENT / CUSTOMER REGISTRATION & RESIDENT PORTAL */}
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

              <div className="pt-6 mt-2">
                <Button
                  variant="resident"
                  size="md"
                  className="w-full justify-between"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => setActivePortalModal('resident')}
                >
                  Self-Registration & Resident
                </Button>
                <p className="text-[11px] text-center text-slate-400 mt-2 font-medium">
                  QR-Driven Onboarding
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* 3. HOW QR REGISTRATION WORKS (PROCESS EXPLAINER) */}
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
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
              <div className="w-10 h-10 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-base mb-4">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">QR Code Generation</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The PG or Mess owner generates their official registration QR code from their dashboard. An unguessable, 256-bit cryptographic token is created.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-base mb-4">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Scan & Resolve</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applicant scans the QR at the reception desk. The server resolves the verified business profile, identifying whether it is a PG or Mess.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
              <div className="w-10 h-10 rounded-lg bg-purple-600 text-white font-bold flex items-center justify-center text-base mb-4">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">OTP & Form Submission</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applicant completes mobile OTP verification and submits only necessary details. Application status is saved as <strong className="text-amber-700">PENDING</strong>.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 relative">
              <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-base mb-4">
                4
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Manual Owner Approval</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The owner reviews the application, allocates the bed or meal pass, and grants approval. Only then is the resident account activated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ARCHITECTURAL & OPERATIONAL DISTINCTIONS */}
      <section id="architecture" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="neutral" size="md" className="mb-3">Architectural Philosophy</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Engineered Differently From Typical Property Portals
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Why Vanguard Manager avoids marketplace clutter in favor of disciplined operational execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* The Marketplace Way (What we reject) */}
            <div className="bg-white rounded-xl border border-rose-200 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-rose-700">
                <XCircle className="w-6 h-6" />
                <h3 className="text-lg font-bold">Typical Discovery Marketplace (NOT Us)</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Public listing search where strangers browse resident counts and pricing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Aggregated property booking that takes high commissions per student</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Mess and PG features mixed together in confusing combined dashboards</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Auto-activations that create unverified accounts without owner scrutiny</span>
                </li>
              </ul>
            </div>

            {/* The Vanguard Manager SaaS Way */}
            <div className="bg-white rounded-xl border border-emerald-300 p-8 shadow-sm bg-gradient-to-b from-white to-emerald-50/20">
              <div className="flex items-center gap-3 mb-4 text-emerald-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-bold">Vanguard Manager SaaS Standard</h3>
              </div>
              <ul className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Private multi-tenancy</strong>: Each business manages only its own data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>QR onboarding</strong>: Registrations happen only after physical or direct contact</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Strict vertical isolation</strong>: PG features never appear in Mess consoles</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span><strong>Owner approval gate</strong>: Zero account access until owner review</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECURITY & PRIVACY CONTROLS */}
      <section id="security" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="neutral" size="md" className="mb-3">Security by Design</Badge>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Enterprise-Grade Security & Privacy Compliance
            </h2>
            <p className="mt-4 text-base text-slate-600">
              Built on OWASP Top 10 guidelines and strict data minimization principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card padding="md" className="border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">No Full Aadhaar Collection</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                We strictly avoid demanding or storing plaintext 12-digit Aadhaar numbers. Verification accepts institutional IDs (College/Company ID) or masked documents with privacy notices.
              </p>
            </Card>

            <Card padding="md" className="border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Server-Side Multi-Tenancy</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tenant isolation is enforced in backend database queries via foreign key constraints, not simply by hiding buttons on the frontend. IDOR attacks are completely blocked.
              </p>
            </Card>

            <Card padding="md" className="border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-800 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2">Cryptographic QR Tokens</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Registration QRs use 256-bit unguessable random tokens. No resident personal data is embedded in the QR image. Tokens can be revoked and regenerated instantly.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE QR DEMO MODAL */}
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
              <h4 className="text-base font-bold text-white mt-1">Stanza Premier PG — Block A</h4>
              <p className="text-xs text-slate-400 mt-0.5">Token: <code>tk_88f9...4b21</code> (Hashed & Rate-Limited)</p>
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

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="md" onClick={() => setQrDemoOpen(false)}>
              Got it
            </Button>
          </div>
        </div>
      </Modal>

      {/* 7. PORTAL PREVIEW MODAL */}
      <Modal
        isOpen={Boolean(activePortalModal)}
        onClose={() => setActivePortalModal(null)}
        title={
          activePortalModal === 'pg'
            ? 'PG Management Portal Overview'
            : activePortalModal === 'mess'
            ? 'Mess Management Portal Overview'
            : 'Student / Customer Portal Overview'
        }
        subtitle="Phase 1 Foundation Verification"
        maxWidth="max-w-xl"
      >
        <div className="space-y-4">
          <p className="text-sm text-slate-600">
            {activePortalModal === 'pg' &&
              'The PG Management Portal gives PG and hostel owners complete command over physical property assets, bed occupancy, automated billing, and resident safety.'}
            {activePortalModal === 'mess' &&
              'The Mess Management Portal provides commercial dining and tiffin businesses with rigorous control over subscriptions, daily menus, pantry stock, and food wastage.'}
            {activePortalModal === 'resident' &&
              'The Resident Portal provides students and dining customers with a clean, privacy-conscious mobile-responsive hub to view stay details, menus, bills, and raise requests.'}
          </p>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
            <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Development Status</h5>
            <div className="flex items-center gap-2 text-xs text-slate-700">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span><strong>Phase 1 & 2 Completed:</strong> Design system, layout, landing page, and architectural documentation.</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span><strong>Next Step:</strong> Phase 3 Portal Layouts & Navigation Sidebars (Pending your review).</span>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <Button variant="primary" size="md" onClick={() => setActivePortalModal(null)}>
              Close Preview
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default LandingPage;
