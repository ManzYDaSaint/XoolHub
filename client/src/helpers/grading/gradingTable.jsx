import React from 'react'
import UniversalTable from '../../components/table.jsx'

const GradeTable = ({ gradeData }) => {

  const gradeColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'denom', label: 'Denom', width: '10%' },
    { key: 'roof', label: 'Roof', width: '10%' },
    { key: 'floor', label: 'Floor', width: '10%' },
    { key: 'grade', label: 'Grade', width: '5%' },
    { key: 'remark', label: 'Remark', width: '50%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];

  return (
    <div>
        <UniversalTable columns={gradeColumn} data={gradeData} />
    </div>
  )
}

export default GradeTable