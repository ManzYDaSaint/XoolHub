import React from "react";

const StudentFeesManagement = () => {
  const students = [
    { id: 1, name: "John Doe", class: "Grade 8", totalFees: "$1000", paid: "$800", balance: "$200" },
    { id: 2, name: "Jane Smith", class: "Grade 9", totalFees: "$1200", paid: "$900", balance: "$300" },
  ];

  return (
    <div className="student-fees-management">
      <h3>Student Fees Management</h3>
      <table>
        <thead>
          <tr>
            <td>Student Name</td>
            <td>Class</td>
            <td>Total Fees</td>
            <td>Paid</td>
            <td>Balance</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.totalFees}</td>
              <td>{student.paid}</td>
              <td>{student.balance}</td>
              <td>
                <button variant="outlined" color="primary">
                  Add Payment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentFeesManagement;
