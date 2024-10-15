import React from 'react'
import UniversalTable from '../../../../components/table.jsx'

const FinancialTable = ({ finData }) => {

  const financeColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'date', label: 'Date', width: '10%' },
    { key: 'fee', label: 'Fee', width: '10%' },
    { key: 'amount', label: 'Amount', width: '10%' },
    { key: 'status', label: 'Status', width: '10%' },
  ];


  return (
    <div>
        <UniversalTable columns={financeColumn} data={finData} />
    </div>
  )
}

export default FinancialTable