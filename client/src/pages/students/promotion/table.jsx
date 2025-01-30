import React from 'react'
import UniversalTable from '../../../components/table.jsx';

const Table = ({ data }) => {

  const column = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'tick', label: 'Tick', width: '10%' },
    { key: 'name', label: 'Name', width: '35%' },
    { key: 'exam', label: 'Exam', width: '20%' },
    { key: 'agg', label: 'Agg', width: '15%' },
    { key: 'remark', label: 'Remark', width: '15%' },
  ];


  return (
    <div>
        <UniversalTable columns={column} data={data} />
    </div>
  )
}

export default Table