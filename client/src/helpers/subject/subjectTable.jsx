import React from 'react'
import UniversalTable from '../../components/table.jsx'

const SubjectTable = ({ subjectData }) => {
  const subjectColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'name', label: 'Name', width: '50%' },
    { key: 'code', label: 'Code', width: '20%' },
    { key: 'actions', label: 'Actions', width: '20%' }
  ];


  return (
    <div>
        <UniversalTable columns={subjectColumn} data={subjectData} />
    </div>
  )
}

export default SubjectTable