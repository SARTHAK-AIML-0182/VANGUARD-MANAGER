import React from 'react';
import { Package, AlertTriangle, Plus, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { useData } from '../../context/DataContext';

export function MessInventory() {
  const { data } = useData();
  const inventory = data.messInventory;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Pantry Grocery & Stock Inventory</h1>
            <Badge variant="mess" size="md">Kitchen Control</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Track grains, dairy, pulses, and oil stock with low-quantity reorder alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" icon={ArrowLeftRight}>
            Log Consumption / Stock In
          </Button>
          <Button variant="mess" size="sm" icon={Plus}>
            Add New Item
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th className="p-3.5">Item Name</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Current Stock</th>
              <th className="p-3.5">Reorder Level</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inventory.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="p-3.5 font-bold text-slate-900">{item.item}</td>
                <td className="p-3.5">
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    {item.category}
                  </span>
                </td>
                <td className="p-3.5 font-extrabold text-sm text-slate-900">
                  {item.currentQty} {item.unit}
                </td>
                <td className="p-3.5 text-slate-500">
                  {item.reorderLevel} {item.unit}
                </td>
                <td className="p-3.5">
                  <Badge variant={item.status === 'LOW_STOCK' ? 'warning' : 'success'} size="sm">
                    {item.status === 'LOW_STOCK' ? 'Low Stock' : 'Sufficient'}
                  </Badge>
                </td>
                <td className="p-3.5 text-right">
                  <Button variant="ghost" size="sm" className="text-emerald-700">
                    Update Stock
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MessInventory;
