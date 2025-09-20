import React from 'react'
import UniversalTable from '../../../../components/table';

const PlanTable = ({ planData }) => {

  const planColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'name', label: 'Plan Name', width: '20%' },
    { key: 'price', label: 'Original Price', width: '12%' },
    { key: 'pilot_price', label: 'Pilot Price', width: '12%' },
    { key: 'pilot_status', label: 'Pilot Status', width: '12%' },
    { key: 'max', label: 'Features', width: '29%' },
    { key: 'actions', label: 'Actions', width: '10%' }
  ];


  return (
    <div>
        <UniversalTable columns={planColumn} data={planData} />
    </div>
  )
}

export default PlanTable