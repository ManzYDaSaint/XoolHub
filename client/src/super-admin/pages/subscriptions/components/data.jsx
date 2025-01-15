import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import FormButton from '../../../../components/input/formButton.jsx'
import api from '../../../../services/apiServices.jsx'
import { toast } from 'react-hot-toast'
import PlanTable from './table.jsx'
import Plans from './plans.jsx'
import { Pencil, Trash } from 'lucide-react'
import { setSubscriptionData } from '../../../../helpers/examination/examSlice.jsx'
import { useDispatch } from 'react-redux'
import { setIsEditMode, setEditItemId } from '../../../../helpers/examination/examSlice.jsx'

const PlanData = () => {
    const dispatch = useDispatch();
    const [planData, setPlanData] = useState([]);
    const [showPlan, setShowPlan] = useState(false);
    const handlePlanOpen = () => { setShowPlan(true); };
    const handlePlanClose = () => { setShowPlan(false); };

    // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getSubscription();
    const data = res.data.plan;
    if(data.length === 0) {
        const planData = data.map((item, index) => ({
        sr: "",
        name: "No records found...",
        price: "",
        features: "",
        actions: ""
        }));
        setPlanData(planData);
    }
    else {        
        const planData = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        price: `MK${item.price}`,
        features: item.features.join(', '),
        actions: (
            <div>
            <button onClick={() => handleEdit(item.id)} className='action_icon'><Pencil size={18} className='action_edit' /></button>
            <button onClick={() => handleDelete(item.id)} className='action_icon'><Trash size={18} className='action_delete' /></button>
            </div>
        ),
        }));
        setPlanData(planData);
    }
  };

  useEffect(() => {
      fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
      
    //   Handle Delete
    const handleDelete = async (id) => {
        try {
            const res = await api.deletePlan(id);
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

    const handleEdit = async (id) => {
        setShowPlan(true);
        const res = await api.editPlan(id);
        dispatch(
            setSubscriptionData({
                name: res.data.edit.name || '',
                price: res.data.edit.price || '',
                features: Array.isArray(res.data.edit.features)
                    ? res.data.edit.features
                    : [], // Ensure it is an array of strings
            })
        );
        dispatch(setIsEditMode(true));
        dispatch(setEditItemId(res.data.edit.id || ''));
    };
    


  return (
    <>
        <div className="div" style={{ display: showPlan ? 'none' : 'block' }}>
            <button type="button" onClick={handlePlanOpen} 
            class="add__rows__btn">
            <Icon name='plus' className='plus' />
            Add
            </button>
        </div>
        <div className="toggleDiv" style={{ display: showPlan ? 'block' : 'none' }}>
            <Plans fetchData={fetchData} />
            <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handlePlanClose}
            />
        </div>
        <table className="custom__table table-hover mt-3" id="student__table">
            <PlanTable planData={planData} />
        </table>
    </>
  )
}

export default PlanData