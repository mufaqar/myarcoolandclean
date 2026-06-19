'use client';
import { useState } from 'react';
import { FiStar } from 'react-icons/fi';
import { productsApi } from '@/lib/api';
import toast from 'react-hot-toast';

export default function ReviewForm({ slug, onSuccess }) {
  const [form, setForm] = useState({ name: '', email: '', rating: 0, comment: '' });
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.rating === 0) return toast.error('Please select a rating');
    setLoading(true);
    try {
      await productsApi.addReview(slug, {
        rating: form.rating,
        comment: form.comment,
        authorName: form.name,
        authorEmail: form.email,
      });
      toast.success('Review submitted!');
      setForm({ name: '', email: '', rating: 0, comment: '' });
      onSuccess?.();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <h3 className="font-heading text-lg font-semibold text-primary">Leave a Review</h3>

      {/* Star Rating */}
      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Your Rating <span className="text-red-400">*</span>
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setForm({ ...form, rating: star })}
              className="text-2xl transition-colors"
            >
              <FiStar
                className={
                  star <= (hover || form.rating)
                    ? 'fill-accent text-accent'
                    : 'text-gray-300'
                }
                size={24}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="form-input"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="form-input"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1.5">
          Your Review <span className="text-red-400">*</span>
        </label>
        <textarea
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          rows={4}
          className="form-input resize-none"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary disabled:opacity-70"
      >
        {loading ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
}
