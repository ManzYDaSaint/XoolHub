import React from 'react'
import DashboardCard from './card'
import Noticeboard from './noticeboard'
import Topstudent from './topstudent'
import AveData from '../data/avescore'
import StudentCard from './studentcard'

const Cards = () => {
  return (
    <div className='cardsContainer'>
        <div className="row">
            <div className="col-sm-4">
                <StudentCard />
            </div>
            <div className="col-sm-4">
                <DashboardCard 
                    label={'Today Lessons'}
                    figure={'0'}
                    icon={'chess'}
                    note={'Number of lessons today'}
                    cardTop={'ndCard'}
                    dico={'ndIcon'}
                />
            </div>
            <div className="col-sm-4">
                <DashboardCard 
                    label={'Messages'}
                    figure={'0'}
                    icon={'mail'}
                    note={'New messages'}
                    cardTop={'rdCard'}
                    dico={'rdIcon'}
                />
            </div>
        </div>
        <div className="row cutter">
            <div className="col-sm-8">
                <div className="noticeContainer">
                    <Noticeboard />
                </div>
            </div>
            <div className="col-sm-4">
                <h6 className="carder">Top Students</h6>
                <div className="topStudentContainer">
                    <Topstudent />
                </div>
            </div>
        </div>
        <div className="row cutter">
            <div className="col-sm-12">
                <div className="aveContainer">
                    <AveData />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cards