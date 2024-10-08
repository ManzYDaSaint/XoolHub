import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react';
import api from '../../services/apiServices.jsx'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import JCETable from './jceTable.jsx';
import JceForm from './jceForm.jsx'
import FormButton from '../../components/input/formButton.jsx';
import MsceForm from './msceForm.jsx'
import MSCETable from './msceTable.jsx'
import { setIsEditMode, setEditItemId, setJCEFormData, setMSCEFormData } from '../examination/examSlice.jsx';

const RemarkData = () => {
    const [active, setActive] = useState(0);
    const [seleTab, setSeleTab] = useState(0);
    const [showJCE, setShowJCE] = useState(false);
    const [showMSCE, setShowMSCE] = useState(false);
    const handleJCEClose = () => { setShowJCE(false); };
    const handleMSCEClose = () => { setShowMSCE(false); };
    const handleJCEOpen = () => { setShowJCE(true); };
    const handleMSCEOpen = () => { setShowMSCE(true); };
    const [msceData, setMSCEData] = useState([]);

    const handleTaClick = (index) => {
        setSeleTab(index);
        setActive(!active);
    };

    const dispatch = useDispatch();
    const [jceData, setJCEData] = useState([]);
  
    // Fetch all the exams
    const fetchJCE = async () => {
      const res = await api.getJCE();
      const data = res.data.jce;
      if(data.length === 0) {
          const jceData = data.map((item, index) => ({
          sr: "",
          denom: "",
          roof: "No records found...",
          floor: "",
          remark: "",
          actions: ""
          }));
          setJCEData(jceData);
      }
      else {
          const jceData = data.map((item, index) => ({
          sr: index + 1,
          denom: item.denom,
          roof: item.roof,
          floor: item.floor,
          remark: item.remark,
          actions: (
              <div>
              <button onClick={() => handleEdit(item.id)} className='action_icon'><Icon name='pencil' className='action_edit' /></button>
              <button onClick={() => handleDelete(item.id)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
              </div>
          ),
          }));
          setJCEData(jceData);
      }
    };
  
    useEffect(() => {
        fetchJCE();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  
  
    // Get One exam
    const handleEdit = async(id) => {
      setShowJCE(true);
      const res = await api.editJCE(id);
      dispatch(setJCEFormData({
        denom: res.data.edit.denom,
        roof: res.data.edit.roof,
        floor: res.data.edit.floor,
        remark: res.data.edit.remark,
      }));
      dispatch(setIsEditMode(true));
      dispatch(setEditItemId(res.data.edit.id));
    };
    
      //   Handle Delete
      const handleDelete = async (id) => {
        try {
            const res = await api.deleteJCE(id);
            if (res.data.success === true) {
                fetchJCE();
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
      };



        // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getMSCE();
    const data = res.data.msce;
    if(data.length > 0) {
      const msceData = data.map((item, index) => ({
        sr: index + 1,
        denom: item.denom,
        roof: item.roof,
        floor: item.floor,
        remark: item.remark,
        actions: (
            <div>
            <button onClick={() => handleEditr(item.id)} className='action_icon'><Icon name='pencil' className='action_edit' /></button>
            <button onClick={() => handleDeleter(item.id)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
            </div>
        ),
        }));
      setMSCEData(msceData);
    }
    else {
      const msceData = data.map((item, index) => ({
        sr: "",
        denom: "",
        roof: "",
        floor: "",
        remark: "No records found...",
        actions: ""
        }));
        setMSCEData(msceData);
    }
  };

  useEffect(() => {
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


    // Get One exam
    const handleEditr = async(id) => {
        setShowMSCE(true);
        const res = await api.editMSCE(id);
        dispatch(setMSCEFormData({
          denom: res.data.edit.denom,
          roof: res.data.edit.roof,
          floor: res.data.edit.floor,
          remark: res.data.edit.remark,
        }));
        dispatch(setIsEditMode(true));
        dispatch(setEditItemId(res.data.edit.id));
      };
      
    //   Handle Delete
    const handleDeleter = async (id) => {
        try {
            const res = await api.deleteMSCE(id);
            if (res.data.success === true) {
                fetchData();
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.');
        }
    };


  return (
    <>
        <div class="tablo">
            <button className={seleTab === 0 ? "tablinko active" : "tablinko"} onClick={() => handleTaClick(0)}>JCE </button>
            <button className={seleTab === 1 ? "tablinko active" : "tablinko"} onClick={() => handleTaClick(1)}>MSCE </button>
        </div>
        {seleTab === 0 && <div id="JCE" class="tabcontento animate-bottom mt-4">
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
        }
        {seleTab === 1 && <div id="MSCE" class="tabcontento animate-bottom mt-4">
            <div className="div" style={{ display: showMSCE ? 'none' : 'block' }}>
            <button type="button" onClick={handleMSCEOpen} 
                class="add__rows__btn">
                <Icon name='plus' className='plus' />
                Add
            </button>
            </div>
            <div className="toggleDiv" style={{ display: showMSCE ? 'block' : 'none' }}>
            <MsceForm fetchData={fetchData}/>
            <FormButton 
                label={'Close'}
                id={'closeBtn'}
                onClick={handleMSCEClose}
            />
            </div>
            <table class="customo__table table-hover mt-3" id="MSCE__remark__table">
            <MSCETable setShowMSCE={setShowMSCE} msceData={msceData} />
            </table>
        </div>
        }
    </>
  )
}

export default RemarkData