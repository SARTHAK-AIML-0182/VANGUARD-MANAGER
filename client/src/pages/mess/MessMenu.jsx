import React, { useState } from 'react';
import { CalendarDays, UtensilsCrossed, Edit2, Check } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function MessMenu() {
  const { data } = useData();
  const [activeDay, setActiveDay] = useState('Friday');
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const dayMenu = data.messMenu[activeDay] || data.messMenu.Friday;

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

        <Button variant="mess" size="sm" icon={Edit2}>
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
            <span>Special Tea & Coffee included</span>
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
    </div>
  );
}

export default MessMenu;
