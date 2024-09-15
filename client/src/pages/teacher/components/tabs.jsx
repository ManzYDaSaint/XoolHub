import React, { useState } from 'react'
import Data from '../add/data';
import AssignData from '../assign/data';
import ClassTData from '../classTeacher/data';

const Tabs = () => {
    const [seleTab, setSeleTab] = useState(0);
    const [active, setActive] = useState(0);

    const handleTaClick = (index) => {
        setSeleTab(index);
        setActive(!active);
    };
  return (
    <>
        <div className="pageContainer">
            <div class="tablo">
                <button className={seleTab === 0 ? "tablinko active" : "tablinko"} onClick={() => handleTaClick(0)}>Add</button>
                <button className={seleTab === 1 ? "tablinko active" : "tablinko"} onClick={() => handleTaClick(1)}>Assign</button>
                <button className={seleTab === 2 ? "tablinko active" : "tablinko"} onClick={() => handleTaClick(2)}>Class </button>
            </div>
            {seleTab === 0 && <div id="add" class="tabcontento animate-bottom mt-4">
                <Data />
            </div>
            }
            {seleTab === 1 && <div id="assign" class="tabcontento animate-bottom mt-4">
                <AssignData />
            </div>
            }
            {seleTab === 2 && <div id="class" class="tabcontento animate-bottom mt-4">
                <ClassTData />
            </div>
            }
        </div>
    </>
  )
}

export default Tabs