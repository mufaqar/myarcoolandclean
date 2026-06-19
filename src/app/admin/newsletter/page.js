'use client';
import { useEffect, useState } from 'react';
import { adminNewsletterApi } from '@/lib/adminApi';
import toast from 'react-hot-toast';
import { FiTrash2, FiDownload } from 'react-icons/fi';

export default function NewsletterManagement() {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchSubscribers();
  }, [page]);

  const fetchSubscribers = async () => {
    try {
      setLoading(true);
      const response = await adminNewsletterApi.getAll({
        page,
        limit: 20,
      });
      if (response.data.success) {
        setSubscribers(response.data.data);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error) {
      toast.error('Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this subscriber?')) {
      try {
        await adminNewsletterApi.delete(id);
        toast.success('Subscriber deleted successfully');
        fetchSubscribers();
      } catch (error) {
        toast.error('Failed to delete subscriber');
      }
    }
  };

  const handleExport = () => {
    const csv = subscribers
      .map((sub) => `${sub.email},${new Date(sub.createdAt).toLocaleDateString()}`)
      .join('\n');
    const blob = new Blob(['Email,Subscribed Date\n' + csv], {
      type: 'text/csv',
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
    toast.success('Subscribers exported as CSV');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Newsletter Subscribers</h1>
          <p className="text-gray-600 mt-1">
            Total subscribers: <span className="font-bold">{subscribers.length}</span>
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center space-x-2 bg-accent-dark hover:bg-accent-light text-white px-4 py-2 rounded-lg transition"
        >
          <FiDownload />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4a5f7f]"></div>
          </div>
        ) : subscribers.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Subscribed Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {subscribers.map((subscriber) => (
                    <tr key={subscriber._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        {subscriber.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(subscriber.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => handleDelete(subscriber._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t flex items-center justify-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setPage(pageNum)}
                  className={`px-3 py-1 rounded ${
                    page === pageNum
                      ? 'bg-accent-dark text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-600">No subscribers found</div>
        )}
      </div>
    </div>
  );
}
