import React from 'react';
import { User, Phone, Mail, MapPin, GraduationCap, ShieldCheck, FileText } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function ResidentProfile() {
  const { currentUser } = useAuth();
  const { data } = useData();

  const resident = data.pgResidents[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Resident Profile & Verification Proofs</h1>
            <Badge variant="resident" size="md">Verified Record</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Your personal verified profile and emergency details registered with {currentUser?.businessName}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="md">
          <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
            <div className="w-14 h-14 rounded-full bg-purple-100 text-purple-700 font-bold text-xl flex items-center justify-center">
              AS
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">{resident.name}</h3>
              <p className="text-xs text-slate-500 font-mono">Resident Code: {resident.residentCode}</p>
              <Badge variant="success" size="sm" className="mt-1">
                Active Tenant
              </Badge>
            </div>
          </div>

          <div className="mt-4 space-y-2.5 text-xs text-slate-700">
            <div className="flex justify-between">
              <span className="text-slate-500">Mobile Phone:</span>
              <span className="font-semibold">{resident.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Email:</span>
              <span>{resident.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">College / University:</span>
              <span className="font-semibold">{resident.college}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Emergency Contact:</span>
              <span>{resident.emergencyContact}</span>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <h3 className="font-bold text-slate-900 text-sm mb-3">Submitted Verification Proof</h3>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="font-bold text-slate-900">College Student ID Card</span>
              </div>
              <Badge variant="success" size="sm">Verified</Badge>
            </div>
            <p className="text-[11px] text-slate-500">
              Document reference: <span className="font-mono">proof_bennett_id_verified.pdf</span>
            </p>
            <div className="p-3 bg-purple-50/60 rounded-lg border border-purple-200 text-[11px] text-purple-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-700 shrink-0" />
              <span>Identity verified in compliance with the Digital Personal Data Protection Act. Full Aadhaar is not collected.</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ResidentProfile;
