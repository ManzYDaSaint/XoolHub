import React from 'react'
import UniversalTable from '../../components/table.jsx'

const FilterTable = ({ filterData }) => {

  const filterColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'name', label: 'Name', width: '30%' },
    { key: 'class', label: 'Class', width: '10%' },
    { key: 'subject', label: 'Subject', width: '10%' },
    { key: 'score', label: 'Score', width: '10%' },
    { key: 'grade', label: 'Grade', width: '10%' },
    { key: 'remark', label: 'Remark', width: '10%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={filterColumn} data={filterData} />
    </div>
  )
}

export default FilterTable