import React, { useState } from 'react'
import Profile from '../assets/profile.png'
// import Academic from '../assets/academic.png'
import Fees from '../assets/fees.png'
// import Misc from '../assets/misc.png'
import Personal from './personal'
import Academical from './academic'
import Financial from './financial'
import Miscellaneous from './miscelleneous'


const Tabs = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [active, setActive] = useState(0);
    
    const handleTabClick = (index) => {
      setSelectedTab(index);
      setActive(!active);
    };

  return (
    <div class="settingContent">
    <div class="tab">
      <button class={selectedTab === 0 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(0)}>Profile <img src={Profile} alt="tabIcon" className='tabeIcon' /></button>
      {/* <button class={selectedTab === 1 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(1)}>Academic <img src={Academic} alt="tabIcon" className='tabeIcon' /></button> */}
      <button class={selectedTab === 1 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(2)}>Financial <img src={Fees} alt="tabIcon" className='tabeIcon' /></button>
      {/* <button class={selectedTab === 3 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(3)}>Miscellaneous <img src={Misc} alt="tabIcon" className='tabeIcon' /></button> */}
    </div>
    {selectedTab === 0 && <div id="Personal" class="tabcontent animate-bottom">
        <Personal />
    </div> 
    }
    {selectedTab === 1 &&<div id="Academic" class="tabcontent animate-bottom">
        <Academical />
    </div>
    }
    {selectedTab === 2 && <div id="Financial" class="tabcontent animate-bottom">
        <Financial />
    </div>
    }
    {selectedTab === 3 && <div id="Miscellaneous" class="tabcontent animate-bottom">
        <Miscellaneous />
    </div>
    }
  </div>
  )
}

export default Tabs