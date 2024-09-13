import React, { useState, useEffect } from 'react'

const TeacherTabs = () => {
    const [seleTab, setSeleTab] = useState(0);
    const [active, setActive] = useState(0);

    const handleTaClick = (index) => {
        setSeleTab(index);
        setActive(!active);
    };
  return (
    <>
        <div className="settingContent">
            <div class="tablo">
                <button className={seleTab === 0 ? "tablinko active" : "tablinko"} onClick={() => handleTaClick(0)}>Add</button>
                <button className={seleTab === 1 ? "tablinko active" : "tablinko"} onClick={() => handleTaClick(1)}>Assign</button>
                <button className={seleTab === 2 ? "tablinko active" : "tablinko"} onClick={() => handleTaClick(2)}>Class </button>
            </div>
        </div>
        {/* {seleTab === 0 && <div id="JCE" class="tabcontento animate-bottom mt-4">
            <div className="div" style={{ display: showJCE ? 'none' : 'block' }}>
            <button type="button" onClick={handleJCEOpen} 
                class="add__rows__btn">
                <Icon name='plus' className='plus' />
                Add
            </button>
            </div>
            <div className="toggleDiv" style={{ display: showJCE ? 'block' : 'none' }}>
            <JceForm fetchJCE={fetchJCE}/>
            <FormButton 
                label={'Close'}
                id={'closeBtn'}
                onClick={handleJCEClose}
            />
            </div>
            <table class="customo__table table-hover mt-3" id="JCE__remark__table">
            <JCETable setShowJCE={setShowJCE} jceData={jceData}/>
            </table>
        </div>
        } */}
    </>
  )
}

export default TeacherTabs