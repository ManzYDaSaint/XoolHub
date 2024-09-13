import React, { useState } from 'react'
import Year from './assets/year.png' 
import YearPro from './assets/yearPro.png' 
import Subject from './assets/subject.png'
import SubjectPro from './assets/subjectPro.png'
import Class from './assets/class.png'
import ClassPro from './assets/classPro.png'
import Term from './assets/term.png'
import TermPro from './assets/termPro.png'
import Remark from './assets/remark.png'
import RemarkPro from './assets/remarkPro.png'
import Grading from './assets/grading.png'
import GradingPro from './assets/gradingPro.png'
import Exam from './assets/exam.png'
import ExamPro from './assets/examPro.png'
import YearData from '../helpers/year/yearData.jsx'
import SubjectData from '../helpers/subject/subjectData.jsx'
import ClassData from '../helpers/class/classData.jsx'
import TermData from '../helpers/term/termData.jsx'
import RemarkData from '../helpers/remark/remarkData.jsx'
import GradingData from '../helpers/grading/gradingData.jsx'
import ExamData from '../helpers/examination/examData.jsx'


const Tabs = () => {
  // Closing and Opening Tabs and Divs
  const [selectedTab, setSelectedTab] = useState(0);
  const [active, setActive] = useState(0);
  
  const handleTabClick = (index) => {
    setSelectedTab(index);
    setActive(!active);
  };


  // Closing and Opening Tabs and Divs
  
  return (
    <div class="settingContent">
      <div class="tab">
        <button class={selectedTab === 0 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(0)}>Examination Type <img src={Exam} alt="tabIcon" className='tabIcon' /></button>
        <button class={selectedTab === 1 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(1)}>Grading System <img src={Grading} alt="tabIcon" /></button>
        <button class={selectedTab === 2 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(2)}>Remarks <img src={Remark} alt="tabIcon" /></button>
        <button class={selectedTab === 3 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(3)}>Term <img src={Term} alt="tabIcon" /></button>
        <button class={selectedTab === 4 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(4)}>Class <img src={Class} alt="tabIcon" /></button>
        <button class={selectedTab === 5 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(5)}>Subject <img src={Subject} alt="tabIcon" /></button>
        <button class={selectedTab === 6 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(6)}>Academic Year <img src={Year} alt="tabIcon" /> </button>
      </div>
      {selectedTab === 0 && <div id="Examination" class="tabcontent animate-bottom">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="tab__header text-muted text-uppercase w-100">
                <img src={ExamPro} alt="contentIcon" className='tab__icons' />
                <h5>Examination Type</h5>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="examination__container mt-4">
                <ExamData />
              </div>
            </div>
          </div>
        </div>
      </div> 
      }
      {selectedTab === 1 &&<div id="Grading" class="tabcontent animate-bottom">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="tab__header text-muted text-uppercase w-100">
                <img src={GradingPro} alt="tab__icons" className='tab__icons' />
                <h5>Grading System</h5>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="examination__container mt-4">
                <GradingData />
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {selectedTab === 2 && <div id="Remarks" class="tabcontent animate-bottom">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="tab__header text-muted text-uppercase w-100">
              <img src={RemarkPro} alt="tab__icons" className='tab__icons' />
                <h5>Remarks</h5>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="examination__container mt-4">
                <RemarkData />
              </div>
            </div>
          </div>
        </div>
      </div> 
      }
      {selectedTab === 3 && <div id="Term" class="tabcontent animate-bottom">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="tab__header text-muted text-uppercase w-100">
              <img src={TermPro} alt="tab__icons" className='tab__icons' />
                <h5>School Term</h5>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="term__container mt-4">
                <TermData />
              </div>
            </div>
          </div>
        </div>
      </div>
      }
      {selectedTab === 4 && <div id="Classo" class="tabcontent animate-bottom">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="tab__header text-muted text-uppercase w-100">
              <img src={ClassPro} alt="tab__icons" className='tab__icons' />
                <h5>Classes</h5>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="class__container mt-4">
                <ClassData />
              </div>
            </div>
          </div>
        </div>
      </div> 
      }
      {selectedTab === 5 &&
        <div id="Subject" class="tabcontent animate-bottom">
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-12">
                <div class="tab__header text-muted text-uppercase w-100">
                  <img src={SubjectPro} alt="tab__icons" className='tab__icons' />
                  <h5>Subjects</h5>
                </div>
              </div>
              <div class="col-lg-12">
                <div class="subject__container mt-4">
                  <SubjectData />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {selectedTab === 6 && <div id="Academic" class="tabcontent animate-bottom">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12">
              <div class="tab__header text-muted text-uppercase w-100">
              <img src={YearPro} alt="tab__icons" className='tab__icons' />
                <h5>Academic Year</h5>
              </div>
            </div>
            <div class="col-lg-12">
              <div class="year__container mt-4">
                <YearData />
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </div>
  )
}
export default Tabs;
