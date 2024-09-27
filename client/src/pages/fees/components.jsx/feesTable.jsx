import React from 'react'
import UniversalTable from '../../../components/table.jsx'

const FeesTable = ({ feesData }) => {

  const feesColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'name', label: 'Name', width: '30%' },
    { key: 'amount', label: 'Amount', width: '10%' },
    { key: 'description', label: 'Description', width: '20%' },
    { key: 'start', label: 'Start Date', width: '10%' },
    { key: 'end', label: 'End Date', width: '10%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={feesColumn} data={feesData} />
    </div>
  )
}

export default FeesTable