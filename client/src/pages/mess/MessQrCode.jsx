import React, { useState } from 'react';
import {
  QrCode,
  RefreshCw,
  Printer,
  Copy,
  Check,
  ExternalLink,
  UtensilsCrossed,
  Lock,
  AlertTriangle
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function MessQrCode() {
  const { data, regenerateQr } = useData();
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const business = data.businesses.biz_mess_01;
  const registrationUrl = `${window.location.origin}/register?token=${business.activeQrToken}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(registrationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    if (window.confirm('Are you sure you want to revoke and regenerate this Mess QR Code? Any printed flyers will stop accepting new subscriber registrations.')) {
      setIsRotating(true);
      setTimeout(() => {
        regenerateQr('biz_mess_01');
        setIsRotating(false);
      }, 500);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Mess Registration QR Code</h1>
            <Badge variant="mess" size="md">Dining Onboarding</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Display this QR code in your dining hall or reception counter. Students scan to choose meal plans and register.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={Printer} onClick={() => window.print()}>
            Print Table Standee
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-2xl border-2 border-emerald-600/30 p-8 shadow-lg text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
              <UtensilsCrossed className="w-4 h-4" />
              Verified Mess Subscription Portal
            </div>

            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {business.name}
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mt-1">{business.address}</p>

            <div className="my-8 p-6 bg-slate-950 rounded-2xl shadow-inner border border-slate-800 text-white flex flex-col items-center">
              {business.qrIsActive ? (
                <>
                  <div className="w-56 h-56 bg-white rounded-xl p-3 shadow-md flex items-center justify-center">
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

                      <rect x="40" y="10" width="15" height="10" fill="currentColor"/>
                      <circle cx="50" cy="50" r="10" fill="currentColor"/>
                      <circle cx="50" cy="50" r="4" fill="white"/>
                      <rect x="15" y="40" width="10" height="15" fill="currentColor"/>
                      <rect x="75" y="40" width="10" height="15" fill="currentColor"/>
                      <rect x="40" y="75" width="15" height="10" fill="currentColor"/>
                    </svg>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-400 mt-4 tracking-wider uppercase">
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
                </div>
              )}
            </div>

            <div className="text-xs text-slate-600 max-w-sm space-y-1">
              <p className="font-bold text-slate-900">Scan to subscribe to dining plans:</p>
              <p>1. Scan QR with your phone</p>
              <p>2. Verify mobile via instant OTP</p>
              <p>3. Select meal plan & dietary preferences</p>
              <p className="text-[11px] text-emerald-700 font-semibold pt-1">
                Pass activates instantly upon manager approval.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card padding="md">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Direct Mess Registration Link</h3>
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
                {copied ? 'Copied Link' : 'Copy Link'}
              </Button>
              <a href={`/register?token=${business.activeQrToken}`} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm" icon={ExternalLink}>
                  Test
                </Button>
              </a>
            </div>
          </Card>

          <Card padding="md" className="border-emerald-200 bg-emerald-50/40">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-4 h-4 text-emerald-700" />
              <h3 className="font-bold text-slate-900 text-sm">Mess QR Security</h3>
            </div>
            <ul className="text-xs text-slate-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Cryptographically generated 256-bit token hash.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Separate from meal punch attendance QR systems.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>No customer PII stored inside QR data.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default MessQrCode;
