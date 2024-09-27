import React from 'react'
import UniversalTable from '../../../components/table.jsx'

const PayTable = ({ payData }) => {

  const payColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'date', label: 'Date', width: '10%' },
    { key: 'name', label: 'Name', width: '25%' },
    { key: 'class', label: 'Class', width: '10%' },
    { key: 'fee', label: 'Fee', width: '10%' },
    { key: 'amount', label: 'Amount', width: '10%' },
    { key: 'status', label: 'Status', width: '10%' },
    { key: 'actions', label: 'Actions', width: '20%' }
  ];


  return (
    <div>
        <UniversalTable columns={payColumn} data={payData} />
    </div>
  )
}

export default PayTable