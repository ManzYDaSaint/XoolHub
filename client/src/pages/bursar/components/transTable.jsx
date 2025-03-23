import React from 'react'
import UniversalTable from '../../../components/table';

const TransTable = ({ Data }) => {

  const Column = [
    { key: 'sr', label: 'SR', width: '10%' },
    { key: 'description', label: 'Description', width: '40%' },
    { key: 'type', label: 'Type', width: '20%' },
    { key: 'date', label: 'Date', width: '20%' },
    { key: 'amount', label: 'Amount', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={Column} data={Data} />
    </div>
  )
}

export default TransTable