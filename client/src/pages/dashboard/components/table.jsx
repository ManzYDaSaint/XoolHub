import React from 'react'
import UniversalTable from '../../../components/table';

const BillingTable = ({billingData}) => {

    const billingColumn = [
        { key: 'sr', label: 'SR', width: '5%' },
        { key: 'invoice', label: 'Invoice #', width: '20%' },
        { key: 'date', label: 'Date', width: '20%' },
        { key: 'plan', label: 'Plan', width: '20%' },
        { key: 'price', label: 'Price (MK)', width: '20%' },
        { key: 'actions', label: 'Actions', width: '15%' }
      ];

  return (
    <>
        <UniversalTable columns={billingColumn} data={billingData} />
    </>
  )
}

export default BillingTable