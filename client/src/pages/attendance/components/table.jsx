import React from 'react'
import UniversalTable from '../../../components/table';

const AttendanceTable = ({ attendanceData, attendanceStatus, onAttendanceChange, absentReasons, onAbsentReasonChange }) => {

  const handleStatusChange = (studentId, status) => {
    onAttendanceChange(studentId, status);
  };

  // Transform data for Universal Table
  const transformedData = attendanceData.map((student, index) => ({
    studentId: student.studentId || student.sr,
    name: student.student,
    present: (
      <input
        type="radio"
        name={`attendance-${student.studentId || index}`}
        value="present"
        checked={attendanceStatus[student.studentId || index] === 'present'}
        onChange={() => handleStatusChange(student.studentId || index, 'present')}
        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 focus:ring-2"
      />
    ),
    absent: (
      <input
        type="radio"
        name={`attendance-${student.studentId || index}`}
        value="absent"
        checked={attendanceStatus[student.studentId || index] === 'absent'}
        onChange={() => handleStatusChange(student.studentId || index, 'absent')}
        className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 focus:ring-2"
      />
    ),
    leave: (
      <input
        type="radio"
        name={`attendance-${student.studentId || index}`}
        value="leave"
        checked={attendanceStatus[student.studentId || index] === 'leave'}
        onChange={() => handleStatusChange(student.studentId || index, 'leave')}
        className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 focus:ring-yellow-500 focus:ring-2"
      />
    ),
    note: (
      <div className="flex items-center gap-2">
        {attendanceStatus[student.studentId || index] === 'absent' ? (
          <input
            type="text"
            placeholder="Enter reason for absence..."
            value={absentReasons[student.studentId || index] || ''}
            onChange={(e) => onAbsentReasonChange(student.studentId || index, e.target.value)}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        ) : (
          <span className="text-gray-400 text-sm italic">
            {attendanceStatus[student.studentId || index] === 'present' ? 'Present' : 
             attendanceStatus[student.studentId || index] === 'leave' ? 'On Leave' : 'Select status'}
          </span>
        )}
      </div>
    )
  }));

  const columns = [
    { key: 'studentId', label: 'Student ID', width: '15%' },
    { key: 'name', label: 'Name', width: '25%' },
    { key: 'present', label: 'Present', width: '15%' },
    { key: 'absent', label: 'Absent', width: '15%' },
    { key: 'leave', label: 'Leave', width: '15%' },
    { key: 'note', label: 'Note', width: '15%' }
  ];

  return (
    <UniversalTable 
      columns={columns} 
      data={transformedData}
    />
  );
};

export default AttendanceTable;