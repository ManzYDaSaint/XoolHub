import React, { useState } from 'react'
import { Icon } from 'semantic-ui-react'
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
import FormButton from './input/formButton'
import ExamTable from '../helpers/examination/examTable.jsx'
import ExamForm from '../helpers/examination/examForm.jsx'
import YearForm from '../helpers/year/yearForm.jsx'
import YearTable from '../helpers/year/yearTable.jsx'


const Tabs = () => {
  // Closing and Opening Tabs and Divs
  const [selectedTab, setSelectedTab] = useState(0);
  const [active, setActive] = useState(0);
  const [showType, setShowType] = useState(false);
  const [showYear, setShowYear] = useState(false);
  
  const handleOpen = () => { setShowType(true); };
  const handleYearOpen = () => { setShowYear(true); };
  
  const handleClose = () => { setShowType(false); };
  const handleYearClose = () => { setShowYear(false); };
  
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
                <div className="div" style={{ display: showType ? 'none' : 'block' }}>
                  <button type="button" onClick={handleOpen} 
                    class="add__rows__btn">
                    <Icon name='plus' className='plus' />
                    Add
                  </button>
                </div>
                <div className="toggleDiv" style={{ display: showType ? 'block' : 'none' }}>
                  <ExamForm />
                  <FormButton 
                    label={'Close'}
                    id={'closeBtn'}
                    onClick={handleClose}
                  />
                </div>
                <div className="tableContainer">
                  <ExamTable setShowType={setShowType} />
                </div>
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
                <button type="button" onclick="document.getElementById('grading__modal').style.display='block'" 
                class="add__rows__btn">
                  <Icon name='plus' className='plus' />
                  Add</button>
                <table class="custom__table table-hover mt-3" id="grade__table">
                  
                </table>
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
                <div class="tablo">
                  <button class="tablinko" onclick="HoriTabs(event, 'JCE')">JCE </button>
                  <button class="tablinko" onclick="HoriTabs(event, 'MSCE')">MSCE </button>
                </div>
                <div id="JCE" class="tabcontento animate-bottom mt-4">
                  <button type="button" onclick="document.getElementById('jce_remark__modal').style.display='block'" 
                  class="add__rows__btn">
                    <Icon name='plus' className='plus' />
                    Add</button>
                  <table class="custom__table table-hover mt-3" id="JCE__remark__table">
                    
                  </table>
                </div>
                <div id="MSCE" class="tabcontento animate-bottom mt-4">
                  <button type="button" onclick="document.getElementById('msce_remark__modal').style.display='block'" 
                  class="add__rows__btn">
                    <Icon name='plus' className='plus' />
                    Add</button>
                  <table class="custom__table table-hover mt-3" id="MSCE__remark__table">
                    
                  </table>
                </div>
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
              <button type="button" 
                onclick="document.getElementById('term__modal').style.display='block'" 
                class="add__rows__btn">
                  <Icon name='plus' className='plus' />
                  Add
              </button>
                <table class="custom__table table-hover mt-3" id="term__table">
                  
                </table>
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
                <button type="button" 
                  onclick="document.getElementById('class__modal').style.display='block'" 
                  class="add__rows__btn">
                    <Icon name='plus' className='plus' />
                    Add
                </button>
                <table class="custom__table table-hover mt-4" id="class__table">
                  
                </table>
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
                  <button type="button" onclick="document.getElementById('subject__modal').style.display='block'" class="add__rows__btn">
                    <Icon name='plus' className='plus' />
                    Add
                  </button>
                  <table class="custom__table table-hover mt-3" id="subject__table">
                    
                  </table>
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
              <div className="div" style={{ display: showYear ? 'none' : 'block' }}>
                  <button type="button" onClick={handleYearOpen} 
                    class="add__rows__btn">
                    <Icon name='plus' className='plus' />
                    Add
                  </button>
                </div>
                <div className="toggleDiv" style={{ display: showYear ? 'block' : 'none' }}>
                  <YearForm />
                  <FormButton 
                    label={'Close'}
                    id={'closeBtn'}
                    onClick={handleYearClose}
                  />
                </div>
                <table className="custom__table table-hover mt-3" id="year__table">
                  <YearTable setShowYear={setShowYear} />
                </table>
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
