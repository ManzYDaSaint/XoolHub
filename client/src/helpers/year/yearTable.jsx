import React from 'react'
import UniversalTable from '../../components/table.jsx'

const YearTable = ({ yearData }) => {

  const yearColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'name', label: 'Name', width: '40%' },
    { key: 'start', label: 'Start Date', width: '15%' },
    { key: 'end', label: 'End Start', width: '15%' },
    { key: 'actions', label: 'Actions', width: '20%' }
  ];


  return (
    <div>
        <UniversalTable columns={yearColumn} data={yearData} />
    </div>
  )
}

export default YearTable