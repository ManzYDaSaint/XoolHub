/*************  ✨ Codeium Command ⭐  *************/
import React, { useState, useEffect } from 'react';
import { Table } from 'semantic-ui-react';
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
      <h2>Academic History</h2>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Year</Table.HeaderCell>
            <Table.HeaderCell>Class</Table.HeaderCell>
            <Table.HeaderCell>Subject</Table.HeaderCell>
            <Table.HeaderCell>Grade</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {academicHistory.map((record, index) => (
            <Table.Row key={index}>
              <Table.Cell>{record.year}</Table.Cell>
              <Table.Cell>{record.class}</Table.Cell>
              <Table.Cell>{record.subject}</Table.Cell>
              <Table.Cell>{record.grade}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ParentNavBar />
    </div>
    </div>
    </div>
  );
};

export default AcademicHistory;