import React, { useState } from 'react';
import {
  Users,
  UserCheck,
  ShieldCheck,
  Plus,
  Phone,
  Clock,
  DollarSign,
  UserX,
  Search
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export function PGStaff() {
  const { data, addPgStaff } = useData();
  const { currentUser } = useAuth();
  const [staffModal, setStaffModal] = useState(false);
  const [search, setSearch] = useState('');
  const [newStaff, setNewStaff] = useState({
    name: '',
    role: 'Warden',
    phone: '',
    shift: 'Full Time',
    salary: 20000
  });

  const currentBizId = currentUser?.businessId || 'biz_pg_01';
  const staffList = (data.pgStaff || []).filter(s =>
    (!s.businessId || s.businessId === currentBizId) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.role.toLowerCase().includes(search.toLowerCase()))
  );

  const handleAddStaff = (e) => {
    e.preventDefault();
    if (!newStaff.name || !newStaff.phone) return;
    addPgStaff({
      ...newStaff,
      businessId: currentBizId,
      salary: parseFloat(newStaff.salary) || 0
    });
    setNewStaff({ name: '', role: 'Warden', phone: '', shift: 'Full Time', salary: 20000 });
    setStaffModal(false);
    alert('New staff member added to roster successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Staff & Employee Management</h1>
            <Badge variant="pg" size="md">{staffList.length} Active Staff</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage hostel wardens, security personnel, housekeeping, and facility maintenance team.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search staff by name or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg w-full sm:w-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <Button variant="pg" size="sm" icon={Plus} onClick={() => setStaffModal(true)}>
            Add Staff Member
          </Button>
        </div>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {staffList.map((stf) => (
          <Card key={stf.id} padding="md" className="border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                  {stf.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{stf.name}</h3>
                  <span className="text-xs font-semibold text-blue-600">{stf.role}</span>
                </div>
              </div>
              <Badge variant="success" size="sm" dot>
                {stf.status}
              </Badge>
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Phone:
                </span>
                <span className="font-medium text-slate-800">{stf.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Shift / Timing:
                </span>
                <span className="font-medium text-slate-800">{stf.shift}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5" /> Monthly Salary:
                </span>
                <span className="font-bold text-slate-900">₹{stf.salary?.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {staffList.length === 0 && (
        <Card className="p-8 text-center border-slate-200">
          <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Staff Members Registered</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 mb-4">
            Add your wardens, security guards, cleaners, and maintenance workers to assign responsibilities.
          </p>
          <Button variant="pg" size="sm" icon={Plus} onClick={() => setStaffModal(true)}>
            Add First Staff Member
          </Button>
        </Card>
      )}

      {/* Add Staff Modal */}
      <Modal
        isOpen={staffModal}
        onClose={() => setStaffModal(false)}
        title="Add Staff Member"
        subtitle="Register employee with role, contact, shift and salary"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleAddStaff} className="space-y-3 text-xs">
          <Input
            label="Staff Full Name"
            placeholder="e.g. Ramesh Singh"
            value={newStaff.name}
            onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Staff Role
              </label>
              <select
                value={newStaff.role}
                onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Head Warden">Head Warden</option>
                <option value="Assistant Warden">Assistant Warden</option>
                <option value="Security Guard">Security Guard</option>
                <option value="Housekeeping / Cleaner">Housekeeping / Cleaner</option>
                <option value="Electrician & Plumber">Electrician & Plumber</option>
                <option value="Mess Liaison">Mess Liaison</option>
              </select>
            </div>
            <Input
              label="Contact Phone"
              type="tel"
              placeholder="e.g. 9811155660"
              value={newStaff.phone}
              onChange={(e) => setNewStaff({ ...newStaff, phone: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Work Shift
              </label>
              <select
                value={newStaff.shift}
                onChange={(e) => setNewStaff({ ...newStaff, shift: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="Full Time">Full Time</option>
                <option value="Day Shift (8 AM - 8 PM)">Day Shift (8 AM - 8 PM)</option>
                <option value="Night Shift (8 PM - 8 AM)">Night Shift (8 PM - 8 AM)</option>
                <option value="On Call">On Call</option>
              </select>
            </div>
            <Input
              label="Monthly Salary (₹)"
              type="number"
              value={newStaff.salary}
              onChange={(e) => setNewStaff({ ...newStaff, salary: e.target.value })}
              required
            />
          </div>
          <div className="pt-3">
            <Button variant="pg" size="md" type="submit" className="w-full justify-center">
              Save Staff Member
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PGStaff;