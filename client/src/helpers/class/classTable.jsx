import React from 'react'
import UniversalTable from '../../components/table.jsx'

const ClassTable = ({ classData }) => {

  const classColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'denom', label: 'Denom', width: '20%' },
    { key: 'name', label: 'Name', width: '50%' },
    { key: 'actions', label: 'Actions', width: '20%' }
  ];


  return (
    <div>
        <UniversalTable columns={classColumn} data={classData} />
    </div>
  )
}

export default ClassTable