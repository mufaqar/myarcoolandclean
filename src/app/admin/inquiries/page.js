'use client';
import { useEffect, useState } from 'react';
import { adminInquiriesApi } from '@/lib/adminApi';
import toast from 'react-hot-toast';
import { FiTrash2, FiEye } from 'react-icons/fi';

export default function InquiriesManagement() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchInquiries();
  }, [page, status]);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const response = await adminInquiriesApi.getAll({
        page,
        limit: 10,
      });
      if (response.data.success) {
        setInquiries(response.data.data);
        setTotalPages(response.data.pagination.pages);
      }
    } catch (error) {
      toast.error('Failed to load inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await adminInquiriesApi.update(id, { status: newStatus });
      toast.success('Status updated successfully');
      fetchInquiries();
        setSelectedInquiry(null);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      try {
        await adminInquiriesApi.delete(id);
        toast.success('Inquiry deleted successfully');
        fetchInquiries();
      } catch (error) {
        toast.error('Failed to delete inquiry');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Customer Inquiries</h1>
        <p className="text-gray-600 mt-1">Manage customer inquiries and quotes</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#084887]"></div>
          </div>
        ) : inquiries.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {inquiries.map((inquiry) => (
                    <tr key={inquiry._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-800">
                        {inquiry.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{inquiry.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {inquiry.category || 'General'}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full font-medium ${
                            inquiry.status === 'resolved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {inquiry.status || 'pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm flex items-center gap-2">
                        <button
                          onClick={() => setSelectedInquiry(inquiry)}
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEye size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(inquiry._id)}
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
                      ? 'bg-[#d4a574] text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-8 text-gray-600">No inquiries found</div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="sticky top-0 bg-gray-100 border-b px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">Inquiry Details</h2>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-600 hover:text-gray-800 text-2xl"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="text-lg font-medium text-gray-800">{selectedInquiry.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="text-lg font-medium text-gray-800">{selectedInquiry.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="text-lg font-medium text-gray-800">
                  {selectedInquiry.phone || 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <p className="text-lg font-medium text-gray-800">
                  {selectedInquiry.category || 'General'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Message</p>
                <p className="text-gray-800 whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <div className="flex gap-2">
                  {['pending', 'in-progress', 'resolved'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleUpdateStatus(selectedInquiry._id, st)}
                      className={`px-3 py-1 rounded text-sm font-medium transition ${
                        selectedInquiry.status === st
                          ? 'bg-[#084887] text-white'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition mt-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
