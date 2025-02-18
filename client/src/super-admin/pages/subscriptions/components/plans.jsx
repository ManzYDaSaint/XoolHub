import React, { useState, useEffect } from 'react';
import api from '../../../../services/apiServices';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setSubscriptionData } from '../../../../helpers/examination/examSlice';
import FormInput from '../../../../components/input/formInput';
import FormButton from '../../../../components/input/formButton';

const Plans = ({ fetchData }) => {
    const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);
    const [features, setFeatures] = useState(['']);
    const subscriptionData = useSelector((state) => state.exam.subscriptionData || { name: '', price: '', features: [] });
    const dispatch = useDispatch();

    useEffect(() => {
        setFeatures(subscriptionData.features || ['']);
    }, [subscriptionData.features]);
    
    const handleFeatureChange = (index, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index] = value;
        setFeatures(updatedFeatures);
        dispatch(
            setSubscriptionData({
                ...subscriptionData,
                features: updatedFeatures,
            })
        );
    };

    const addFeatureField = () => setFeatures([...features, '']);
    
    const handleSubmit = async (data) => {
        if(isEditMode) {
            const res = await api.updatePlan(editItemId, data);
            if (res.data.success === true) {
                fetchData();
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
            dispatch(setSubscriptionData({ name: '', price: '', features: [''] }));
            setFeatures(['']);
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
            dispatch(setSubscriptionData({ name: '', price: '', features: [''] }));
            setFeatures(['']);
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
        <form onSubmit={onSubmit}>
            <div className="formGroup">
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
            </div>
            {features.map((feature, index) => (
            <div className="formGroup mt-3">
                <FormInput 
                    type="text"
                    value={features[index]}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    label={'Features'}
                    placeholder={'Type feature'}
                />
            </div>
            ))}
            <div className="button_group">
            <FormButton
              onClick={addFeatureField}
              id={'rowButton'}
              icon={'plus'}
              type={'button'}
            />
            <FormButton label={isEditMode ? "Update Subscription Plan" : "Add Subscription Plan"} id="tyepButton" icon="plus" />
            </div>
        </form>
        </>
    );
};

export default Plans;