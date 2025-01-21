import React from 'react'
import UniversalTable from '../../../components/table';

const Table = ({ data }) => {

  const column = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'name', label: 'School Name', width: '20%' },
    { key: 'plan', label: 'Plan', width: '15%' },
    { key: 'period', label: 'Period', width: '10%' },
    { key: 'amount', label: 'Amount', width: '10%' },
    { key: 'date', label: 'Date', width: '10%' },
    { key: 'status', label: 'Status', width: '10%' },
    { key: 'billing', label: 'Billing Status', width: '10%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={column} data={data} />
    </div>
  )
}

export default Table