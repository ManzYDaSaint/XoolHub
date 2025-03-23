import React from 'react'
import UniversalTable from '../../../components/table';

const XpenseTable = ({ Data }) => {

  const Column = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'date', label: 'Date', width: '10%' },
    { key: 'category', label: 'Category', width: '20%' },
    { key: 'description', label: 'Description', width: '30%' },
    { key: 'amount', label: 'Amount', width: '15%' },
    { key: 'status', label: 'Status', width: '10%' },
    { key: 'action', label: 'Action', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={Column} data={Data} />
    </div>
  )
}

export default XpenseTable