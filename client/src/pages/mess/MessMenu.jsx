import React, { useState } from 'react';
import { CalendarDays, UtensilsCrossed, Edit2, Check } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import { useData } from '../../context/DataContext';

export function MessMenu() {
  const { data, updateMenuDay } = useData();
  const [activeDay, setActiveDay] = useState('Friday');
  const [editModal, setEditModal] = useState(false);
  const [menuForm, setMenuForm] = useState({ breakfast: '', lunch: '', dinner: '' });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const dayMenu = data.messMenu[activeDay] || data.messMenu.Friday;

  const openEdit = () => {
    setMenuForm({
      breakfast: dayMenu.breakfast,
      lunch: dayMenu.lunch,
      dinner: dayMenu.dinner
    });
    setEditModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateMenuDay(activeDay, 'breakfast', menuForm.breakfast);
    updateMenuDay(activeDay, 'lunch', menuForm.lunch);
    updateMenuDay(activeDay, 'dinner', menuForm.dinner);
    setEditModal(false);
    alert(`${activeDay}'s menu updated successfully!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Weekly Kitchen Menu Schedule</h1>
            <Badge variant="mess" size="md">Dietary Display</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Update daily meals served across breakfast, lunch, and dinner. Live on customer portals.
          </p>
        </div>

        <Button variant="mess" size="sm" icon={Edit2} onClick={openEdit}>
          Edit {activeDay}'s Menu
        </Button>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => setActiveDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeDay === day
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card borderAccent="mess" padding="md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-slate-900 text-sm">Breakfast</span>
            <span className="text-[10px] text-slate-400">7:30 AM - 9:30 AM</span>
          </div>
          <p className="mt-4 text-xs text-slate-800 leading-relaxed font-medium">
            {dayMenu.breakfast}
          </p>
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Tea & Coffee included</span>
          </div>
        </Card>

        <Card borderAccent="mess" padding="md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-slate-900 text-sm">Lunch</span>
            <span className="text-[10px] text-slate-400">12:30 PM - 2:30 PM</span>
          </div>
          <p className="mt-4 text-xs text-slate-800 leading-relaxed font-medium">
            {dayMenu.lunch}
          </p>
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Fresh Green Salad & Raita</span>
          </div>
        </Card>

        <Card borderAccent="mess" padding="md">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="font-bold text-slate-900 text-sm">Dinner</span>
            <span className="text-[10px] text-slate-400">7:30 PM - 9:45 PM</span>
          </div>
          <p className="mt-4 text-xs text-slate-800 leading-relaxed font-medium">
            {dayMenu.dinner}
          </p>
          <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Dessert included</span>
          </div>
        </Card>
      </div>

      {/* EDIT MENU MODAL */}
      <Modal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        title={`Edit ${activeDay}'s Menu`}
        subtitle="Changes are reflected in real time across customer subscriber hubs"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSave} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Breakfast Menu</label>
            <textarea
              rows={2}
              value={menuForm.breakfast}
              onChange={(e) => setMenuForm({ ...menuForm, breakfast: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Lunch Menu</label>
            <textarea
              rows={2}
              value={menuForm.lunch}
              onChange={(e) => setMenuForm({ ...menuForm, lunch: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Dinner Menu</label>
            <textarea
              rows={2}
              value={menuForm.dinner}
              onChange={(e) => setMenuForm({ ...menuForm, dinner: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setEditModal(false)}>
              Cancel
            </Button>
            <Button variant="mess" size="sm" type="submit">
              Save {activeDay} Menu
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default MessMenu;
