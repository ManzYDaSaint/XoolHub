import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import FormButton from '../../../components/input/formButton'
import api from '../../../services/apiServices'
import { useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setPayFormData } from '../../../helpers/examination/examSlice.jsx';
import { toast } from 'react-hot-toast';
import PfForm from './form.jsx'
import PfTable from './table.jsx'
import { useParams } from 'react-router-dom';

const PfData = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [payData, setPayData] = useState([]);
    const [showPay, setShowPay] = useState(false);
    const handlePayOpen = () => { setShowPay(true); };
    const handlePayClose = () => { setShowPay(false); };

      // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getPayee(id);

    const data = res.data.payee;
    if(data.length < 1) {
        const payData = data.map((item, index) => ({
        sr: "",
        date: "",
        fee: "No records found...",
        amount: "",
        paid: "",
        balance: "",
        actions: ""
        }));
        setPayData(payData);
    }
    else {
        const payData = data.map((item, index) => ({
        sr: index + 1,
        date: item.updated_at.slice(0, 10),
        fee: item.name,
        amount: item.amount,
        paid: item.paid,
        balance: item.balance,
        actions: (
            <div>
            <button onClick={() => handleEdit(item.pid)} className='action_icon'><Icon name='pencil' className='action_edit' /></button>
            <button onClick={() => handleDelete(item.pid)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
            </div>
        ),
        }));
        setPayData(payData);
    }
  };

  useEffect(() => {
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Get One exam
    const handleEdit = async(pid) => {
        setShowPay(true);
        const res = await api.editPay(pid);
        dispatch(setPayFormData({
            paid: res.data.edit.paid,
            amount: res.data.edit.amount,
        }));
        dispatch(setIsEditMode(true));
        dispatch(setEditItemId(res.data.edit.pid));
    };
      
    //   Handle Delete
    const handleDelete = async (pid) => {
        try {
            const res = await api.deletePay(pid);
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
        <div className="div" style={{ display: showPay ? 'none' : 'block' }}>
            <button type="button" onClick={handlePayOpen} 
            class="add__rows__btn">
            <Icon name='plus' className='plus' />
            Add
            </button>
        </div>
        <div className="toggleDiv" style={{ display: showPay ? 'block' : 'none' }}>
            <PfForm fetchData={fetchData} />
            <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handlePayClose}
            />
        </div>
        <table className="custom__table table-hover mt-3 w-100" id="year__table">
            <PfTable setShowPay={setShowPay} payData={payData} />
        </table>
    </>
  )
}

export default PfData