import React from 'react'
import Card from '../../students/dashboard/components/card'
import { GraduationCap, UsersRound, DollarSign, File } from 'lucide-react'

const MasterCards = () => {
  return (
    <div className='overview-section'>
        <Card 
            icon={GraduationCap}
            title="5,000"
            description="Total Students"
        />
        <Card 
            icon={UsersRound}
            title="53"
            description="Total Teachers"
        />
        <Card 
            icon={DollarSign}
            title="691,380"
            small={'MK'}
            description="Fees Collected"
        />
        <Card 
            icon={File}
            title="26"
            description="Examination Results"
        />
    </div>
  )
}

export default MasterCards