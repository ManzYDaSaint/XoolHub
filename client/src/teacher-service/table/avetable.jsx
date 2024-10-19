import React from 'react'
import UniversalTable from '../../components/table.jsx'

const AveTable = ({ aveData }) => {

  const aveColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'subject', label: 'Subject', width: '20%' },
    { key: 'average', label: 'Average', width: '15%' },
    { key: 'year', label: 'Year', width: '15%' },
    { key: 'term', label: 'Term', width: '15%' },
    { key: 'exam', label: 'Exam', width: '15%' },
    { key: 'class', label: 'Class', width: '10%' },
  ];


  return (
    <div>
        <UniversalTable columns={aveColumn} data={aveData} />
    </div>
  )
}

export default AveTable