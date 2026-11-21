import React, { useState } from 'react';
import { MessageSquareWarning, Plus, CheckCircle2, Clock, Wrench } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function PGComplaints() {
  const { data } = useData();

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

        <Button variant="pg" size="sm" icon={Plus}>
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

              <div className="flex items-center gap-3">
                <Badge
                  variant={cmp.status === 'RESOLVED' ? 'success' : cmp.status === 'IN_PROGRESS' ? 'warning' : 'neutral'}
                  size="sm"
                >
                  {cmp.status}
                </Badge>
                <Button variant="outline" size="sm">
                  Update Status
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PGComplaints;
