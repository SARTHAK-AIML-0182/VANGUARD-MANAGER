import React from 'react';
import { CalendarCheck, CheckCircle2, Clock } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

export function ResidentAttendance() {
  const attendanceLogs = [
    { date: '21 Nov 2026', time: '9:42 PM', status: 'PRESENT', type: 'Curfew Rollcall' },
    { date: '20 Nov 2026', time: '9:50 PM', status: 'PRESENT', type: 'Curfew Rollcall' },
    { date: '19 Nov 2026', time: '9:35 PM', status: 'PRESENT', type: 'Curfew Rollcall' },
    { date: '18 Nov 2026', time: '—', status: 'ON_LEAVE', type: 'Approved Leave Pass' },
    { date: '17 Nov 2026', time: '9:48 PM', status: 'PRESENT', type: 'Curfew Rollcall' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">My Attendance & Curfew History</h1>
            <Badge variant="resident" size="md">Audit Log</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Verified check-in punches and curfew verification records.
          </p>
        </div>
      </div>

      <Card padding="md">
        <div className="divide-y divide-slate-100 text-xs">
          {attendanceLogs.map((log, i) => (
            <div key={i} className="py-3.5 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block">{log.date}</span>
                <span className="text-slate-500">{log.type}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-600">{log.time}</span>
                <Badge variant={log.status === 'PRESENT' ? 'success' : 'neutral'} size="sm">
                  {log.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

export default ResidentAttendance;
