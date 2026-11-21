import React, { useState } from 'react';
import {
  Building,
  DoorClosed,
  Bed,
  Plus,
  CheckCircle2,
  AlertCircle,
  Wrench,
  Search,
  Filter
} from 'lucide-react';
import Card, { CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { useData } from '../../context/DataContext';

export function PGProperties() {
  const { data, allocateBed } = useData();
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [allocateModalBed, setAllocateModalBed] = useState(null);
  const [selectedResidentId, setSelectedResidentId] = useState('');

  const rooms = data.pgRooms;
  const beds = data.pgBeds;

  const handleAllocate = () => {
    if (allocateModalBed && selectedResidentId) {
      const res = data.pgResidents.find(r => r.id === selectedResidentId);
      allocateBed(allocateModalBed.id, selectedResidentId, res?.name || 'Assigned Resident');
      setAllocateModalBed(null);
      setSelectedResidentId('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Properties, Rooms & Beds</h1>
            <Badge variant="pg" size="md">Inventory Hierarchy</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Manage your physical PG inventory from building property down to individual bed allocations.
          </p>
        </div>

        <Button variant="pg" size="sm" icon={Plus}>
          Add New Property
        </Button>
      </div>

      {/* Properties Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.pgProperties.map((property) => (
          <Card key={property.id} borderAccent="pg" padding="md">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-700 uppercase">
                  {property.code}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{property.name}</h3>
                <p className="text-xs text-slate-500">{property.address}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-extrabold text-blue-600">{property.totalBeds}</span>
                <span className="text-xs text-slate-400 block font-medium">Total Beds</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-slate-50 p-2 rounded-lg">
                <span className="text-slate-500 block">Floors</span>
                <span className="font-bold text-slate-800">{property.totalFloors}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg">
                <span className="text-slate-500 block">Rooms</span>
                <span className="font-bold text-slate-800">{property.totalRooms}</span>
              </div>
              <div className="bg-slate-50 p-2 rounded-lg">
                <span className="text-slate-500 block">Manager</span>
                <span className="font-bold text-slate-800 truncate block">{property.manager}</span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Rooms & Bed Inventory Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-900">Room & Bed Allocation Status</h2>
          <span className="text-xs text-slate-500">Click any bed to allocate or vacate</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rooms.map((room) => {
            const roomBeds = beds.filter(b => b.roomId === room.id);
            return (
              <Card key={room.id} padding="md" className="border-slate-200">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <DoorClosed className="w-5 h-5 text-blue-600" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">Room {room.roomNumber}</h4>
                      <p className="text-[10px] text-slate-400">{room.floor}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-slate-900">₹{room.rent.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-400 block">/ bed / month</span>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Beds in Room ({roomBeds.length})
                  </span>

                  {roomBeds.map((bed) => (
                    <div
                      key={bed.id}
                      className={`p-2.5 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                        bed.status === 'OCCUPIED'
                          ? 'bg-blue-50/50 border-blue-200 text-slate-900'
                          : bed.status === 'MAINTENANCE'
                          ? 'bg-amber-50 border-amber-200 text-amber-900'
                          : 'bg-emerald-50/40 border-emerald-200 text-emerald-950'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Bed className={`w-3.5 h-3.5 ${bed.status === 'OCCUPIED' ? 'text-blue-600' : bed.status === 'MAINTENANCE' ? 'text-amber-600' : 'text-emerald-600'}`} />
                        <span className="font-bold">Bed {bed.bedNumber}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        {bed.status === 'OCCUPIED' ? (
                          <span className="text-[11px] font-medium text-slate-700 truncate max-w-[120px]">
                            {bed.residentName}
                          </span>
                        ) : bed.status === 'MAINTENANCE' ? (
                          <span className="text-[10px] font-semibold text-amber-700 flex items-center gap-1">
                            <Wrench className="w-3 h-3" /> Repair
                          </span>
                        ) : (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="text-[10px] px-2 py-0.5 h-6"
                            onClick={() => setAllocateModalBed(bed)}
                          >
                            Allocate
                          </Button>
                        )}
                        <Badge
                          variant={bed.status === 'OCCUPIED' ? 'pg' : bed.status === 'MAINTENANCE' ? 'warning' : 'success'}
                          size="sm"
                        >
                          {bed.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* BED ALLOCATION MODAL */}
      <Modal
        isOpen={Boolean(allocateModalBed)}
        onClose={() => setAllocateModalBed(null)}
        title={allocateModalBed ? `Allocate Bed ${allocateModalBed.bedNumber}` : ''}
        subtitle="Select an approved resident to assign to this vacant bed"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <p className="text-xs text-slate-600">
            Assigning a resident guarantees unique occupancy. Multiple active residents cannot be bound to the same bed.
          </p>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Approved Resident:
            </label>
            <select
              value={selectedResidentId}
              onChange={(e) => setSelectedResidentId(e.target.value)}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">-- Choose Resident --</option>
              {data.pgResidents.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.residentCode}) • {r.phone}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setAllocateModalBed(null)}>
              Cancel
            </Button>
            <Button
              variant="pg"
              size="sm"
              disabled={!selectedResidentId}
              onClick={handleAllocate}
            >
              Confirm Allocation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PGProperties;
