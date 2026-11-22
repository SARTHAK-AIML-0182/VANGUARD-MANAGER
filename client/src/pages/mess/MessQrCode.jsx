import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  RefreshCw,
  Printer,
  Copy,
  Check,
  ExternalLink,
  UtensilsCrossed,
  Lock,
  Smartphone
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export function MessQrCode() {
  const { data, regenerateQr } = useData();
  const { currentUser } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  const currentBizId = currentUser?.businessId || Object.keys(data.businesses).find(k => data.businesses[k].type === 'MESS') || 'biz_mess_01';
  const business = data.businesses[currentBizId] || {
    id: currentBizId,
    name: currentUser?.businessName || 'My Mess & Catering',
    activeQrToken: 'tk_mess_default',
    address: 'Campus Dining Plaza',
    phone: '+91 98765 00000',
    qrCreatedAt: new Date().toISOString()
  };
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
        regenerateQr(business.id);
        setIsRotating(false);
      }, 400);
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
          <div className="bg-white rounded-2xl border-2 border-emerald-600/40 p-8 shadow-xl text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
              <UtensilsCrossed className="w-4 h-4" />
              Verified Mess Subscription Portal
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {business.name}
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mt-1">{business.address}</p>

            {/* REAL SCANNABLE QR CODE CONTAINER */}
            <div className="my-8 p-6 bg-slate-950 rounded-3xl shadow-2xl border border-slate-800 text-white flex flex-col items-center">
              {business.qrIsActive ? (
                <>
                  <div className="bg-white p-4 rounded-2xl shadow-inner flex items-center justify-center">
                    <QRCodeSVG
                      value={registrationUrl}
                      size={220}
                      level="H"
                      includeMargin={false}
                    />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                    <Smartphone className="w-4 h-4" />
                    <span>Live & Scannable with any Phone Camera</span>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-300 mt-2 tracking-wider">
                    Token: {business.activeQrToken}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Issued: {new Date(business.qrCreatedAt).toLocaleDateString()}
                  </span>
                </>
              ) : (
                <div className="py-12 text-center text-rose-400">
                  <p className="font-bold text-sm">QR Code Revoked</p>
                </div>
              )}
            </div>

            <div className="text-xs text-slate-600 max-w-sm space-y-1">
              <p className="font-bold text-slate-900">Scan to subscribe to dining plans:</p>
              <p>1. Scan QR with your phone camera</p>
              <p>2. Verify mobile via instant OTP (Mock: 123456)</p>
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
