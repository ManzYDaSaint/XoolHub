import React, { useState, useEffect } from 'react';
import api from '../../../services/apiServices';
import ParentNavBar from '../../components/navbar';
import TopNav from '../../components/topnav';

const AcademicHistory = ({ studentId }) => {
  const [academicHistory, setAcademicHistory] = useState([]);

  useEffect(() => {
    const fetchAcademicHistory = async () => {
      try {
        const response = await api.get(`/students/${studentId}/academic-history`);
        setAcademicHistory(response.data);
      } catch (error) {
        console.error("Error fetching academic history:", error);
      }
    };

    fetchAcademicHistory();
  }, [studentId]);

  return (
    <div className="parent_container">
      <div className="parent_content">
        <div className="academic-history">
          <TopNav />
          <h2 className="text-2xl font-bold mb-4">Academic History</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b">Year</th>
                  <th className="py-2 px-4 border-b">Class</th>
                  <th className="py-2 px-4 border-b">Subject</th>
                  <th className="py-2 px-4 border-b">Grade</th>
                </tr>
              </thead>
              <tbody>
                {academicHistory.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b"><p className="text-sm">{record.year}</p></td>
                    <td className="py-2 px-4 border-b"><p className="text-sm">{record.class}</p></td>
                    <td className="py-2 px-4 border-b"><p className="text-sm">{record.subject}</p></td>
                    <td className="py-2 px-4 border-b"><p className="text-sm">{record.grade}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ParentNavBar />
        </div>
      </div>
    </div>
  );
};

export default AcademicHistory;