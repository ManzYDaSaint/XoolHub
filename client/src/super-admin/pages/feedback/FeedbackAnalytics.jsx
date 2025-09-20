import React, { useState, useEffect, useCallback } from "react";
import { 
  Star, 
  MessageSquare, 
  Filter,
  Download,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Reply,
  CheckCircle
} from "lucide-react";
import api from "../../../services/apiServices.jsx";
import FeedbackResponse from "./FeedbackResponse.jsx";

const FeedbackAnalytics = () => {
  const [feedback, setFeedback] = useState([]);
  const [analytics, setAnalytics] = useState({
    totalFeedback: 0,
    averageRating: 0,
    ratingDistribution: {},
    categoryDistribution: {},
    recentFeedback: [],
    trends: {}
  });
  const [filteredFeedback, setFilteredFeedback] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    rating: 'all',
    category: 'all'
  });
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);

  const applyFilters = useCallback(() => {
    let filtered = [...feedback];

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters.dateRange) {
        case '7days':
          filterDate.setDate(now.getDate() - 7);
          break;
        case '30days':
          filterDate.setDate(now.getDate() - 30);
          break;
        case '90days':
          filterDate.setDate(now.getDate() - 90);
          break;
        default:
          break;
      }
      
      if (filters.dateRange !== 'all') {
        filtered = filtered.filter(item => new Date(item.date) >= filterDate);
      }
    }

    // Rating filter
    if (filters.rating !== 'all') {
      filtered = filtered.filter(item => item.rating === filters.rating);
    }

    // Category filter
    if (filters.category !== 'all') {
      filtered = filtered.filter(item => (item.category || 'overall') === filters.category);
    }

    setFilteredFeedback(filtered);
  }, [feedback, filters]);

  const calculateAnalytics = useCallback((data) => {
    if (!data || data.length === 0) return;

    const totalFeedback = data.length;
    const totalRating = data.reduce((sum, item) => sum + (item.rating || 0), 0);
    const averageRating = totalRating / totalFeedback;

    // Rating distribution
    const ratingDistribution = data.reduce((acc, item) => {
      const rating = item.rating || 0;
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});

    // Category distribution (if category field exists)
    const categoryDistribution = data.reduce((acc, item) => {
      const category = item.category || 'overall';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    // Recent feedback (last 10)
    const recentFeedback = data
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 10);

    setAnalytics({
      totalFeedback,
      averageRating: Math.round(averageRating * 10) / 10,
      ratingDistribution,
      categoryDistribution,
      recentFeedback,
      trends: calculateTrends(data)
    });
  }, []);

  const fetchFeedbackData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getFeedback();
      const data = res.data.feedback;
      setFeedback(data);
      calculateAnalytics(data);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  }, [calculateAnalytics]);

  useEffect(() => {
    fetchFeedbackData(); 
  }, [fetchFeedbackData]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);


  const calculateTrends = (data) => {
    // Group by month for trend analysis
    const monthlyData = data.reduce((acc, item) => {
      const month = new Date(item.date).toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
      if (!acc[month]) {
        acc[month] = { count: 0, totalRating: 0 };
      }
      acc[month].count += 1;
      acc[month].totalRating += item.rating || 0;
      return acc;
    }, {});

    return monthlyData;
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600 bg-green-100';
    if (rating >= 3) return 'text-yellow-600 bg-yellow-100';
    if (rating >= 2) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      overall: '⭐',
      user_interface: '🎨',
      features: '⚙️',
      performance: '⚡',
      support: '🆘',
      security: '🔒',
      mobile: '📱',
      integration: '🔗'
    };
    return icons[category] || '⭐';
  };

  const getCategoryLabel = (category) => {
    const labels = {
      overall: 'Overall Experience',
      user_interface: 'User Interface',
      features: 'Features & Functionality',
      performance: 'Performance',
      support: 'Support & Help',
      security: 'Security & Privacy',
      mobile: 'Mobile Experience',
      integration: 'Integration'
    };
    return labels[category] || 'Overall Experience';
  };

  const handleResponseSent = (responseData) => {
    // Update the feedback item to show it has been responded to
    setFeedback(prevFeedback => 
      prevFeedback.map(item => 
        item.id === selectedFeedback.id 
          ? { ...item, hasResponse: true, responseDate: responseData.timestamp }
          : item
      )
    );
    setShowResponseModal(false);
    setSelectedFeedback(null);
  };

  const openResponseModal = (feedbackItem) => {
    setSelectedFeedback(feedbackItem);
    setShowResponseModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Feedback Analytics</h2>
          <p className="text-gray-600">Comprehensive insights into school feedback</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            <Download size={16} className="mr-2" />
            Export Data
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Feedback</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.totalFeedback}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{analytics.averageRating}/5</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <ThumbsUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Positive (4-5★)</p>
              <p className="text-2xl font-bold text-gray-900">
                {((analytics.ratingDistribution[4] || 0) + (analytics.ratingDistribution[5] || 0))}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <ThumbsDown className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Needs Improvement (1-2★)</p>
              <p className="text-2xl font-bold text-gray-900">
                {((analytics.ratingDistribution[1] || 0) + (analytics.ratingDistribution[2] || 0))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Filter size={16} className="text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filters.dateRange}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Time</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>

          <select
            value={filters.rating}
            onChange={(e) => setFilters({...filters, rating: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({...filters, category: e.target.value})}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="overall">Overall Experience</option>
            <option value="user_interface">User Interface</option>
            <option value="features">Features & Functionality</option>
            <option value="performance">Performance</option>
            <option value="support">Support & Help</option>
            <option value="security">Security & Privacy</option>
            <option value="mobile">Mobile Experience</option>
            <option value="integration">Integration</option>
          </select>
        </div>
      </div>

      {/* Rating Distribution Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h3>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = analytics.ratingDistribution[rating] || 0;
            const percentage = analytics.totalFeedback > 0 ? (count / analytics.totalFeedback) * 100 : 0;
            return (
              <div key={rating} className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 w-20">
                  <span className="text-sm font-medium text-gray-700">{rating}★</span>
                  <span className="text-sm text-gray-500">({count})</span>
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      rating >= 4 ? 'bg-green-500' : rating >= 3 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-12 text-right">{Math.round(percentage)}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Feedback</h3>
        <div className="space-y-4">
          {analytics.recentFeedback.slice(0, 5).map((item, index) => (
            <div key={index} className="border-l-4 border-indigo-200 pl-4 py-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{getCategoryIcon(item.category || 'overall')}</span>
                    <span className="text-sm font-medium text-gray-700">
                      {getCategoryLabel(item.category || 'overall')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(item.rating)}`}>
                      {item.rating}★
                    </span>
                  </div>
                  {item.commenti && (
                    <p className="text-sm text-gray-600 line-clamp-2">{item.commenti}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {item.name} • {new Date(item.date).toLocaleDateString()}
                  </p>
                </div>
                <button className="ml-4 p-1 text-gray-400 hover:text-gray-600">
                  <Eye size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Feedback Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          All Feedback ({filteredFeedback.length})
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Experience
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Comment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredFeedback.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <span>{getCategoryIcon(item.category || 'overall')}</span>
                      <span>{getCategoryLabel(item.category || 'overall')}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColor(item.rating)}`}>
                      {item.rating}★
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.optioni}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                    {item.commenti || 'No comment'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => openResponseModal(item)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Respond to feedback"
                      >
                        <Reply size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Eye size={16} />
                      </button>
                      {item.hasResponse && (
                        <span className="text-green-600" title="Response sent">
                          <CheckCircle size={16} />
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Response Modal */}
      {showResponseModal && selectedFeedback && (
        <FeedbackResponse
          feedback={selectedFeedback}
          onResponseSent={handleResponseSent}
          onClose={() => {
            setShowResponseModal(false);
            setSelectedFeedback(null);
          }}
        />
      )}
    </div>
  );
};

export default FeedbackAnalytics;
