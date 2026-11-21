import React from 'react';
import { Home, ShieldCheck, CheckCircle2, User, UtensilsCrossed } from 'lucide-react';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

export function ResidentStay() {
  const { currentUser } = useAuth();
  const { data } = useData();

  const isPg = currentUser?.role === 'PG_STUDENT';
  const resident = data.pgResidents[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              {isPg ? 'My Accommodation & Room Details' : 'My Dining Subscription & Meal Pass'}
            </h1>
            <Badge variant="resident" size="md">Verified Allocation</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            {isPg ? 'Detailed room inventory, bed allocation, and property rules.' : 'Active dining pass, remaining meals, and menu schedule.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card borderAccent="resident" padding="md">
          <h3 className="font-bold text-slate-900 text-sm mb-4">
            {isPg ? 'Assigned Property & Room' : 'Active Dining Subscription'}
          </h3>

          <div className="space-y-2.5 text-xs text-slate-700">
            {isPg ? (
              <>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Property:</span>
                  <span className="font-bold">{resident.property}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Room Number:</span>
                  <span className="font-bold">Room {resident.roomNumber}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Bed Identifier:</span>
                  <span className="font-bold">Bed {resident.bedNumber}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Joining Date:</span>
                  <span>{resident.joiningDate}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Monthly Rent:</span>
                  <span className="font-extrabold text-blue-600">₹{resident.monthlyRent.toLocaleString()}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Mess Business:</span>
                  <span className="font-bold">Annapurna Gourmet Mess</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Plan:</span>
                  <span className="font-bold">Standard Full Board</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-500">Meals Remaining:</span>
                  <span className="font-bold text-emerald-600">68 Meals</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-500">Valid Until:</span>
                  <span>15 Dec 2026</span>
                </div>
              </>
            )}
          </div>
        </Card>

        <Card padding="md">
          <h3 className="font-bold text-slate-900 text-sm mb-4">House Rules & Resident Code of Conduct</h3>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Nightly Curfew:</strong> Entry closes at 10:00 PM strictly. Late entry requires prior warden approval.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Visitors Policy:</strong> Day guests permitted in the common lounge between 10:00 AM and 6:00 PM only.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span><strong>Quiet Hours:</strong> Respect roommates and neighbors. Quiet study hours from 11:00 PM to 6:00 AM.</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

export default ResidentStay;
