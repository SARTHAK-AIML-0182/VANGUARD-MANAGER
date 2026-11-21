import React, { useState } from 'react';
import { MessageSquareWarning, Plus, CheckCircle2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function ResidentComplaints() {
  const { data, addComplaint } = useData();
  const [category, setCategory] = useState('PLUMBING');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;
    addComplaint({
      residentName: 'Aarav Sharma',
      room: '101',
      category,
      title,
      priority: 'MEDIUM'
    });
    setTitle('');
    setDescription('');
    alert('Complaint registered successfully! The warden has been notified.');
  };

  const myComplaints = data.pgComplaints.filter(c => c.residentName === 'Aarav Sharma');

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Complaints & Maintenance Requests</h1>
            <Badge variant="resident" size="md">Assistance</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Report Wi-Fi drops, plumbing leaks, electrical problems, or cleaning requests.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card padding="md">
          <h3 className="font-bold text-slate-900 text-sm mb-3">File a New Ticket</h3>
          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
              >
                <option value="PLUMBING">Plumbing / Water Supply</option>
                <option value="ELECTRICAL">Electrical / Appliance</option>
                <option value="WIFI">Wi-Fi & Internet</option>
                <option value="CLEANING">Room Cleaning / Housekeeping</option>
                <option value="SECURITY">Security / Noise Issue</option>
              </select>
            </div>

            <Input
              label="Issue Summary"
              placeholder="e.g. Geyser not heating properly in 101 bath"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Description (Optional)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide additional details..."
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
              />
            </div>

            <Button variant="resident" size="md" type="submit" className="w-full justify-center">
              Submit Complaint
            </Button>
          </form>
        </Card>

        <Card padding="md">
          <h3 className="font-bold text-slate-900 text-sm mb-3">My Past Tickets</h3>
          <div className="space-y-3 text-xs">
            {myComplaints.length === 0 ? (
              <p className="text-slate-400">No active complaints logged.</p>
            ) : (
              myComplaints.map((c) => (
                <div key={c.id} className="p-3 rounded-lg border border-slate-200 bg-slate-50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{c.title}</span>
                    <Badge variant={c.status === 'RESOLVED' ? 'success' : 'warning'} size="sm">
                      {c.status}
                    </Badge>
                  </div>
                  <p className="text-slate-500">Category: {c.category} • Logged: {c.createdAt}</p>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ResidentComplaints;
