import React from 'react'
import UniversalTable from '../../components/table.jsx'

const MSCETable = ({ msceData }) => {
  const MSCEColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'denom', label: 'Denom', width: '10%' },
    { key: 'roof', label: 'Roof', width: '10%' },
    { key: 'floor', label: 'Floor', width: '10%' },
    { key: 'remark', label: 'Remark', width: '55%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={MSCEColumn} data={msceData} />
    </div>
  )
}

export default MSCETable