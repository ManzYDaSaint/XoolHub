import React from 'react'
import UniversalTable from '../../components/table.jsx'

const StudentTable = ({ studentData }) => {

  const studentColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'enroll', label: 'Enrollment', width: '15%' },
    { key: 'name', label: 'Name', width: '30%' },
    { key: 'class', label: 'Class', width: '10%' },
    { key: 'dob', label: 'DOB', width: '10%' },
    { key: 'gender', label: 'Gender', width: '10%' },
    { key: 'address', label: 'Address', width: '10%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={studentColumn} data={studentData} />
    </div>
  )
}

export default StudentTable