import React, { useState } from 'react';
import { Package, AlertTriangle, Plus, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useData } from '../../context/DataContext';

export function MessInventory() {
  const { data, updateStock, addInventoryItem } = useData();
  const [addItemModal, setAddItemModal] = useState(false);
  const [stockModalItem, setStockModalItem] = useState(null);
  const [stockChangeQty, setStockChangeQty] = useState('');
  const [newItem, setNewItem] = useState({
    item: '',
    category: 'GRAINS',
    currentQty: 50,
    unit: 'kg',
    reorderLevel: 20
  });

  const inventory = data.messInventory;

  const handleStockAdjust = (isAdd) => {
    if (stockModalItem && stockChangeQty) {
      const change = parseFloat(stockChangeQty) * (isAdd ? 1 : -1);
      updateStock(stockModalItem.id, change);
      setStockModalItem(null);
      setStockChangeQty('');
      alert(`Stock updated for ${stockModalItem.item}!`);
    }
  };

  const handleCreateItem = (e) => {
    e.preventDefault();
    if (!newItem.item) return;
    addInventoryItem({
      ...newItem,
      currentQty: parseFloat(newItem.currentQty),
      reorderLevel: parseFloat(newItem.reorderLevel)
    });
    setNewItem({ item: '', category: 'GRAINS', currentQty: 50, unit: 'kg', reorderLevel: 20 });
    setAddItemModal(false);
    alert('Pantry item added to inventory tracker!');
  };

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

        <Button variant="mess" size="sm" icon={Plus} onClick={() => setAddItemModal(true)}>
          Add New Pantry Item
        </Button>
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
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[11px] py-1"
                    onClick={() => setStockModalItem(item)}
                  >
                    Adjust Stock
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ADJUST STOCK MODAL */}
      <Modal
        isOpen={Boolean(stockModalItem)}
        onClose={() => setStockModalItem(null)}
        title={stockModalItem ? `Adjust Stock: ${stockModalItem.item}` : ''}
        subtitle="Record daily kitchen usage or new wholesale delivery"
        maxWidth="max-w-md"
      >
        {stockModalItem && (
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Current stock: <strong>{stockModalItem.currentQty} {stockModalItem.unit}</strong>
            </p>
            <Input
              label={`Quantity to Add/Deduct (${stockModalItem.unit})`}
              type="number"
              placeholder="e.g. 20"
              value={stockChangeQty}
              onChange={(e) => setStockChangeQty(e.target.value)}
              required
            />
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                className="text-rose-600"
                onClick={() => handleStockAdjust(false)}
              >
                - Log Usage (Deduct)
              </Button>
              <Button
                variant="mess"
                size="sm"
                onClick={() => handleStockAdjust(true)}
              >
                + Stock Delivery (Add)
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ADD NEW ITEM MODAL */}
      <Modal
        isOpen={addItemModal}
        onClose={() => setAddItemModal(false)}
        title="Add Pantry Item"
        subtitle="Track ingredient inventory and set minimum stock warning threshold"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleCreateItem} className="space-y-3.5 text-xs">
          <Input
            label="Item Name"
            placeholder="e.g. Moong Dal"
            value={newItem.item}
            onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
            required
          />
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
            <select
              value={newItem.category}
              onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
              className="w-full text-xs p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="GRAINS">Grains & Flour</option>
              <option value="PULSES">Pulses & Dal</option>
              <option value="OILS">Oils & Ghee</option>
              <option value="DAIRY">Dairy</option>
              <option value="SPICES">Spices & Seasonings</option>
              <option value="VEGETABLES">Vegetables</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Starting Quantity"
              type="number"
              value={newItem.currentQty}
              onChange={(e) => setNewItem({ ...newItem, currentQty: e.target.value })}
              required
            />
            <Input
              label="Unit (kg, Liters, Bags)"
              value={newItem.unit}
              onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
              required
            />
          </div>
          <Input
            label="Low Stock Warning Level"
            type="number"
            value={newItem.reorderLevel}
            onChange={(e) => setNewItem({ ...newItem, reorderLevel: e.target.value })}
            required
          />
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" size="sm" onClick={() => setAddItemModal(false)}>
              Cancel
            </Button>
            <Button variant="mess" size="sm" type="submit">
              Save Inventory Item
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default MessInventory;
