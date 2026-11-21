import React, { useState } from 'react';
import {
  UserPlus,
  CheckCircle2,
  XCircle,
  Phone,
  Mail,
  UtensilsCrossed,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { useData } from '../../context/DataContext';

export function MessRegistrations() {
  const { data, approveApplication, rejectApplication } = useData();
  const [selectedApp, setSelectedApp] = useState(null);
  const [rejectReason, setRejectReason] = useState('');

  const applications = data.applications.filter(a => a.businessId === 'biz_mess_01');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Customer Registrations & Approvals</h1>
            <Badge variant="mess" size="md">Mess Portal</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Review dining subscriptions submitted via your Mess QR code. Review dietary requests and activate subscriptions.
          </p>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3 text-xs text-emerald-950">
        <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold">Privacy Compliance for Dining Subscriptions</p>
          <p className="text-emerald-800 mt-0.5">
            In compliance with our data minimization policy, ordinary dining subscriptions do not collect Aadhaar or parental information.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {applications.length === 0 ? (
          <Card padding="lg" className="text-center py-12">
            <UserPlus className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-700">No customer applications pending</h3>
            <p className="text-xs text-slate-500 mt-1">Display your Mess QR code in the dining hall to onboard subscribers.</p>
          </Card>
        ) : (
          applications.map(app => (
            <Card key={app.id} padding="md" className="border-slate-200">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base text-slate-900">{app.applicantName}</span>
                    <Badge variant={app.status === 'APPROVED' ? 'success' : 'warning'} size="sm" dot>
                      {app.status}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">#{app.id}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                    <span>Phone: {app.phone} (OTP Verified)</span>
                    <span>Email: {app.email}</span>
                    <span className="font-semibold text-emerald-700">Plan: {app.selectedPlan}</span>
                    <Badge variant="mess" size="sm">{app.dietaryPreference}</Badge>
                  </div>

                  <p className="text-xs text-slate-500">
                    Start Date: <strong>{app.startDate}</strong> • College/Work: {app.collegeOrCompany || 'N/A'} • Voluntary Allergies: {app.foodAllergies || 'None disclosed'}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {app.status === 'PENDING' ? (
                    <>
                      <Button
                        variant="mess"
                        size="sm"
                        icon={CheckCircle2}
                        onClick={() => approveApplication(app.id, 'Approved by Mess Owner')}
                      >
                        Approve & Activate Pass
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={XCircle}
                        onClick={() => rejectApplication(app.id, 'Capacity full')}
                      >
                        Reject
                      </Button>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Activated
                    </span>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default MessRegistrations;
