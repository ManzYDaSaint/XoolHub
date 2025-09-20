import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye,  
  BarChart3,
  Download,
  Target,
  Award
} from 'lucide-react';
import api from '../../../services/apiServices';
import toast from 'react-hot-toast';

const PilotProgramDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalApplications: 0,
    approvedApplications: 0,
    activePrograms: 0,
    totalRevenue: 0,
    conversionRate: 0,
    averagePaymentTime: 0
  });
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    schoolSize: 'all'
  });

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      const [applicationsRes, programsRes] = await Promise.all([
        api.getPilotApplications(),
        api.getPilotPrograms()
      ]);

      if (applicationsRes.data.success) {
        setApplications(applicationsRes.data.data);
      }
      console.log("Applications: ", applicationsRes.data.data);

      if (programsRes.data.success) {
        setPrograms(programsRes.data.data);
        calculateAnalytics(applicationsRes.data.data, programsRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const calculateAnalytics = (apps, progs) => {
    const totalApps = apps.length;
    const approvedApps = apps.filter(app => app.application_status === 'approved').length;
    const activeProgs = progs.filter(prog => prog.status === 'active').length;
    
    const totalRevenue = progs.reduce((sum, prog) => {
      return sum + (prog.initial_payment_amount || 0);
    }, 0);

    const conversionRate = totalApps > 0 ? (approvedApps / totalApps) * 100 : 0;

    setAnalytics({
      totalApplications: totalApps,
      approvedApplications: approvedApps,
      activePrograms: activeProgs,
      totalRevenue,
      conversionRate: Math.round(conversionRate),
      averagePaymentTime: 2.5 // This would be calculated from actual data
    });
  };

  const handleApplicationAction = async (applicationId, action, notes = '') => {
    try {
      const response = await api.updatePilotApplicationStatus(applicationId, {
        status: action,
        adminNotes: notes
      });

      if (response.data.success) {
        toast.success(`Application ${action} successfully`);
        fetchDashboardData();
        
        // Send notification email
        await sendNotificationEmail(applicationId, action);
      } else {
        toast.error(`failed to ${action} application`);
      }
    } catch (error) {
      console.error('Error updating application:', error);
      toast.error('failed to update application');
    }
  };

  const sendNotificationEmail = async (applicationId, action) => {
    try {
      // This would integrate with your email service
      const application = applications.find(app => app.id === applicationId);
      const emailData = {
        to: 'admin@xoolhub.com',
        subject: `Pilot Program Application ${action.charAt(0).toUpperCase() + action.slice(1)}`,
        template: 'pilot-application-update',
        data: {
          application,
          action,
          timestamp: new Date().toISOString()
        }
      };
      
      // You would call your email service here
      console.log('Email notification sent:', emailData);
    } catch (error) {
      console.error('Error sending notification email:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'active': return 'text-blue-600 bg-blue-100';
      case 'expired': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredApplications = applications.filter(app => {
    if (filters.status !== 'all' && app.application_status !== filters.status) return false;
    if (filters.schoolSize !== 'all' && app.school_size !== filters.schoolSize) return false;
    return true;
  });

  const filteredPrograms = programs.filter(prog => {
    if (filters.status !== 'all' && prog.status !== filters.status) return false;
    return true;
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Pilot Program Dashboard</h1>
        <p className="text-gray-600">Manage pilot program applications, schools, and analytics</p>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.totalApplications}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">active Programs</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.activePrograms}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">MK {formatPrice(analytics.totalRevenue)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900">{analytics.conversionRate}%</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'applications', label: 'Applications', icon: Users },
              { id: 'programs', label: 'active Programs', icon: CheckCircle },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <OverviewTab 
              analytics={analytics} 
              applications={applications} 
              programs={programs}
              formatPrice={formatPrice}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
            />
          )}

          {/* Applications Tab */}
          {selectedTab === 'applications' && (
            <ApplicationsTab 
              applications={filteredApplications}
              onApplicationAction={handleApplicationAction}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          )}

          {/* Programs Tab */}
          {selectedTab === 'programs' && (
            <ProgramsTab 
              programs={filteredPrograms}
              formatPrice={formatPrice}
              formatDate={formatDate}
              getStatusColor={getStatusColor}
            />
          )}

          {/* Analytics Tab */}
          {selectedTab === 'analytics' && (
            <AnalyticsTab 
              analytics={analytics}
              applications={applications}
              programs={programs}
              formatPrice={formatPrice}
              formatDate={formatDate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ analytics, applications, programs, formatPrice, formatDate, getStatusColor }) => {
  const recentApplications = applications.slice(0, 5);
  const recentPrograms = programs.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">pending applications</p>
              <p className="text-3xl font-bold">
                {applications.filter(app => app.application_status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">This Month Revenue</p>
              <p className="text-3xl font-bold">MK {formatPrice(analytics.totalRevenue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Success Rate</p>
              <p className="text-3xl font-bold">{analytics.conversionRate}%</p>
            </div>
            <Target className="h-8 w-8 text-purple-200" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
          <div className="space-y-3">
            {recentApplications.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div> 
                  <p className="font-medium text-gray-900">{app.school_name}</p>
                  <p className="text-sm text-gray-600">{formatDate(app.applied_at)}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.application_status)}`}>
                  {app.application_status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Programs</h3>
          <div className="space-y-3">
            {recentPrograms.map((program) => (
              <div key={program.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{program.school_name}</p>
                  <p className="text-sm text-gray-600">{program.pilot_plan_name}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">MK {formatPrice(program.initial_payment_amount)}</p>
                  <p className="text-xs text-gray-600">{formatDate(program.start_date)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Applications Tab Component
const ApplicationsTab = ({ applications, onApplicationAction, formatDate, getStatusColor, filters, onFilterChange }) => {
  const [selectedApp, setSelectedApp] = useState(null);

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <select 
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Status</option>
          <option value="pending">pending</option>
          <option value="approved">approved</option>
          <option value="rejected">rejected</option>
        </select>
        <select 
          value={filters.schoolSize}
          onChange={(e) => onFilterChange('schoolSize', e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Sizes</option>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Download className="h-4 w-4 mr-2 inline" />
          Export
        </button>
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  applied
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{app.school_name}</div>
                      <div className="text-sm text-gray-500">{app.current_system || 'No current system'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{app.contact_email}</div>
                      <div className="text-sm text-gray-500">{app.contact_phone || 'No phone'}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                      {app.school_size}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {app.preferred_plan_name || 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(app.applied_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(app.application_status)}`}>
                      {app.application_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      {app.application_status === 'pending' && (
                        <>
                          <button
                            onClick={() => onApplicationAction(app.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => onApplicationAction(app.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Application Detail Modal */}
      {selectedApp && (
        <ApplicationDetailModal 
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onAction={onApplicationAction}
        />
      )}
    </div>
  );
};

// Programs Tab Component
const ProgramsTab = ({ programs, formatPrice, formatDate, getStatusColor }) => {
  return (
    <div className="space-y-6">
      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {programs.map((program) => (
          <div key={program.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{program.school_name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(program.status)}`}>
                {program.status}
              </span>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Plan:</span>
                <span className="text-sm font-medium text-gray-900">{program.pilot_plan_name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Initial Payment:</span>
                <span className="text-sm font-medium text-gray-900">MK {formatPrice(program.initial_payment_amount)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Start Date:</span>
                <span className="text-sm font-medium text-gray-900">{formatDate(program.start_date)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">End Date:</span>
                <span className="text-sm font-medium text-gray-900">{formatDate(program.end_date)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Savings:</span>
                <span className="text-sm font-medium text-green-600">MK {formatPrice(program.total_savings)}</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  View Details
                </button>
                <button className="flex-1 px-3 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                  Manage
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab = ({ analytics, applications, programs, formatPrice, formatDate }) => {

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Applications</p>
              <p className="text-3xl font-bold">{analytics.totalApplications}</p>
            </div>
            <Users className="h-8 w-8 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Approval Rate</p>
              <p className="text-3xl font-bold">{analytics.conversionRate}%</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Total Revenue</p>
              <p className="text-3xl font-bold">MK {formatPrice(analytics.totalRevenue)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 rounded-xl text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">active Programs</p>
              <p className="text-3xl font-bold">{analytics.activePrograms}</p>
            </div>
            <Award className="h-8 w-8 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Applications Over Time</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart will be implemented here</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <p className="text-gray-500">Chart will be implemented here</p>
          </div>
        </div>
      </div>

      {/* School Size Distribution */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">School Size Distribution</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['small', 'medium', 'large'].map((size) => {
            const count = applications.filter(app => app.school_size === size).length;
            const percentage = applications.length > 0 ? (count / applications.length) * 100 : 0;
            
            return (
              <div key={size} className="text-center">
                <div className="text-3xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600 capitalize">{size} Schools</div>
                <div className="text-xs text-gray-500">{Math.round(percentage)}%</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Application Detail Modal Component
const ApplicationDetailModal = ({ application, onClose, onAction }) => {
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Application Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <XCircle className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">School Name</label>
              <p className="text-sm text-gray-900">{application.school_name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Email</label>
              <p className="text-sm text-gray-900">{application.contact_email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Contact Phone</label>
              <p className="text-sm text-gray-900">{application.contact_phone || 'Not provided'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">School Size</label>
              <p className="text-sm text-gray-900 capitalize">{application.school_size}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Expected Students</label>
              <p className="text-sm text-gray-900">{application.expected_students || 'Not specified'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current System</label>
              <p className="text-sm text-gray-900">{application.current_system || 'None'}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Motivation</label>
            <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{application.motivation}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Admin Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Add notes for this application..."
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            onClick={() => onAction(application.id, 'approved', notes)}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => onAction(application.id, 'rejected', notes)}
            className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          >
            Reject
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PilotProgramDashboard;
