import React, { useState } from 'react';
import { MessageSquareWarning, Plus, CheckCircle2, Clock, Wrench } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useData } from '../../context/DataContext';

export function PGComplaints() {
  const { data, addComplaint, updateComplaintStatus } = useData();
  const [ticketModal, setTicketModal] = useState(false);
  const [newTicket, setNewTicket] = useState({
    residentName: 'Rajesh Kumar (Owner Log)',
    room: 'Common Area',
    category: 'PLUMBING',
    title: '',
    priority: 'MEDIUM'
  });

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!newTicket.title) return;
    addComplaint(newTicket);
    setNewTicket({ residentName: 'Rajesh Kumar (Owner Log)', room: 'Common Area', category: 'PLUMBING', title: '', priority: 'MEDIUM' });
    setTicketModal(false);
    alert('Maintenance ticket registered!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Complaints & Maintenance Tickets</h1>
            <Badge variant="pg" size="md">Operations</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Resolve facility, plumbing, electrical, and resident complaints with audit history.
          </p>
        </div>

        <Button variant="pg" size="sm" icon={Plus} onClick={() => setTicketModal(true)}>
          Log Maintenance Ticket
        </Button>
      </div>

      <div className="space-y-4">
        {data.pgComplaints.map((cmp) => (
          <Card key={cmp.id} padding="md" className="border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant={cmp.priority === 'HIGH' ? 'danger' : 'neutral'} size="sm">
                    {cmp.category}
                  </Badge>
                  <h3 className="font-bold text-slate-900 text-sm">{cmp.title}</h3>
                </div>
                <p className="text-xs text-slate-500">
                  Filed by <span className="font-medium text-slate-700">{cmp.residentName}</span> (Room {cmp.room}) on {cmp.createdAt}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={cmp.status === 'RESOLVED' ? 'success' : cmp.status === 'IN_PROGRESS' ? 'warning' : 'neutral'}
                  size="sm"
                >
                  {cmp.status}
                </Badge>
                {cmp.status !== 'RESOLVED' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] py-1"
                    onClick={() => {
                      updateComplaintStatus(cmp.id, cmp.status === 'OPEN' ? 'IN_PROGRESS' : 'RESOLVED');
                      alert(`Ticket updated to ${cmp.status === 'OPEN' ? 'IN_PROGRESS' : 'RESOLVED'}`);
                    }}
                  >
                    {cmp.status === 'OPEN' ? 'Mark In Progress' : 'Mark Resolved'}
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* CREATE TICKET MODAL */}
      <Modal
        isOpen={ticketModal}
        onClose={() => setTicketModal(false)}
        title="Log Facility Maintenance Ticket"
        subtitle="Record issue and dispatch to building staff"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateTicket} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={newTicket.category}
              onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="PLUMBING">Plumbing</option>
              <option value="ELECTRICAL">Electrical</option>
              <option value="WIFI">Wi-Fi & Internet</option>
              <option value="CLEANING">Cleaning & Housekeeping</option>
            </select>
          </div>
          <Input
            label="Location / Room"
            placeholder="e.g. 2nd Floor Corridor / Room 102"
            value={newTicket.room}
            onChange={(e) => setNewTicket({ ...newTicket, room: e.target.value })}
            required
          />
          <Input
            label="Issue Summary"
            placeholder="e.g. Wi-Fi router reboot required / Water pressure low"
            value={newTicket.title}
            onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setTicketModal(false)}>
              Cancel
            </Button>
            <Button variant="pg" size="sm" type="submit">
              Log Maintenance Ticket
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PGComplaints;
