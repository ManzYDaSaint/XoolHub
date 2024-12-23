import React, { useState, useEffect } from 'react'
import FeesForm from './feesForm.jsx'
import FeesTable from './feesTable.jsx'
import { Icon } from 'semantic-ui-react'
import FormButton from '../../../components/input/formButton.jsx'
import api from '../../../services/apiServices.jsx'
import { useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setFeesFormData } from '../../../helpers/examination/examSlice.jsx';
import { toast } from 'react-hot-toast';

const FeesData = () => {
    const dispatch = useDispatch();
    const [feesData, setFeesData] = useState([]);
    const [showFees, setShowFees] = useState(false);
    const handleFeesOpen = () => { setShowFees(true); };
    const handleFeesClose = () => { setShowFees(false); };

      // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getFee();
    const data = res.data.fee;
    if(data.length < 1) {
        const feesData = data.map((item, index) => ({
        sr: "",
        name: "No records found...",
        amount: "",
        description: "",
        actions: ""
        }));
        setFeesData(feesData);
    }
    else {
        const feesData = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        amount: item.amount,
        description: item.description,
        actions: (
            <div>
            <button onClick={() => handleEdit(item.feeid)} className='action_icon'><Icon name='pencil' className='action_edit' /></button>
            <button onClick={() => handleDelete(item.feeid)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
            </div>
        ),
        }));
        setFeesData(feesData);
    }
  };

  useEffect(() => {
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Get One exam
    const handleEdit = async(id) => {
        setShowFees(true);
        const res = await api.editFee(id);
        dispatch(setFeesFormData({
            name: res.data.edit.name,
            amount: res.data.edit.amount,
            description: res.data.edit.description,
        }));
        dispatch(setIsEditMode(true));
        dispatch(setEditItemId(res.data.edit.feeid));
    };
      
    //   Handle Delete
    const handleDelete = async (id) => {
        try {
            const res = await api.deleteFee(id);
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
        <div className="div" style={{ display: showFees ? 'none' : 'block' }}>
            <button type="button" onClick={handleFeesOpen} 
            class="add__rows__btn">
            <Icon name='plus' className='plus' />
            Add
            </button>
        </div>
        <div className="toggleDiv" style={{ display: showFees ? 'block' : 'none' }}>
            <FeesForm fetchData={fetchData} />
            <FormButton 
              label={'Close'}
              id={'closeBtn'}
              onClick={handleFeesClose}
            />
        </div>
        <table className="custom__table table-hover mt-3 w-100" id="fees__table">
            <FeesTable setShowFees={setShowFees} feesData={feesData} fetchData={fetchData} />
        </table>
    </>
  )
}

export default FeesData