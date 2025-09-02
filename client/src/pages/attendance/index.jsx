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
    const res = await api.getCS();

    if(res.data.success === false) {
        // Use sample data for demonstration
        const sampleData = [
            { id: 447, name: 'Savannah Nguyen', class: 'BSCS-3A' },
            { id: 177, name: 'Brooklyn Simmons', class: 'BSCS-3A' },
            { id: 185, name: 'Darrell Steward', class: 'BSCS-3A' },
            { id: 816, name: 'Marvin McKinney', class: 'BSCS-3A' },
            { id: 429, name: 'Cameron Williamson', class: 'BSCS-3A' },
            { id: 154, name: 'Cody Fisher', class: 'BSCS-3A' },
            { id: 892, name: 'Leslie Alexander', class: 'BSCS-3A' },
            { id: 234, name: 'Jenny Wilson', class: 'BSCS-3A' }
        ];
        
        const attendanceData = sampleData.map((item, index) => ({
            sr: index + 1,
            student: item.name,
            class: item.class,
            studentId: item.id,
            actions: ""
        }));
        setAttendanceData(attendanceData);
        
        // Initialize attendance status for each student
        const initialStatus = {};
        attendanceData.forEach((student, index) => {
          // Set some students as absent/leave to match the screenshot
          if (index === 2) { // Darrell Steward
            initialStatus[student.studentId] = 'absent';
          } else if (index === 6) { // Leslie Alexander
            initialStatus[student.studentId] = 'leave';
          } else {
            initialStatus[student.studentId] = 'present';
          }
        });
        setAttendanceStatus(initialStatus);
    }
    else {
        const data = res.data.cs;
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
    <div className="flex bg-gray-100 min-h-screen">
      <Toaster />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-2 sticky top-0 z-30 bg-white/95 backdrop-blur-sm">
          <div className="ml-16">
            <h1
              className="text-lg font-semibold"
              style={{ fontFamily: "'Poppins', san-serif" }}
            >
              Subject Attendance
            </h1>
            <p className="text-sm text-gray-500">
              Manage attendance by entering and filtering.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="flex gap-6">
            {/* Left Section - Filters and Table */}
            <div className="flex-1">
              {/* Summary Statistics */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                      <div className="text-sm text-gray-500">Total Students</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckSquare className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stats.present}</div>
                      <div className="text-sm text-gray-500">Present Today</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Frown className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-900">{stats.absent}</div>
                      <div className="text-sm text-gray-500">Absent Today</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Table */}
              <div className="bg-white rounded-lg shadow-sm">
                <AttendanceTable 
                  attendanceData={attendanceData} 
                  attendanceStatus={attendanceStatus}
                  onAttendanceChange={handleAttendanceChange}
                  onAbsentReasonChange={handleAbsentReasonChange}
                  absentReasons={absentReasons}
                />
                <div className="p-4 border-t">
                  <button 
                    onClick={handleSaveAttendance}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
                  >
                    Save Attendance
                  </button>
                </div>
              </div>
            </div>

            {/* Right Section - Calendar and Stats */}
            <div className="w-80 space-y-6">
              {/* Calendar */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <button 
                    onClick={() => handleMonthChange('prev')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <h3 className="text-lg font-semibold">
                    {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                  </h3>
                  <button 
                    onClick={() => handleMonthChange('next')}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {days.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(day.date)}
                      className={`p-2 text-sm rounded-full hover:bg-gray-100 transition-colors ${
                        day.date.toDateString() === selectedDate.toDateString()
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : day.isCurrentMonth
                          ? 'text-gray-900'
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
    </div>
  )
}

export default AttendanceComponent
