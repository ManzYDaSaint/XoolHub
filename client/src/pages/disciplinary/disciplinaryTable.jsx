import React, { useState, useEffect } from 'react';
import UniversalTable from '../../components/table.jsx';
import { Search, Filter, Download, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

const DisciplinaryTable = ({ disciplinaryData, loading }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    status: '',
    severity: '',
    dateRange: ''
  });

  useEffect(() => {
    setFilteredData(disciplinaryData);
  }, [disciplinaryData]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);
    
    let filtered = [...disciplinaryData];
    
    // Apply search filter
    if (newFilters.search) {
      filtered = filtered.filter(item => 
        item.studentName.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        item.category.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        item.action.toLowerCase().includes(newFilters.search.toLowerCase())
      );
    }
    
    // Apply category filter
    if (newFilters.category) {
      filtered = filtered.filter(item => item.category === newFilters.category);
    }
    
    // Apply status filter
    if (newFilters.status) {
      filtered = filtered.filter(item => item.status === newFilters.status);
    }
    
    // Apply severity filter
    if (newFilters.severity) {
      filtered = filtered.filter(item => item.severity === newFilters.severity);
    }
    
         // Apply date range filter
     if (newFilters.dateRange) {
       const today = new Date();
       // const filterDate = new Date(); // Removed unused variable
      
      switch (newFilters.dateRange) {
        case 'today':
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate.toDateString() === today.toDateString();
          });
          break;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= weekAgo;
          });
          break;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(item => {
            const itemDate = new Date(item.date);
            return itemDate >= monthAgo;
          });
          break;
        default:
          break;
      }
    }
    
    setFilteredData(filtered);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'under investigation':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'closed':
        return <CheckCircle className="h-4 w-4 text-gray-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under investigation':
        return 'bg-orange-100 text-orange-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const disciplinaryColumns = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'studentName', label: 'Student Name', width: '15%' },
    { key: 'studentClass', label: 'Class', width: '10%' },
    { key: 'category', label: 'Category', width: '15%' },
    { key: 'action', label: 'Action Taken', width: '15%' },
    { key: 'date', label: 'Date', width: '10%' },
    { key: 'severity', label: 'Severity', width: '10%' },
    { key: 'status', label: 'Status', width: '10%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];

  const enhancedData = filteredData.map(item => ({
    ...item,
    severity: (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(item.severity)}`}>
        {item.severity}
      </span>
    ),
    status: (
      <div className="flex items-center space-x-2">
        {getStatusIcon(item.status)}
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
          {item.status}
        </span>
      </div>
    )
  }));

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading disciplinary records...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Filters Section */}
      <div className="p-6 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-500" />
            <h3 className="text-lg font-medium text-gray-900">Filters</h3>
          </div>
          
          <div className="flex flex-wrap items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search records..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              <option value="Academic Misconduct">Academic Misconduct</option>
              <option value="Behavioral Issues">Behavioral Issues</option>
              <option value="Bullying">Bullying</option>
              <option value="Dress Code Violation">Dress Code Violation</option>
              <option value="Fighting">Fighting</option>
              <option value="Late Arrival">Late Arrival</option>
              <option value="Property Damage">Property Damage</option>
              <option value="Substance Abuse">Substance Abuse</option>
              <option value="Truancy">Truancy</option>
              <option value="other">other</option>
            </select>
            
            {/* Status Filter */}
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="pending">pending</option>
              <option value="under investigation">under investigation</option>
              <option value="resolved">resolved</option>
              <option value="closed">closed</option>
            </select>
            
            {/* Severity Filter */}
            <select
              value={filters.severity}
              onChange={(e) => handleFilterChange('severity', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Severities</option>
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
              <option value="critical">critical</option>
            </select>
            
            {/* Date Range Filter */}
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {filteredData.length} of {disciplinaryData.length} records
          </p>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setFilters({
                  search: '',
                  category: '',
                  status: '',
                  severity: '',
                  dateRange: ''
                });
                setFilteredData(disciplinaryData);
              }}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              Clear Filters
            </button>
            
            <button
              onClick={() => {
                // Export functionality would go here
              }}
              className="px-4 py-2 text-sm bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {enhancedData.length === 0 ? (
          <div className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No disciplinary records found</p>
            <p className="text-gray-500 text-sm mt-2">
              {disciplinaryData.length === 0 
                ? "No records have been added yet." 
                : "Try adjusting your filters to see more results."
              }
            </p>
          </div>
        ) : (
          <UniversalTable 
            columns={disciplinaryColumns} 
            data={enhancedData}
          />
        )}
      </div>
    </div>
  );
};

export default DisciplinaryTable;
