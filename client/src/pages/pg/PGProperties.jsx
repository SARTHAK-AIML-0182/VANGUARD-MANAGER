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
  Filter,
  UserCheck,
  UserMinus
} from 'lucide-react';
import Card, { CardHeader } from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useData } from '../../context/DataContext';

export function PGProperties() {
  const { data, allocateBed, vacateBed, addRoom } = useData();
  const [allocateModalBed, setAllocateModalBed] = useState(null);
  const [selectedResidentId, setSelectedResidentId] = useState('');
  const [addRoomModal, setAddRoomModal] = useState(false);
  const [newRoom, setNewRoom] = useState({
    propertyId: 'prop_01',
    floor: '2nd Floor',
    roomNumber: '',
    type: 'DOUBLE_SHARING',
    rent: 8500,
    attachedBath: true
  });

  const rooms = data.pgRooms;
  const beds = data.pgBeds;

  const handleAllocate = () => {
    if (allocateModalBed && selectedResidentId) {
      const res = data.pgResidents.find(r => r.id === selectedResidentId);
      allocateBed(allocateModalBed.id, selectedResidentId, res?.name || 'Assigned Resident');
      setAllocateModalBed(null);
      setSelectedResidentId('');
      alert('Bed allocated successfully! Resident record updated.');
    }
  };

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!newRoom.roomNumber) return;
    addRoom({
      ...newRoom,
      rent: parseFloat(newRoom.rent)
    });
    setNewRoom({ propertyId: 'prop_01', floor: '2nd Floor', roomNumber: '', type: 'DOUBLE_SHARING', rent: 8500, attachedBath: true });
    setAddRoomModal(false);
    alert('Room and corresponding beds added to inventory successfully!');
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

        <div className="flex items-center gap-2">
          <Button variant="pg" size="sm" icon={Plus} onClick={() => setAddRoomModal(true)}>
            Add Room to Property
          </Button>
        </div>
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
          <span className="text-xs text-slate-500">Click Allocate or Vacate on any bed</span>
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
                          <>
                            <span className="text-[11px] font-medium text-slate-700 truncate max-w-[100px]">
                              {bed.residentName}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm(`Vacate bed ${bed.bedNumber}?`)) {
                                  vacateBed(bed.id);
                                }
                              }}
                              className="text-[10px] text-rose-600 hover:text-rose-800 font-semibold px-1 py-0.5"
                              title="Vacate Bed"
                            >
                              Vacate
                            </button>
                          </>
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

      {/* ALLOCATE BED MODAL */}
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

      {/* ADD ROOM MODAL */}
      <Modal
        isOpen={addRoomModal}
        onClose={() => setAddRoomModal(false)}
        title="Add Room to Property"
        subtitle="Provision a room and auto-generate bed inventory"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateRoom} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Property</label>
            <select
              value={newRoom.propertyId}
              onChange={(e) => setNewRoom({ ...newRoom, propertyId: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {data.pgProperties.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Room Number"
              placeholder="e.g. 301"
              value={newRoom.roomNumber}
              onChange={(e) => setNewRoom({ ...newRoom, roomNumber: e.target.value })}
              required
            />
            <Input
              label="Floor Level"
              placeholder="e.g. 3rd Floor"
              value={newRoom.floor}
              onChange={(e) => setNewRoom({ ...newRoom, floor: e.target.value })}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Sharing Type</label>
              <select
                value={newRoom.type}
                onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
                className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="DOUBLE_SHARING">Double Sharing (2 Beds)</option>
                <option value="SINGLE">Single (1 Bed)</option>
                <option value="TRIPLE_SHARING">Triple Sharing (3 Beds)</option>
              </select>
            </div>
            <Input
              label="Monthly Rent (₹/bed)"
              type="number"
              value={newRoom.rent}
              onChange={(e) => setNewRoom({ ...newRoom, rent: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setAddRoomModal(false)}>
              Cancel
            </Button>
            <Button variant="pg" size="sm" type="submit">
              Create Room & Beds
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default PGProperties;
