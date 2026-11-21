import React from 'react';
import { CalendarCheck, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function PGAttendance() {
  const { data } = useData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Resident Nightly Attendance & Curfew</h1>
            <Badge variant="pg" size="md">Security & Safety</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Daily check-in verification for PG safety and curfew compliance.
          </p>
        </div>

        <Button variant="pg" size="sm" icon={CalendarCheck}>
          Mark Tonight's Curfew Rollcall
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="md">
          <h3 className="font-bold text-slate-900 text-sm mb-3">Today's Check-in Summary (21 Nov 2026)</h3>
          <div className="space-y-3 text-xs">
            {data.pgResidents.map((res) => (
              <div key={res.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{res.name}</p>
                  <p className="text-slate-500">Room {res.roomNumber} • Bed {res.bedNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Present (Punched 9:42 PM)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <h3 className="font-bold text-slate-900 text-sm mb-3">Approved Leave Requests</h3>
          <div className="space-y-3 text-xs">
            {data.pgLeaveRequests.map((lev) => (
              <div key={lev.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">{lev.residentName}</span>
                  <Badge variant="success" size="sm">Parent Verified</Badge>
                </div>
                <p className="text-slate-600">
                  Dates: <strong>{lev.fromDate}</strong> to <strong>{lev.toDate}</strong>
                </p>
                <p className="text-slate-500 mt-1">Reason: {lev.reason}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default PGAttendance;
