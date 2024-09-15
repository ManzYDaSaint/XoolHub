import React from 'react'
import UniversalTable from '../../../components/table.jsx'

const ClassTTable = ({ classTeacherData }) => {

  const classTeacherColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'teacher', label: 'Teacher', width: '50%' },
    { key: 'class', label: 'Class', width: '30%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={classTeacherColumn} data={classTeacherData} />
    </div>
  )
}

export default ClassTTable