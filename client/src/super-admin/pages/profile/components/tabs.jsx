import React, { useState } from 'react'
import { UserRoundPen, Presentation } from 'lucide-react'
import SuperProfile from './profile'

const SuperTabs = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [active, setActive] = useState(0);
    
    const handleTabClick = (index) => {
      setSelectedTab(index);
      setActive(!active);
    };

  return (
    <div class="settingContent">
    <div class="tab">
      <button class={selectedTab === 0 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(0)}>Profile <UserRoundPen size={22} className='adminIcon' /></button>
      <button class={selectedTab === 1 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(1)}>Notice Board <Presentation size={22} className='adminIcon' /></button>
    </div>
    {selectedTab === 0 && <div id="Personal" class="tabcontent animate-bottom">
        <SuperProfile />
    </div> 
    }
    {selectedTab === 1 &&<div id="Academic" class="tabcontent animate-bottom">
        {/* <Academical /> */}
    </div>
    }
  </div>
  )
}

export default SuperTabs