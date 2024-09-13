import React from 'react'
import UniversalTable from '../../components/table.jsx'

const ExamTable = ({ examData }) => {

  const examColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'name', label: 'Name', width: '50%' },
    { key: 'percentage', label: 'Percentage', width: '20%' },
    { key: 'actions', label: 'Actions', width: '20%' }
  ];


  return (
    <div>
        <UniversalTable columns={examColumn} data={examData} />
    </div>
  )
}

export default ExamTable