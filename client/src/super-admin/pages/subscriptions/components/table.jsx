import React from 'react'
import UniversalTable from '../../../../components/table';

const PlanTable = ({ planData }) => {

  const planColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'name', label: 'Name', width: '25%' },
    { key: 'price', label: 'Price', width: '15%' },
    { key: 'features', label: 'Features', width: '45%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={planColumn} data={planData} />
    </div>
  )
}

export default PlanTable