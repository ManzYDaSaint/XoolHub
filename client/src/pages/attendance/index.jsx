import React, { useState, useEffect } from 'react'
import { Toaster, toast } from 'react-hot-toast'
import api from '../../services/apiServices';
import { GraduationCap, CheckSquare, Frown, ChevronLeft, ChevronRight } from 'lucide-react';
import AttendanceTable from './components/table';

const AttendanceComponent = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState({});
  const [absentReasons, setAbsentReasons] = useState({});

  const fetchData = async () => {
    try {
      const res = await api.getCS();

      if(res.data.success === false) {
        // No student data available
        setAttendanceData([]);
        setAttendanceStatus({});
      }
      else {
        const data = res.data.cs;
        
        if (!data || data.length === 0) {
          // Empty student data
          setAttendanceData([]);
          setAttendanceStatus({});
        } else {
          const attendanceData = data.map((item, index) => ({
            sr: index + 1,
            student: item.name,
            class: item.class,
            studentId: item.id,
            actions: ""
          }));
          setAttendanceData(attendanceData);
          
          // Initialize attendance status for each student
          const initialStatus = {};
          attendanceData.forEach(student => {
            initialStatus[student.studentId] = 'present';
          });
          setAttendanceStatus(initialStatus);
        }
      }
    } catch (error) {
      console.error('Error fetching student data:', error);
      setAttendanceData([]);
      setAttendanceStatus({});
    }
  };

  useEffect(() => {
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceStatus(prev => ({
      ...prev,
      [studentId]: status
    }));
    
    // Clear absent reason if status changes from absent
    if (status !== 'absent') {
      setAbsentReasons(prev => {
        const newReasons = { ...prev };
        delete newReasons[studentId];
        return newReasons;
      });
    }
  };

  const handleAbsentReasonChange = (studentId, reason) => {
    setAbsentReasons(prev => ({
      ...prev,
      [studentId]: reason
    }));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleMonthChange = (direction) => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'next') {
        newMonth.setMonth(newMonth.getMonth() + 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() - 1);
      }
      return newMonth;
    });
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    const days = [];
    
    // Add days from previous month
    for (let i = startingDay - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Add days from current month
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      days.push({ date: currentDate, isCurrentMonth: true });
    }
    
    // Fill remaining days to complete the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const getAttendanceStats = () => {
    const total = attendanceData.length;
    const present = Object.values(attendanceStatus).filter(status => status === 'present').length;
    const absent = Object.values(attendanceStatus).filter(status => status === 'absent').length;
    const leave = Object.values(attendanceStatus).filter(status => status === 'leave').length;
    
    return { total, present, absent, leave };
  };

  const handleSaveAttendance = async () => {
    const res = await api.insertAttendance({
      date: selectedDate,
      attendance: attendanceStatus,
      absentReasons: absentReasons,
    });

    if(res.data.success === true) {
      toast.success(res.data.message);
    }
    else {
      toast.error(res.data.message);
    }
  };

  const stats = getAttendanceStats();
  const days = getDaysInMonth(currentMonth);
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Toaster />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div className="px-8 py-6 pl-20">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  Subject Attendance
                </h1>
                <p className="text-gray-600 font-medium">
                  Manage attendance by entering and filtering data
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/30"></div>
                <div className="relative p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                      <div className="text-gray-600 font-medium">Total Students</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
                <div className="relative p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                      <CheckSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stats.present}</div>
                      <div className="text-gray-600 font-medium">present today</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-pink-50/30"></div>
                <div className="relative p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl">
                      <Frown className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stats.absent}</div>
                      <div className="text-gray-600 font-medium">absent today</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Attendance Table */}
              <div className="xl:col-span-2">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
                  <div className="relative p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Attendance Records</h3>
                    </div>
                    
                    {attendanceData.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 text-center">
                        <div className="p-4 bg-gray-100 rounded-full mb-4">
                          <GraduationCap className="w-12 h-12 text-gray-400" />
                        </div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">No Students Found</h4>
                        <p className="text-gray-500 mb-4 max-w-md">
                          There are no students available for attendance tracking. Please contact your administrator to add students to this class.
                        </p>
                        <button 
                          onClick={fetchData}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                        >
                          Refresh Data
                        </button>
                      </div>
                    ) : (
                      <>
                        <AttendanceTable 
                          attendanceData={attendanceData} 
                          attendanceStatus={attendanceStatus}
                          onAttendanceChange={handleAttendanceChange}
                          onAbsentReasonChange={handleAbsentReasonChange}
                          absentReasons={absentReasons}
                        />
                        <div className="mt-6 flex justify-end">
                          <button 
                            onClick={handleSaveAttendance}
                            className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                          >
                            <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Save Attendance
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Calendar */}
              <div className="xl:col-span-1">
                <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30"></div>
                  <div className="relative p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">Calendar</h3>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <button 
                        onClick={() => handleMonthChange('prev')}
                        className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group"
                      >
                        <ChevronLeft size={20} className="text-gray-600 group-hover:text-gray-800" />
                      </button>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                      </h4>
                      <button 
                        onClick={() => handleMonthChange('next')}
                        className="p-2 hover:bg-gray-100/80 rounded-xl transition-all duration-200 group"
                      >
                        <ChevronRight size={20} className="text-gray-600 group-hover:text-gray-800" />
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 mb-3">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day, index) => (
                        <button
                          key={index}
                          onClick={() => handleDateSelect(day.date)}
                          className={`p-2 text-sm rounded-xl hover:bg-gray-100/80 transition-all duration-200 ${
                            day.date.toDateString() === selectedDate.toDateString()
                              ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                              : day.isCurrentMonth
                              ? 'text-gray-900 hover:bg-blue-50'
                              : 'text-gray-400'
                          }`}
                        >
                          {day.date.getDate()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AttendanceComponent
