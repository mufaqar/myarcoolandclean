'use client';
import { useEffect, useState, useMemo } from 'react';
import { analyticsApi } from '@/lib/adminApi';
import toast from 'react-hot-toast';
import {
  FiPackage,
  FiFolder,
  FiMail,
  FiUsers,
  FiTrendingUp,
  FiAlertCircle,
  FiActivity,
  FiBarChart2,
} from 'react-icons/fi';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from 'recharts';
import Link from 'next/link';

const COLORS = ['#4a5f7f', '#1a1a1a', '#f9fafb', '#2d3748'];

// Custom tooltip component for better UX
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-sm text-gray-600">
          {payload[0].name}: <span className="font-bold">{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 1.5 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutProgress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
};

// Metric Card with Icon & Trend
const MetricCard = ({ icon: Icon, label, value, trend, color, trendColor }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div
          className="p-3 rounded-xl"
          style={{ backgroundColor: `${color}15`, color }}
        >
          <Icon size={22} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-semibold ${trendColor}`}>
            <FiTrendingUp size={12} />
            <span>{trend}%</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-gray-500 text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-800">
          <AnimatedCounter value={value} />
        </p>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await analyticsApi.getDashboard();
      if (response.data.success) {
        setStats(response.data.stats);
      } else {
        throw new Error('Invalid API response');
      }
    } catch (err) {
      toast.error('Failed to load dashboard stats');
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Generate mock chart data if real data is missing
  const lineChartData = useMemo(() => {
    if (stats?.salesByMonth && stats.salesByMonth.length > 0) {
      return stats.salesByMonth.map(m => ({
        name: m.month,
        products: m.productCount || 0,
        inquiries: m.inquiryCount || 0
      }));
    }
    return [];
  }, [stats]);

  const pieChartData = useMemo(() => {
    if (stats?.inquiryStatus && stats.inquiryStatus.length > 0) {
      return stats.inquiryStatus.map(s => ({
        name: s.status.charAt(0).toUpperCase() + s.status.slice(1),
        value: s.count
      }));
    }
    return [];
  }, [stats]);

  const categoryData = useMemo(() => {
    if (stats?.productsByCategory && stats.productsByCategory.length > 0) {
      return stats.productsByCategory.map(cat => ({
        name: cat.name || cat.category,
        count: cat.count
      })).slice(0, 5);
    }
    return [];
  }, [stats]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center space-y-4">
          <div className="relative w-16 h-16 mx-auto">
            <div className="absolute inset-0 border-4 border-[#4a5f7f]/30 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-[#4a5f7f] rounded-full animate-spin"></div>
          </div>
          <p className="text-gray-600 text-sm font-medium">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="max-w-md text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <FiAlertCircle className="text-red-600" size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">Something went wrong</h3>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#4a5f7f] text-white rounded-lg hover:bg-[#2d3748] transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <MetricCard
          icon={FiPackage}
          label="Total Products"
          value={stats?.totalProducts || 0}
          color="#3b82f6"
          trend={12}
          trendColor="text-green-600"
        />
        <MetricCard
          icon={FiFolder}
          label="Categories"
          value={stats?.totalCategories || 0}
          color="#10b981"
          colorHex="#10b981"
        />
        <MetricCard
          icon={FiMail}
          label="Inquiries"
          value={stats?.totalInquiries || 0}
          color="#f59e0b"
          trend={8}
          trendColor="text-green-600"
        />
        <MetricCard
          icon={FiUsers}
          label="Subscribers"
          value={stats?.totalSubscribers || 0}
          color="#8b5cf6"
          trend={15}
          trendColor="text-green-600"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        
        {/* Products & Inquiries Over Time */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
              <FiActivity className="text-[#4a5f7f]" />
              Performance Trends
            </h2>
            <select className="px-3 py-1 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:border-[#d4a574]">
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-64 md:h-72">
            {lineChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4a5f7f" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#4a5f7f" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInquiries" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1a1a2e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#1a1a2e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ paddingTop: '10px' }} />
                  <Area
                    type="monotone"
                    dataKey="products"
                    name="Products Added"
                    stroke="#4a5f7f"
                    strokeWidth={2}
                    fill="url(#colorProducts)"
                  />
                  <Area
                    type="monotone"
                    dataKey="inquiries"
                    name="Inquiries Received"
                    stroke="#1a1a2e"
                    strokeWidth={2}
                    fill="url(#colorInquiries)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>No data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Inquiry Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
              <FiMail className="text-[#F58A07]" />
              Inquiry Status
            </h2>
          </div>
          <div className="h-64 md:h-72">
            {pieChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36}
                    iconType="circle"
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>No data available</p>
              </div>
            )}
          </div>
          {pieChartData.length > 0 && (
            <div className="mt-4 grid grid-cols-3 gap-2 md:gap-4">
              {pieChartData.slice(0, 3).map((item, idx) => (
                <div key={item.name} className="text-center">
                  <p className="text-lg md:text-2xl font-bold text-gray-800">{item.value}</p>
                  <p className="text-xs md:text-sm text-gray-500">{item.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-6">
          <h2 className="text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
            <FiFolder className="text-[#d4a574]" />
            Top Product Categories
          </h2>
          <Link href="/admin/categories" className="text-sm text-[#d4a574] hover:text-[#1a1a2e] font-medium whitespace-nowrap">
            View All →
          </Link>
        </div>
        <div className="h-64 md:h-72 mb-4">
          {categoryData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} layout="vertical" margin={{ top: 10, right: 30, left: 10, bottom: 5 }}>
                <XAxis 
                  type="number" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#374151', fontSize: 12, fontWeight: 500 }}
                  width={90}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
                <Bar
                  dataKey="count"
                  fill="#084887"
                  radius={[0, 4, 4, 0]}
                  barSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p className="text-sm">No data available</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Inquiries & Low Stock Alert */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Recent Inquiries List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 mb-4">
            <h2 className="text-base md:text-lg font-bold text-gray-800">Recent Inquiries</h2>
            <Link href="/admin/inquiries" className="text-sm text-[#d4a574] hover:text-[#1a1a2e] font-medium whitespace-nowrap">
              See All
            </Link>
          </div>
          {stats?.recentInquiries && stats.recentInquiries.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar">
              {stats.recentInquiries.map((inquiry) => (
                <div
                  key={inquiry._id}
                  className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 truncate text-sm md:text-base">{inquiry.name}</p>
                      <p className="text-xs md:text-sm text-gray-600 truncate">{inquiry.email}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(inquiry.createdAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <span
                      className={`ml-2 px-2.5 py-1 text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 ${
                        inquiry.status === 'responded'
                          ? 'bg-green-100 text-green-700'
                          : inquiry.status === 'viewed'
                          ? 'bg-blue-100 text-blue-700'
                          : inquiry.status === 'closed'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {(inquiry.status || 'pending').charAt(0).toUpperCase() + (inquiry.status || 'pending').slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-gray-500">
              <FiMail className="mx-auto mb-2 opacity-50" size={32} />
              <p className="text-sm">No inquiries yet</p>
            </div>
          )}
        </div>

        {/* Low Stock & Analytics Summary */}
        <div className="space-y-4 md:space-y-6">
          {stats?.lowStockProducts && stats.lowStockProducts.length > 0 && (
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 border-l-4 border-orange-400 p-4 md:p-5 rounded-lg shadow-sm">
              <div className="flex items-start gap-3">
                <FiAlertCircle className="text-orange-600 mt-0.5 flex-shrink-0" size={20} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm md:text-base font-bold text-orange-800">Low Stock Alert</h3>
                  <p className="text-orange-700 text-xs md:text-sm mt-1">
                    {stats.lowStockProducts.length} product{' '}
                    {stats.lowStockProducts.length > 1 ? 's need restocking' : 'needs restocking'}
                  </p>
                  <div className="mt-3 space-y-2 max-h-24 overflow-y-auto">
                    {stats.lowStockProducts.slice(0, 3).map((product) => (
                      <div key={product._id} className="text-xs bg-white/50 rounded px-2 py-1">
                        <span className="font-medium">{product.name}</span> — <span className="text-orange-600">{product.stock} left</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
            <h3 className="text-sm md:text-base font-bold text-gray-800 mb-4">Quick Overview</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-gray-600">Success Rate</span>
                <span className="font-bold text-[#F58A07] text-sm md:text-base">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#F58A07] h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-gray-600">Response Time</span>
                <span className="font-bold text-[#084887] text-sm md:text-base">2.4 hrs</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#084887] h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs md:text-sm text-gray-600">Inventory Health</span>
                <span className="font-bold text-[#909CC2] text-sm md:text-base">Good</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-[#909CC2] h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}