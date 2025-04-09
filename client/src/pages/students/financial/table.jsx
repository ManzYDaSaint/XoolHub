import React from 'react'
import UniversalTable from '../../../components/table.jsx'

const PfTable = ({ payData }) => {

  const pfColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'date', label: 'Date', width: '15%' },
    { key: 'fee', label: 'Fee', width: '10%' },
    { key: 'term', label: 'Term', width: '20%' },
    { key: 'amount', label: 'Amount', width: '20%' },
    { key: 'paid', label: 'Paid', width: '15%' },
    { key: 'balance', label: 'Balance', width: '10%' },
  ];


  return (
    <div>
        <UniversalTable columns={pfColumn} data={payData} />
    </div>
  )
}

export default PfTable