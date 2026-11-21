import React, { useState } from 'react';
import {
  Users,
  Search,
  Phone,
  Mail,
  Home,
  Calendar,
  AlertCircle,
  FileText,
  UserCheck
} from 'lucide-react';
import Card, { CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function PGStudents() {
  const { data } = useData();
  const [search, setSearch] = useState('');

  const residents = data.pgResidents.filter(r =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.phone.includes(search) ||
    r.roomNumber.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Resident Directory & Management</h1>
            <Badge variant="pg" size="md">{residents.length} Active Residents</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Active verified residents currently residing in your properties.
          </p>
        </div>

        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, room, phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 text-xs border border-slate-300 rounded-lg w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {residents.map((resident) => (
          <Card key={resident.id} padding="md" className="border-slate-200">
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                  {resident.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{resident.name}</h3>
                  <span className="text-[10px] font-mono text-blue-600 font-semibold">{resident.residentCode}</span>
                </div>
              </div>
              <Badge variant="success" size="sm" dot>
                {resident.status}
              </Badge>
            </div>

            <div className="mt-3 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Room & Bed:</span>
                <span className="font-bold text-slate-900">Room {resident.roomNumber} (Bed {resident.bedNumber})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-medium">{resident.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Monthly Rent:</span>
                <span className="font-bold text-slate-900">₹{resident.monthlyRent.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Joining Date:</span>
                <span>{resident.joiningDate}</span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 block text-[11px]">Emergency Contact:</span>
                <span className="text-slate-700 font-medium text-[11px]">{resident.emergencyContact}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Institution / Employer:</span>
                <span className="text-slate-700 font-medium text-[11px]">{resident.college}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PGStudents;
