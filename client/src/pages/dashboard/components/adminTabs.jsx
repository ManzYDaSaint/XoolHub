import React, { useState } from 'react'
import { UserRoundPen, Presentation, MessagesSquare, Bell } from 'lucide-react'
import AdminPersonal from './adminPersonal'
import '../dashboard.css'

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
      <button class={selectedTab === 1 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(1)}>Notice Board <Presentation size={22} className='adminIcon' /></button>
      <button class={selectedTab === 2 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(2)}>Messages <MessagesSquare size={22} className='adminIcon' /></button>
      <button class={selectedTab === 3 ? "tablinks active" : "tablinks"} onClick={() => handleTabClick(3)}>Notifications <Bell size={22} className='adminIcon' /></button>
    </div>
    {selectedTab === 0 && <div id="Personal" class="tabcontent animate-bottom">
        <AdminPersonal />
    </div> 
    }
    {selectedTab === 1 &&<div id="Academic" class="tabcontent animate-bottom">
        {/* <Academical /> */}
    </div>
    }
    {selectedTab === 2 && <div id="Financial" class="tabcontent animate-bottom">
        {/* <Financial /> */}
    </div>
    }
    {selectedTab === 3 && <div id="Miscellaneous" class="tabcontent animate-bottom">
        {/* <Miscellaneous /> */}
    </div>
    }
  </div>
  )
}

export default AdminTabs