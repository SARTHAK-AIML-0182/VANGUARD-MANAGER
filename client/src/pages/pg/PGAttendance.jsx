import React, { useState } from 'react';
import { CalendarCheck, CheckCircle2, XCircle, Clock, AlertTriangle, Check, X } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { useData } from '../../context/DataContext';

export function PGAttendance() {
  const { data, approveLeave, rejectLeave } = useData();
  const [rollcallModal, setRollcallModal] = useState(false);
  const [rollcallStatus, setRollcallStatus] = useState({});

  const handleRollcallSave = () => {
    setRollcallModal(false);
    alert("Tonight's rollcall attendance has been recorded and locked!");
  };

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

        <Button variant="pg" size="sm" icon={CalendarCheck} onClick={() => setRollcallModal(true)}>
          Mark Tonight's Curfew Rollcall
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="md">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Today's Check-in Summary (21 Nov 2026)</h3>
            <span className="text-[10px] font-semibold text-slate-400">Night Curfew: 10:00 PM</span>
          </div>

          <div className="space-y-3 text-xs">
            {data.pgResidents.map((res) => (
              <div key={res.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-slate-900">{res.name}</p>
                  <p className="text-slate-500">Room {res.roomNumber} • Bed {res.bedNumber}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Present (9:42 PM)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
            <h3 className="font-bold text-slate-900 text-sm">Leave Applications & Approvals</h3>
            <Badge variant="pg" size="sm">{data.pgLeaveRequests.length} Total</Badge>
          </div>

          <div className="space-y-3 text-xs">
            {data.pgLeaveRequests.map((lev) => (
              <div key={lev.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{lev.residentName} ({lev.room})</span>
                  <Badge variant={lev.status === 'APPROVED' ? 'success' : lev.status === 'REJECTED' ? 'danger' : 'warning'} size="sm">
                    {lev.status}
                  </Badge>
                </div>
                <p className="text-slate-600">
                  Dates: <strong>{lev.fromDate}</strong> to <strong>{lev.toDate}</strong>
                </p>
                <p className="text-slate-500">Reason: {lev.reason}</p>

                {lev.status === 'PENDING' && (
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-[10px] py-1 text-rose-600"
                      icon={X}
                      onClick={() => rejectLeave(lev.id)}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="pg"
                      size="sm"
                      className="text-[10px] py-1"
                      icon={Check}
                      onClick={() => approveLeave(lev.id)}
                    >
                      Approve & Verify Parent
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ROLLCALL MODAL */}
      <Modal
        isOpen={rollcallModal}
        onClose={() => setRollcallModal(false)}
        title="Curfew Attendance Rollcall"
        subtitle="Mark resident physical presence at campus reception"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <div className="space-y-2">
            {data.pgResidents.map(res => (
              <div key={res.id} className="p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">{res.name}</span>
                  <span className="text-slate-400">Room {res.roomNumber} ({res.bedNumber})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setRollcallStatus({ ...rollcallStatus, [res.id]: 'PRESENT' })}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                      rollcallStatus[res.id] !== 'ABSENT' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    type="button"
                    onClick={() => setRollcallStatus({ ...rollcallStatus, [res.id]: 'ABSENT' })}
                    className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                      rollcallStatus[res.id] === 'ABSENT' ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button variant="secondary" size="sm" onClick={() => setRollcallModal(false)}>
              Cancel
            </Button>
            <Button variant="pg" size="sm" onClick={handleRollcallSave}>
              Save Tonight's Rollcall
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PGAttendance;
