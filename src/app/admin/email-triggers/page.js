'use client';
import { useEffect, useState } from 'react';
import { adminEmailTriggersApi, imageUploadApi } from '@/lib/adminApi';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2, FiSave, FiX, FiSend, FiMail, FiUpload } from 'react-icons/fi';

export default function EmailTriggersManagement() {
  const [triggers, setTriggers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [testEmailDialog, setTestEmailDialog] = useState(null);
  const [testEmail, setTestEmail] = useState('');
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    fetchTriggers();
  }, []);

  const fetchTriggers = async () => {
    try {
      setLoading(true);
      const response = await adminEmailTriggersApi.getAll({ status: null });
      if (response.data.success) {
        setTriggers(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load email triggers');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (trigger) => {
    setEditingId(trigger._id);
    setEditFormData({
      name: trigger.name,
      type: trigger.type,
      subject: trigger.subject,
      plainTextContent: trigger.plainTextContent,
      headerImageUrl: trigger.headerImageUrl || '',
      footerImageUrl: trigger.footerImageUrl || '',
      recipientFilter: trigger.recipientFilter,
      recentDays: trigger.recentDays,
      inactiveDays: trigger.inactiveDays,
      status: trigger.status,
      recurringTime: trigger.recurringTime,
    });
    setShowForm(true);
  };

  const handleNewTrigger = () => {
    setEditingId(null);
    setEditFormData({
      name: '',
      type: 'immediate',
      subject: '',
      plainTextContent: '',
      headerImageUrl: '',
      footerImageUrl: '',
      recipientFilter: 'all',
      recentDays: 30,
      inactiveDays: 90,
      status: 'draft',
      recurringTime: '09:00',
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditFormData({});
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    try {
      if (!editFormData.name || !editFormData.subject || !editFormData.plainTextContent) {
        toast.error('Name, subject, and content are required');
        return;
      }

      if (editingId) {
        const response = await adminEmailTriggersApi.update(editingId, editFormData);
        if (response.data.success) {
          toast.success('Email trigger updated successfully');
          setEditingId(null);
          setShowForm(false);
          fetchTriggers();
        }
      } else {
        const response = await adminEmailTriggersApi.create(editFormData);
        if (response.data.success) {
          toast.success('Email trigger created successfully');
          setShowForm(false);
          fetchTriggers();
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save trigger');
    }
  };

  const handleDelete = async (triggerId) => {
    if (confirm('Are you sure you want to delete this trigger?')) {
      try {
        const response = await adminEmailTriggersApi.delete(triggerId);
        if (response.data.success) {
          toast.success('Email trigger deleted successfully');
          fetchTriggers();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete trigger');
      }
    }
  };

  const handleSendNow = async (triggerId) => {
    if (confirm('Send this promotional email to all matching subscribers?')) {
      try {
        const response = await adminEmailTriggersApi.sendNow(triggerId);
        if (response.data.success) {
          toast.success(`Email sent to ${response.data.data.recipientCount} subscribers`);
          fetchTriggers();
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to send email');
      }
    }
  };

  const handleTestEmail = async (triggerId) => {
    if (!testEmail) {
      toast.error('Please enter a test email address');
      return;
    }

    try {
      const response = await adminEmailTriggersApi.testEmail(triggerId, testEmail);
      if (response.data.success) {
        toast.success(`Test email sent to ${testEmail}`);
        setTestEmailDialog(null);
        setTestEmail('');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send test email');
    }
  };

  const handleImageUpload = async (e, type) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image must be less than 5MB');
        return;
      }

      toast.loading('Uploading image...');
      const response = await imageUploadApi.uploadBanner(file, type);
      
      if (response.data.success) {
        setEditFormData((prev) => ({
          ...prev,
          [type === 'header' ? 'headerImageUrl' : 'footerImageUrl']: response.data.data.url,
        }));
        toast.dismiss();
        toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} image uploaded successfully`);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || `Failed to upload ${type} image`);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center text-gray-500">Loading email triggers...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Promotional Campaigns</h1>
          <p className="text-gray-600">Create and manage special promotional email campaigns</p>
        </div>
        <button
          onClick={handleNewTrigger}
          className="px-4 py-2 bg-accent-dark text-white rounded-md hover:bg-accent transition flex items-center gap-2"
        >
          <FiMail size={18} /> New Campaign
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="mb-8 bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingId ? 'Edit Campaign' : 'Create New Campaign'}
            </h3>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name *</label>
              <input
                type="text"
                name="name"
                value={editFormData.name || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#721121] focus:border-[#721121]"
                placeholder="e.g., Summer Sale 2026"
              />
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
              <select
                name="type"
                value={editFormData.type || 'immediate'}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#721121] focus:border-[#721121]"
              >
                <option value="immediate">Immediate (Send Now)</option>
                <option value="scheduled">Scheduled (Send at specific time)</option>
                <option value="recurring">Recurring (Daily/Weekly/Monthly)</option>
              </select>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
              <input
                type="text"
                name="subject"
                value={editFormData.subject || ''}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#721121] focus:border-[#721121]"
                placeholder="Email subject"
              />
            </div>

            {/* Banner Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Header Image</label>
              <div className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    name="headerImageUrl"
                    value={editFormData.headerImageUrl || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#721121] focus:border-[#721121]"
                    placeholder="URL to header image (optional)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Header image will be displayed at the top of the email</p>
                </div>
                <label className="mt-0">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'header')}
                    className="hidden"
                  />
                  <span className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer text-sm">
                    <FiUpload size={16} /> Upload
                  </span>
                </label>
              </div>
              {editFormData.headerImageUrl && (
                <div className="mt-3 p-2 bg-gray-100 rounded border border-gray-300">
                  <img src={editFormData.headerImageUrl} alt="Header preview" className="h-20 object-cover rounded mx-auto" />
                </div>
              )}
            </div>

            {/* Banner Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Footer Image</label>
              <div className="flex gap-3 items-start">
                <div className="flex-1">
                  <input
                    type="text"
                    name="footerImageUrl"
                    value={editFormData.footerImageUrl || ''}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#721121] focus:border-[#721121]"
                    placeholder="URL to footer image (optional)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Footer image will be displayed at the bottom of the email</p>
                </div>
                <label className="mt-0">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'footer')}
                    className="hidden"
                  />
                  <span className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition cursor-pointer text-sm">
                    <FiUpload size={16} /> Upload
                  </span>
                </label>
              </div>
              {editFormData.footerImageUrl && (
                <div className="mt-3 p-2 bg-gray-100 rounded border border-gray-300">
                  <img src={editFormData.footerImageUrl} alt="Footer preview" className="h-20 object-cover rounded mx-auto" />
                </div>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Content *</label>
              <textarea
                name="plainTextContent"
                value={editFormData.plainTextContent || ''}
                onChange={handleInputChange}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#721121] focus:border-[#721121] font-mono text-sm"
                placeholder="Write your promotional message here"
              />
            </div>

            {/* Recipient Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Send To</label>
              <select
                name="recipientFilter"
                value={editFormData.recipientFilter || 'all'}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#721121] focus:border-[#721121]"
              >
                <option value="all">All Subscribers</option>
                <option value="recent">Recent Subscribers (Last X days)</option>
                <option value="inactive">Inactive Subscribers (No email X days)</option>
              </select>
            </div>

            {editFormData.recipientFilter === 'recent' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Days (Recent)</label>
                <input
                  type="number"
                  name="recentDays"
                  value={editFormData.recentDays || 30}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#721121] focus:border-[#721121]"
                />
              </div>
            )}

            {editFormData.recipientFilter === 'inactive' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Days (Inactive)</label>
                <input
                  type="number"
                  name="inactiveDays"
                  value={editFormData.inactiveDays || 90}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#721121] focus:border-[#721121]"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-accent-dark text-white rounded-md hover:bg-accent transition"
              >
                <FiSave size={16} /> Save Campaign
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
              >
                <FiX size={16} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Triggers List */}
      {triggers.length === 0 ? (
        <div className="text-center text-gray-500 py-8">No promotional campaigns yet. Create one to get started!</div>
      ) : (
        <div className="space-y-4">
          {triggers.map((trigger) => (
            <div key={trigger._id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{trigger.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{trigger.subject}</p>
                  <p className="text-xs text-gray-500 mt-2">
                    Type: <span className="font-mono">{trigger.type}</span> | Filter: <span className="font-mono">{trigger.recipientFilter}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      trigger.status === 'sent'
                        ? 'bg-green-100 text-green-800'
                        : trigger.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-800'
                        : trigger.status === 'active'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {trigger.status}
                  </span>
                </div>
              </div>

              {/* Stats */}
              {trigger.sentCount > 0 && (
                <div className="mb-4 p-3 bg-gray-50 rounded text-sm">
                  <p>
                    Last sent: {new Date(trigger.lastSentAt).toLocaleDateString()} | Recipients:{' '}
                    {trigger.recipientCount} | Sent: {trigger.sentCount}
                  </p>
                </div>
              )}

              {/* Content Preview */}
              <div className="mb-4 p-3 bg-gray-50 rounded border border-gray-200 max-h-40 overflow-y-auto">
                <p className="text-xs font-semibold text-gray-700 mb-2">Content Preview:</p>
                <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap break-words">
                  {trigger.plainTextContent.substring(0, 200)}
                  {trigger.plainTextContent.length > 200 ? '...' : ''}
                </pre>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleEdit(trigger)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#a5402d] text-white rounded-md hover:bg-[#8b3422] text-sm transition"
                >
                  <FiEdit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => setTestEmailDialog(trigger._id)}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm transition"
                >
                  <FiMail size={14} /> Send Test
                </button>
                {trigger.status === 'draft' && (
                  <button
                    onClick={() => handleSendNow(trigger._id)}
                    className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 text-sm transition"
                  >
                    <FiSend size={14} /> Send Now
                  </button>
                )}
                <button
                  onClick={() => handleDelete(trigger._id)}
                  className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm transition"
                >
                  <FiTrash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Test Email Dialog */}
      {testEmailDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Send Test Email</h2>
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="test@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#721121] focus:border-[#721121] mb-4"
            />
            <div className="flex gap-2">
              <button
                onClick={() => handleTestEmail(testEmailDialog)}
                className="flex-1 px-4 py-2 bg-[#721121] text-white rounded-md hover:bg-[#5a0d1a] transition"
              >
                Send Test
              </button>
              <button
                onClick={() => {
                  setTestEmailDialog(null);
                  setTestEmail('');
                }}
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
