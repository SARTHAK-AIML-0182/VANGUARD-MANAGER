import React, { useState } from 'react';
import {
  QrCode,
  RefreshCw,
  Download,
  Printer,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  Building2,
  Lock
} from 'lucide-react';
import Card, { CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function PGQrCode() {
  const { data, regenerateQr, revokeQr } = useData();
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const business = data.businesses.biz_pg_01;
  const registrationUrl = `${window.location.origin}/register?token=${business.activeQrToken}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(registrationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    if (window.confirm('Are you sure you want to revoke and regenerate this QR Code? Any printed posters with the old QR will immediately stop accepting new registrations.')) {
      setIsRotating(true);
      setTimeout(() => {
        regenerateQr('biz_pg_01');
        setIsRotating(false);
      }, 500);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Business Registration QR Code</h1>
            <Badge variant="pg" size="md">PG Vertical</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Display this QR code at your reception desk or notice board. Prospective residents scan it to trigger the PG onboarding workflow.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Printer}
            onClick={() => window.print()}
          >
            Print Display Standee
          </Button>
          <Button
            variant="danger"
            size="sm"
            icon={RefreshCw}
            isLoading={isRotating}
            onClick={handleRegenerate}
          >
            Revoke & Regenerate QR
          </Button>
        </div>
      </div>

      {/* Main Display Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: The Physical QR Standee Card */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border-2 border-blue-600/30 p-8 shadow-lg text-center relative overflow-hidden flex flex-col items-center">
            {/* Top Standee Header */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
              <Building2 className="w-4 h-4" />
              Verified PG Resident Registration
            </div>

            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {business.name}
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mt-1">
              {business.address}
            </p>

            {/* QR Code Container */}
            <div className="my-8 p-6 bg-slate-950 rounded-2xl shadow-inner border border-slate-800 text-white flex flex-col items-center">
              {business.qrIsActive ? (
                <>
                  <div className="w-56 h-56 bg-white rounded-xl p-3 shadow-md flex items-center justify-center">
                    {/* SVG Rendered High-Precision QR Placeholder */}
                    <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900 fill-current">
                      <rect x="0" y="0" width="30" height="30" fill="currentColor"/>
                      <rect x="5" y="5" width="20" height="20" fill="white"/>
                      <rect x="10" y="10" width="10" height="10" fill="currentColor"/>
                      
                      <rect x="70" y="0" width="30" height="30" fill="currentColor"/>
                      <rect x="75" y="5" width="20" height="20" fill="white"/>
                      <rect x="80" y="10" width="10" height="10" fill="currentColor"/>
                      
                      <rect x="0" y="70" width="30" height="30" fill="currentColor"/>
                      <rect x="5" y="75" width="20" height="20" fill="white"/>
                      <rect x="10" y="80" width="10" height="10" fill="currentColor"/>

                      {/* Pattern dots */}
                      <rect x="35" y="10" width="8" height="8" fill="currentColor"/>
                      <rect x="50" y="15" width="12" height="6" fill="currentColor"/>
                      <rect x="40" y="35" width="20" height="20" fill="currentColor"/>
                      <circle cx="50" cy="45" r="4" fill="white"/>
                      <rect x="15" y="45" width="10" height="10" fill="currentColor"/>
                      <rect x="75" y="45" width="15" height="10" fill="currentColor"/>
                      <rect x="35" y="75" width="8" height="15" fill="currentColor"/>
                      <rect x="55" y="80" width="15" height="8" fill="currentColor"/>
                      <rect x="80" y="75" width="12" height="12" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-blue-400 mt-4 tracking-wider uppercase">
                    Active Token: {business.activeQrToken}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Generated on {new Date(business.qrCreatedAt).toLocaleDateString()}
                  </span>
                </>
              ) : (
                <div className="py-12 text-center text-rose-400">
                  <AlertTriangle className="w-12 h-12 mx-auto mb-2 text-rose-500" />
                  <p className="font-bold text-sm">QR Code Revoked</p>
                  <p className="text-xs text-slate-400 mt-1">Click "Revoke & Regenerate" above to issue a new valid code.</p>
                </div>
              )}
            </div>

            {/* Instruction Footer on Card */}
            <div className="text-xs text-slate-600 max-w-sm space-y-1">
              <p className="font-bold text-slate-900">How to register as a resident:</p>
              <p>1. Open your phone camera or QR scanner app</p>
              <p>2. Verify your mobile number using instant OTP</p>
              <p>3. Submit required personal & accommodation details</p>
              <p className="text-[11px] text-blue-600 font-semibold pt-1">
                Account activated upon management review.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Security Controls & Share Link */}
        <div className="space-y-6">
          <Card padding="md">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Direct Registration Link</h3>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              You can also share this link directly via WhatsApp or SMS to students arriving for admission:
            </p>

            <div className="p-2.5 rounded-lg bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700 break-all select-all">
              {registrationUrl}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <Button
                variant={copied ? 'primary' : 'secondary'}
                size="sm"
                className="w-full justify-center"
                icon={copied ? Check : Copy}
                onClick={handleCopy}
              >
                {copied ? 'Copied Link' : 'Copy Registration Link'}
              </Button>
              <a href={`/register?token=${business.activeQrToken}`} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm" icon={ExternalLink}>
                  Test
                </Button>
              </a>
            </div>
          </Card>

          {/* Security Safeguards Card */}
          <Card padding="md" className="border-blue-200 bg-blue-50/40">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-blue-700" />
              <h3 className="font-bold text-slate-900 text-sm">QR Security Guarantees</h3>
            </div>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>No Resident Data Stored in QR:</strong> Contains only an unguessable 256-bit cryptographic token.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Instant Revocation:</strong> Regenerating the code immediately cancels old tokens to stop unauthorized sharing.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 font-bold">•</span>
                <span><strong>Owner Approval Gate:</strong> Registrations never auto-activate without manual owner verification.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PGQrCode;
