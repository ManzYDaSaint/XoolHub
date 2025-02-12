import React from 'react'
import UniversalTable from '../../../components/table';

const Table = ({ data }) => {

  const dataColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'name', label: 'School Name', width: '20%' },
    { key: 'rating', label: 'Rating', width: '5%' },
    { key: 'option', label: 'Option', width: '5%' },
    { key: 'comment', label: 'Comment', width: '55%' },
    { key: 'date', label: 'Date', width: '10%' },
  ];

  return (
    <div>
        <UniversalTable columns={dataColumn} data={data} />
    </div>
  )
}

export default Table