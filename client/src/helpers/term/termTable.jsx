import React from 'react'
import UniversalTable from '../../components/table.jsx'

const TermTable = ({ termData }) => {

  const termColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'name', label: 'Name', width: '25%' },
    { key: 'year', label: 'Academic Year', width: '30%' },
    { key: 'start', label: 'Start Date', width: '15%' },
    { key: 'end', label: 'End Date', width: '15%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={termColumn} data={termData} />
    </div>
  )
}

export default TermTable