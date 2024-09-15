import React from 'react'
import UniversalTable from '../../../components/table.jsx'

const AssignTable = ({ assignTeacherData }) => {

  const assignTeacherColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'teacher', label: 'Teacher', width: '50%' },
    { key: 'class', label: 'Class', width: '15%' },
    { key: 'subject', label: 'Subject', width: '15%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={assignTeacherColumn} data={assignTeacherData} />
    </div>
  )
}

export default AssignTable