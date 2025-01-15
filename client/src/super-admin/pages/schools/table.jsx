import React from 'react'
import UniversalTable from '../../../components/table';

const SchoolTable = ({ data }) => {

  const dataColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'name', label: 'Name', width: '30%' },
    { key: 'type', label: 'Type', width: '15%' },
    { key: 'email', label: 'Email', width: '15%' },
    { key: 'contact', label: 'Contact', width: '15%' },
    { key: 'status', label: 'Status', width: '10%' },
    { key: 'actions', label: 'Actions', width: '10%'}
  ];


  return (
    <div>
        <UniversalTable columns={dataColumn} data={data} />
    </div>
  )
}

export default SchoolTable