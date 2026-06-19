'use client';
import { useEffect, useState } from 'react';
import { analyticsApi } from '@/lib/adminApi';
import toast from 'react-hot-toast';
import { FiBarChart2, FiTrendingUp } from 'react-icons/fi';

export default function AnalyticsPage() {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [productStats, setProductStats] = useState(null);
  const [inquiryStats, setInquiryStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [dashboard, products, inquiries] = await Promise.all([
        analyticsApi.getDashboard(),
        analyticsApi.getProducts(),
        analyticsApi.getInquiries(),
      ]);

      if (dashboard.data.success) setDashboardStats(dashboard.data.stats);
      if (products.data.success) setProductStats(products.data.stats);
      if (inquiries.data.success) setInquiryStats(inquiries.data.stats);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#084887]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 overflow-hidden max-h-full">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
          <FiBarChart2 size={32} />
          Analytics & Reports
        </h1>
        <p className="text-gray-600 mt-2">Comprehensive business analytics and insights</p>
      </div>

      {/* Product Stats */}
      {productStats && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Product Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm mb-1">Featured Products</p>
              <p className="text-2xl font-bold text-blue-600">{productStats.featured}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm mb-1">Editor's Choice</p>
              <p className="text-2xl font-bold text-purple-600">{productStats.editorChoice}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm mb-1">New Arrivals</p>
              <p className="text-2xl font-bold text-green-600">{productStats.newArrival}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm mb-1">Low Stock</p>
              <p className="text-2xl font-bold text-red-600">{productStats.lowStock}</p>
            </div>
          </div>
        </div>
      )}

      {/* Inquiry Stats */}
      {inquiryStats && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Inquiries by Status</h2>
            <div className="space-y-3">
              {inquiryStats.byStatus?.map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize font-medium">
                    {item._id || 'Unknown'}
                  </span>
                  <span className="text-lg font-bold text-[#d4a574]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Inquiries by Category</h2>
            <div className="space-y-3">
              {inquiryStats.byCategory?.map((item) => (
                <div key={item._id} className="flex items-center justify-between">
                  <span className="text-gray-700 capitalize font-medium">
                    {item._id || 'General'}
                  </span>
                  <span className="text-lg font-bold text-[#d4a574]">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Monthly Trend */}
      {dashboardStats?.monthlyTrend && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiTrendingUp />
            Monthly Inquiry Trend
          </h2>
          <div className="space-y-3">
            {dashboardStats.monthlyTrend.map((item) => (
              <div key={item._id} className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">{item._id}</span>
                <div className="flex items-center gap-3">
                  <div className="w-40 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#d4a574] h-2 rounded-full"
                      style={{
                        width: `${
                          (item.count /
                            Math.max(
                              ...dashboardStats.monthlyTrend.map((t) => t.count)
                            )) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="font-bold text-gray-800 min-w-12">
                    {item.count}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
