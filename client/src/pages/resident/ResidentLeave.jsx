import React, { useState } from 'react';
import { CalendarDays, Plus, CheckCircle2, AlertCircle } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function ResidentLeave() {
  const { data } = useData();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFromDate('');
      setToDate('');
      setReason('');
      setSubmitted(false);
      alert('Leave application submitted to warden for review.');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Leave Requests & Outstation Passes</h1>
            <Badge variant="resident" size="md">PG Safety</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Submit leave dates for warden verification and parental notification.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="md">
          <h3 className="font-bold text-slate-900 text-sm mb-3">Apply for New Leave</h3>
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <Input
              label="From Date"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              required
            />
            <Input
              label="To Date"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              required
            />
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Reason for Leave <span className="text-rose-500">*</span>
              </label>
              <textarea
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
                placeholder="e.g. Traveling home for semester break / family function"
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            <Button variant="resident" size="md" type="submit" className="w-full justify-center">
              Submit Leave Request
            </Button>
          </form>
        </Card>

        <Card padding="md">
          <h3 className="font-bold text-slate-900 text-sm mb-3">Past Leave History</h3>
          <div className="space-y-3 text-xs">
            {data.pgLeaveRequests.map((lev) => (
              <div key={lev.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900">
                    {lev.fromDate} to {lev.toDate}
                  </span>
                  <Badge variant="success" size="sm">
                    {lev.status}
                  </Badge>
                </div>
                <p className="text-slate-600 mt-1">{lev.reason}</p>
                <span className="text-[10px] text-emerald-700 font-medium block mt-2">
                  Parent Contact Confirmed
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ResidentLeave;
