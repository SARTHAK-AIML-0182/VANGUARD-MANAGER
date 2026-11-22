import React, { useState } from 'react';
import {
  Star,
  MessageSquare,
  Plus,
  ThumbsUp,
  User,
  Calendar,
  CheckCircle2,
  UtensilsCrossed
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

export function MessFeedback() {
  const { data, submitMessFeedback } = useData();
  const { currentUser } = useAuth();
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [newFeedback, setNewFeedback] = useState({
    customerName: '',
    rating: 5,
    meal: 'Dinner',
    category: 'TASTE',
    comment: ''
  });

  const currentBizId = currentUser?.businessId || 'biz_mess_01';
  const feedbackList = (data.messFeedback || []).filter(f => !f.businessId || f.businessId === currentBizId);

  const averageRating = feedbackList.length > 0
    ? (feedbackList.reduce((acc, curr) => acc + curr.rating, 0) / feedbackList.length).toFixed(1)
    : '4.8';

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.customerName || !newFeedback.comment) return;
    submitMessFeedback({
      ...newFeedback,
      businessId: currentBizId,
      rating: parseInt(newFeedback.rating, 10)
    });
    setNewFeedback({ customerName: '', rating: 5, meal: 'Dinner', category: 'TASTE', comment: '' });
    setFeedbackModal(false);
    alert('Thank you! Dining feedback recorded successfully.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-slate-900">Customer Reviews & Taste Feedback</h1>
            <Badge variant="mess" size="md">Quality Assurance</Badge>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Student and subscriber feedback on food taste, portion size, cleanliness, and chef specials.
          </p>
        </div>

        <Button variant="mess" size="sm" icon={Plus} onClick={() => setFeedbackModal(true)}>
          Submit Dining Review
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Overall Dining Rating</span>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-3xl font-black text-amber-500">{averageRating}</p>
            <div className="flex text-amber-400">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
          </div>
          <span className="text-[11px] text-slate-400 mt-0.5 block">Based on {feedbackList.length} verified dining customer reviews</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Top Rated Dish</span>
          <p className="text-2xl font-black text-slate-900 mt-1">Paneer Butter Masala</p>
          <span className="text-[11px] text-emerald-600 font-semibold mt-0.5 block">98% positive sentiment rating</span>
        </Card>
        <Card padding="md" className="border-slate-200">
          <span className="text-xs font-semibold text-slate-500 block">Hygiene & Cleanliness</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">Grade A+</p>
          <span className="text-[11px] text-slate-400 mt-0.5 block">FSSAI food safety audit passed</span>
        </Card>
      </div>

      {/* Feedback List */}
      <div className="space-y-4">
        {feedbackList.map((fdb) => (
          <Card key={fdb.id} padding="md" className="border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                  {fdb.customerName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-xs">{fdb.customerName}</h3>
                  <span className="text-[10px] text-slate-400">{fdb.meal} • {fdb.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(fdb.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <Badge variant="neutral" size="sm">
                  {fdb.category}
                </Badge>
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-700 leading-relaxed italic">
              "{fdb.comment}"
            </p>
          </Card>
        ))}
      </div>

      {/* Submit Feedback Modal */}
      <Modal
        isOpen={feedbackModal}
        onClose={() => setFeedbackModal(false)}
        title="Submit Food & Service Review"
        subtitle="Help us improve kitchen quality and taste"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSubmitFeedback} className="space-y-3 text-xs">
          <Input
            label="Your Full Name"
            placeholder="e.g. Priya Iyer"
            value={newFeedback.customerName}
            onChange={(e) => setNewFeedback({ ...newFeedback, customerName: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Meal Window
              </label>
              <select
                value={newFeedback.meal}
                onChange={(e) => setNewFeedback({ ...newFeedback, meal: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Rating
              </label>
              <select
                value={newFeedback.rating}
                onChange={(e) => setNewFeedback({ ...newFeedback, rating: e.target.value })}
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 - Outstanding)</option>
                <option value={4}>⭐⭐⭐⭐ (4 - Very Good)</option>
                <option value={3}>⭐⭐⭐ (3 - Average)</option>
                <option value={2}>⭐⭐ (2 - Needs Improvement)</option>
                <option value={1}>⭐ (1 - Unsatisfactory)</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Review Comments & Suggestions
            </label>
            <textarea
              rows={3}
              placeholder="Tell us what you loved or what the chef can improve..."
              value={newFeedback.comment}
              onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
              required
              className="w-full text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>
          <div className="pt-3">
            <Button variant="mess" size="md" type="submit" className="w-full justify-center">
              Submit Review
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default MessFeedback;