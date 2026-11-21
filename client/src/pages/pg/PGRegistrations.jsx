import React, { useState } from 'react';
import {
  UserPlus,
  CheckCircle2,
  XCircle,
  FileText,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  AlertCircle,
  Clock,
  ShieldCheck,
  Search,
  Filter
} from 'lucide-react';
import Card, { CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { useData } from '../../context/DataContext';

export function PGRegistrations() {
  const { data, approveApplication, rejectApplication } = useData();
  const [selectedApp, setSelectedApp] = useState(null);
  const [rejectModalApp, setRejectModalApp] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL'); // ALL, PENDING, APPROVED, REJECTED
  const [searchQuery, setSearchQuery] = useState('');

  const applications = data.applications.filter(a => a.businessId === 'biz_pg_01');

  const filteredApps = applications.filter(app => {
    const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus;
    const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const handleRejectSubmit = () => {
    if (rejectModalApp) {
      rejectApplication(rejectModalApp.id, rejectReason || 'Incomplete documentation');
      setRejectModalApp(null);
      setRejectReason('');
      if (selectedApp?.id === rejectModalApp.id) {
        setSelectedApp(null);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Student Registrations & Approvals</h1>
            <Badge variant="pg" size="md">PG Portal</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Review self-registrations submitted via your business QR code. Manual approval is mandatory before resident activation.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2">
          {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(status => (
            <button
              key={status}
              type="button"
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Security Banner on Data Minimization */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900 space-y-0.5">
          <p className="font-semibold">Privacy Compliance & Verification Protocol</p>
          <p className="text-blue-800 leading-relaxed">
            Personal identity proofs (College ID / Work badge) are verified directly here. Full plaintext Aadhaar numbers are never collected or stored.
          </p>
        </div>
      </div>

      {/* Applications Table / Cards */}
      <div className="grid grid-cols-1 gap-4">
        {filteredApps.length === 0 ? (
          <Card padding="lg" className="text-center py-12">
            <UserPlus className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-slate-700">No applications match your filter</h3>
            <p className="text-xs text-slate-500 mt-1">Generate and display your PG QR code to receive student registrations.</p>
          </Card>
        ) : (
          filteredApps.map((app) => (
            <Card key={app.id} padding="md" hoverEffect className="border-slate-200">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Applicant Primary Data */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base text-slate-900">{app.applicantName}</span>
                    <Badge
                      variant={
                        app.status === 'APPROVED' ? 'success' : app.status === 'REJECTED' ? 'danger' : 'warning'
                      }
                      size="sm"
                      dot
                    >
                      {app.status}
                    </Badge>
                    <span className="text-xs text-slate-400 font-mono">#{app.id}</span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      {app.phone} (Verified via OTP)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      {app.email}
                    </span>
                    <span className="flex items-center gap-1.5 font-medium text-slate-800">
                      {app.occupationType === 'STUDENT' ? (
                        <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                      ) : (
                        <Briefcase className="w-3.5 h-3.5 text-slate-600" />
                      )}
                      {app.collegeOrCompany}
                    </span>
                  </div>

                  <div className="text-xs text-slate-500 pt-0.5">
                    Requested Date: <strong className="text-slate-800">{app.requestedJoiningDate}</strong> • Preferred: {app.preferredRoomType} • Emergency: {app.emergencyContactName} ({app.emergencyContactPhone})
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FileText}
                    onClick={() => setSelectedApp(app)}
                  >
                    View Dossier
                  </Button>

                  {app.status === 'PENDING' && (
                    <>
                      <Button
                        variant="pg"
                        size="sm"
                        icon={CheckCircle2}
                        onClick={() => approveApplication(app.id, 'Verified and approved by owner')}
                      >
                        Approve & Allocate
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        icon={XCircle}
                        onClick={() => setRejectModalApp(app)}
                      >
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* FULL APPLICANT DOSSIER MODAL */}
      <Modal
        isOpen={Boolean(selectedApp)}
        onClose={() => setSelectedApp(null)}
        title={selectedApp ? `Applicant Dossier — ${selectedApp.applicantName}` : ''}
        subtitle="Full submission record received via Business Registration QR"
        maxWidth="max-w-2xl"
      >
        {selectedApp && (
          <div className="space-y-5 text-xs text-slate-700">
            {/* Status Header */}
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-semibold text-slate-500 uppercase tracking-wider block text-[10px]">Application Status</span>
                <span className="font-bold text-sm text-slate-900">{selectedApp.status}</span>
              </div>
              <Badge variant={selectedApp.status === 'APPROVED' ? 'success' : selectedApp.status === 'REJECTED' ? 'danger' : 'warning'}>
                {selectedApp.status}
              </Badge>
            </div>

            {/* Section 1 & 2: Personal & Address */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Personal Details</span>
                <p>Phone: {selectedApp.phone}</p>
                <p>Email: {selectedApp.email}</p>
                <p>Date of Birth: {selectedApp.dob}</p>
                <p>Gender: {selectedApp.gender}</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-1">Permanent Address</span>
                <p>{selectedApp.permanentAddress}</p>
              </div>
            </div>

            {/* Section 3 & 4: Emergency & Institutional */}
            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100">
              <div>
                <span className="font-bold text-slate-900 block mb-1">Emergency Contact</span>
                <p>Name: {selectedApp.emergencyContactName}</p>
                <p>Phone: {selectedApp.emergencyContactPhone}</p>
              </div>
              <div>
                <span className="font-bold text-slate-900 block mb-1">Education / Employment</span>
                <p className="font-medium text-slate-900">{selectedApp.collegeOrCompany}</p>
                <p>Type: {selectedApp.occupationType}</p>
              </div>
            </div>

            {/* Section 5: Document Proof Attached */}
            <div className="pt-3 border-t border-slate-100">
              <span className="font-bold text-slate-900 block mb-1">Identity & Address Proof</span>
              <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" />
                  <span className="font-medium text-slate-800">{selectedApp.idProofType}: {selectedApp.idProofRef}</span>
                </div>
                <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-semibold">
                  MIME Verified
                </span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button variant="secondary" size="md" onClick={() => setSelectedApp(null)}>
                Close
              </Button>
              {selectedApp.status === 'PENDING' && (
                <>
                  <Button
                    variant="danger"
                    size="md"
                    onClick={() => {
                      setRejectModalApp(selectedApp);
                      setSelectedApp(null);
                    }}
                  >
                    Reject Application
                  </Button>
                  <Button
                    variant="pg"
                    size="md"
                    onClick={() => {
                      approveApplication(selectedApp.id, 'Approved via Dossier Inspection');
                      setSelectedApp(null);
                    }}
                  >
                    Approve Application
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* REJECT MODAL */}
      <Modal
        isOpen={Boolean(rejectModalApp)}
        onClose={() => setRejectModalApp(null)}
        title="Reject Registration Application"
        subtitle="Please provide an operational reason for the applicant record"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Rejecting <strong>{rejectModalApp?.applicantName}</strong> will preserve the audit record without activating their resident profile.
          </p>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Rejection Reason <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. No single rooms available for requested date; incomplete college verification."
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setRejectModalApp(null)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleRejectSubmit}>
              Confirm Rejection
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PGRegistrations;
