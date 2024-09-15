import React from 'react'
import UniversalTable from '../../../components/table.jsx'

const AddTable = ({ teacherData }) => {

  const teacherColumn = [
    { key: 'sr', label: 'SR', width: '5%' },
    { key: 'name', label: 'Name', width: '25%' },
    { key: 'contact', label: 'Contact', width: '15%' },
    { key: 'email', label: 'Email', width: '15%' },
    { key: 'address', label: 'Address', width: '15%' },
    { key: 'password', label: 'Password', width: '10%' },
    { key: 'actions', label: 'Actions', width: '15%' }
  ];


  return (
    <div>
        <UniversalTable columns={teacherColumn} data={teacherData} />
    </div>
  )
}

export default AddTable