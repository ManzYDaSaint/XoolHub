import React from 'react'
import UniversalTable from '../../../components/table.jsx'

const PfTable = ({ payData }) => {

  const pfColumn = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'date', label: 'Date', width: '10%' },
    { key: 'fee', label: 'Fee', width: '30%' },
    { key: 'amount', label: 'Amount', width: '10%' },
    { key: 'paid', label: 'Paid', width: '10%' },
    { key: 'balance', label: 'Balance', width: '10%' },
    { key: 'actions', label: 'Actions', width: '20%' },
  ];


  return (
    <div>
        <UniversalTable columns={pfColumn} data={payData} />
    </div>
  )
}

export default PfTable