import React, { useState } from 'react'
import { UserRoundPen, Presentation, SquareDashedKanban } from 'lucide-react'
import AdminPersonal from './adminPersonal'
import '../dashboard.css'
import Billing from './billing'

const AdminTabs = () => {
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
      <button class={selectedTab === 1 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(1)}>Billing <SquareDashedKanban size={22} className='adminIcon' /></button>
      <button class={selectedTab === 2 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(2)}>Notice Board <Presentation size={22} className='adminIcon' /></button>
    </div>
    {selectedTab === 0 && <div id="Personal" class="tabcontent animate-bottom">
        <AdminPersonal />
    </div> 
    }
    {selectedTab === 1 &&<div id="Academic" class="tabcontent animate-bottom">
        <Billing />
    </div>
    }
    {selectedTab === 2 &&<div id="Academic" class="tabcontent animate-bottom">
        {/* <Academical /> */}
    </div>
    }
  </div>
  )
}

export default AdminTabs