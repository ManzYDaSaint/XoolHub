import React from 'react'
import UniversalTable from '../../components/table.jsx'

const StudentTable = ({ studData }) => {

  const studentColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'student', label: 'Student Name', width: '30%' },
    { key: 'age', label: 'Age', width: '10%' },
    { key: 'class', label: 'Class', width: '10%' },
    { key: 'gender', label: 'Gender', width: '10%' },
    { key: 'address', label: 'Address', width: '10%' },
    { key: 'contact', label: 'Contact', width: '10%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={studentColumn} data={studData} />
    </div>
  )
}

export default StudentTable