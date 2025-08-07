import React from 'react';
import api from '../../../../services/apiServices';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setSubscriptionData } from '../../../../helpers/examination/examSlice';
import FormInput from '../../../../components/input/formInput';
import FormButton from '../../../../components/input/formButton';

const Plans = ({ fetchData }) => {
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);
    const subscriptionData = useSelector((state) => state.exam.subscriptionData || { name: '', price: '', max: '' });
    const dispatch = useDispatch();
    
    const handleSubmit = async (data) => {
        if(isEditMode) {
            const res = await api.updatePlan(editItemId, data);
            if (res.data.success === true) {
                fetchData();
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
            dispatch(setSubscriptionData({ name: '', price: '', max: '' }));
            dispatch(setIsEditMode(false));
            dispatch(setEditItemId(null));
        } else {
            const res = await api.addSubscription(data);
            if (res.data.success === true) {
                fetchData();
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
            dispatch(setSubscriptionData({ name: '', price: '', max: '' }));
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch(
            setSubscriptionData({
                ...subscriptionData,
                [name]: value,
            })
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(subscriptionData);
    };

    return (
        <>
        <form onSubmit={onSubmit} className='w-1/2 space-y-4 pb-4'>
            <div className="grid grid-cols-3 gap-4">
                <FormInput
                    type="text"
                    name="name"
                    value={subscriptionData.name}
                    onChange={handleChange}
                    label="Subscription Name"
                    placeholder={'Type subscription name'}
                />
                <FormInput 
                    type="number"
                    name="price"
                    value={subscriptionData.price}
                    onChange={handleChange}
                    label="Price (MK)"
                    placeholder={'0.00'}
                />
                <FormInput 
                    type="number"
                    name="max"
                    value={subscriptionData.max}
                    onChange={handleChange}
                    label="Maximum Students"
                    placeholder={'0'}
                />
            </div>

            <div className="button_group">
            <FormButton label={isEditMode ? "Update Subscription Plan" : "Add Subscription Plan"} id="tyepButton" icon="plus" />
            </div>
        </form>
        </>
    );
};

export default Plans;