import React from 'react';
import { Link } from 'react-router-dom';
import {
  Bed,
  Users,
  UserPlus,
  Receipt,
  MessageSquareWarning,
  QrCode,
  Building2,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import Card, { CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function PGDashboard() {
  const { data, approveApplication, rejectApplication } = useData();

  const totalBeds = 48;
  const occupiedBeds = data.pgBeds.filter(b => b.status === 'OCCUPIED').length + 38; // 42 occupied
  const vacantBeds = totalBeds - occupiedBeds;
  const pendingApps = data.applications.filter(a => a.businessId === 'biz_pg_01' && a.status === 'PENDING');
  const openComplaints = data.pgComplaints.filter(c => c.status !== 'RESOLVED');

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            PG Operational Command
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Royal Comfort PG & Hostels
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            48 total bed capacity across 2 verified properties. Review pending student registrations, monitor room occupancy, and inspect curfew attendance.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/pg/qr-code">
              <Button variant="pg" size="sm" icon={QrCode}>
                View Business QR Code
              </Button>
            </Link>
            <Link to="/pg/registrations">
              <Button variant="secondary" size="sm" icon={UserPlus}>
                Review Applications ({pendingApps.length})
              </Button>
            </Link>
            <Link to="/pg/beds">
              <Button variant="outline" size="sm" className="text-white border-slate-700 hover:bg-slate-800">
                Vacant Beds ({vacantBeds})
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Key Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card borderAccent="pg" padding="md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Bed Occupancy</span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <Bed className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{occupiedBeds} / {totalBeds}</span>
            <span className="text-xs font-semibold text-emerald-600">87.5% Full</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3">
            <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '87.5%' }}></div>
          </div>
          <p className="mt-2 text-[11px] text-slate-500">{vacantBeds} beds available for allocation</p>
        </Card>

        <Card borderAccent="pg" padding="md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Pending Registrations</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <UserPlus className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{pendingApps.length}</span>
            <span className="text-xs font-semibold text-amber-700">Needs Review</span>
          </div>
          <p className="mt-5 text-[11px] text-slate-500">From reception desk QR scans</p>
        </Card>

        <Card borderAccent="pg" padding="md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nov Rent Collected</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">₹3,48,500</span>
            <span className="text-xs font-semibold text-emerald-600">92%</span>
          </div>
          <p className="mt-5 text-[11px] text-slate-500">2 overdue invoices pending reminder</p>
        </Card>

        <Card borderAccent="pg" padding="md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Active Complaints</span>
            <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
              <MessageSquareWarning className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900">{openComplaints.length}</span>
            <span className="text-xs font-semibold text-rose-600">1 Urgent</span>
          </div>
          <p className="mt-5 text-[11px] text-slate-500">Wi-Fi & plumbing maintenance</p>
        </Card>
      </div>

      {/* Main Grid: Pending Applications & Room Inventory Quick View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Pending Self-Registrations Requiring Owner Approval */}
        <div className="lg:col-span-2">
          <Card padding="md">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Pending QR Self-Registrations</h3>
                <p className="text-xs text-slate-500 mt-0.5">Scanned via your business QR code. Awaiting manual owner approval.</p>
              </div>
              <Link to="/pg/registrations">
                <Button variant="ghost" size="sm" icon={ArrowRight} iconPosition="right">
                  View All
                </Button>
              </Link>
            </div>

            {pendingApps.length === 0 ? (
              <div className="text-center py-8 text-slate-400 text-xs">
                <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2" />
                All pending applications have been processed!
              </div>
            ) : (
              <div className="space-y-4">
                {pendingApps.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-xl border border-slate-200/90 bg-slate-50/60 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{app.applicantName}</span>
                        <Badge variant="warning" size="sm">Pending Approval</Badge>
                      </div>
                      <p className="text-xs text-slate-600">
                        {app.phone} • {app.collegeOrCompany}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        Requested joining: <span className="font-semibold text-slate-700">{app.requestedJoiningDate}</span> • Preferred: {app.preferredRoomType}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => approveApplication(app.id, 'Approved via dashboard')}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => rejectApplication(app.id, 'Room unavailable')}
                      >
                        Reject
                      </Button>
                      <Link to="/pg/registrations">
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right 1 Col: Quick Property Breakdown */}
        <div>
          <Card padding="md">
            <h3 className="font-bold text-slate-900 text-base mb-1">Property Inventory</h3>
            <p className="text-xs text-slate-500 mb-4">Real-time floor & bed availability</p>

            <div className="space-y-4">
              {data.pgProperties.map((prop) => (
                <div key={prop.id} className="p-3.5 rounded-lg border border-slate-200 bg-white space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-slate-900">{prop.name}</span>
                    <Badge variant="neutral" size="sm">{prop.code}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span>{prop.totalRooms} Rooms</span>
                    <span className="font-bold text-blue-600">{prop.totalBeds} Total Beds</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Manager: {prop.manager}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100">
              <Link to="/pg/beds">
                <Button variant="secondary" size="sm" className="w-full justify-center">
                  Inspect All Beds & Allocations
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PGDashboard;
