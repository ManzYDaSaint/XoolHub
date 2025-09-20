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
    const subscriptionData = useSelector((state) => state.exam.subscriptionData || { 
        name: '', 
        price: '', 
        max: '', 
        pilot_price: '', 
        pilot_discount_percentage: 50.00, 
        pilot_initial_payment_percentage: 33.33, 
        pilot_enabled: false, 
        max_students: '', 
        duration_months: 12, 
        is_active: true 
    });
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
            dispatch(setSubscriptionData({ 
                name: '', 
                price: '', 
                max: '', 
                pilot_price: '', 
                pilot_discount_percentage: 50.00, 
                pilot_initial_payment_percentage: 33.33, 
                pilot_enabled: false, 
                max_students: '', 
                duration_months: 12, 
                is_active: true 
            }));
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
            dispatch(setSubscriptionData({ 
                name: '', 
                price: '', 
                max: '', 
                pilot_price: '', 
                pilot_discount_percentage: 50.00, 
                pilot_initial_payment_percentage: 33.33, 
                pilot_enabled: false, 
                max_students: '', 
                duration_months: 12, 
                is_active: true 
            }));
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        dispatch(
            setSubscriptionData({
                ...subscriptionData,
                [name]: type === 'checkbox' ? checked : value,
            })
        );
    };

    // Auto-calculate pilot price when original price changes
    const handlePriceChange = (e) => {
        const { value } = e.target;
        const pilotDiscount = subscriptionData.pilot_discount_percentage || 50.00;
        const pilotPrice = value ? (parseFloat(value) * (1 - pilotDiscount / 100)).toFixed(2) : '';
        
        dispatch(
            setSubscriptionData({
                ...subscriptionData,
                price: value,
                pilot_price: pilotPrice,
            })
        );
    };

    // Auto-calculate pilot price when discount percentage changes
    const handleDiscountChange = (e) => {
        const { value } = e.target;
        const originalPrice = subscriptionData.price || 0;
        const pilotPrice = originalPrice ? (parseFloat(originalPrice) * (1 - value / 100)).toFixed(2) : '';
        
        dispatch(
            setSubscriptionData({
                ...subscriptionData,
                pilot_discount_percentage: value,
                pilot_price: pilotPrice,
            })
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(subscriptionData);
    };

    return (
        <>
        <form onSubmit={onSubmit} className='w-full space-y-6 pb-4'>
            {/* Basic Plan Information */}
            <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Plan Information</h3>
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
                        onChange={handlePriceChange}
                        label="Original Price (MK)"
                        placeholder={'0.00'}
                    />
                    <FormInput 
                        type="text"
                        name="max"
                        value={subscriptionData.max}
                        onChange={handleChange}
                        label="Features Description"
                        placeholder={'Describe plan features'}
                    />
                </div>
            </div>

            {/* Pilot Program Configuration */}
            <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-blue-800">Pilot Program Configuration</h3>
                
                <div className="mb-4">
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="pilot_enabled"
                            checked={subscriptionData.pilot_enabled}
                            onChange={handleChange}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-gray-700">Enable Pilot Program for this plan</span>
                    </label>
                </div>

                {subscriptionData.pilot_enabled && (
                    <div className="grid grid-cols-2 gap-4">
                        <FormInput 
                            type="number"
                            name="pilot_discount_percentage"
                            value={subscriptionData.pilot_discount_percentage}
                            onChange={handleDiscountChange}
                            label="Pilot discount (%)"
                            placeholder={'50.00'}
                        />
                        <FormInput 
                            type="number"
                            name="pilot_price"
                            value={subscriptionData.pilot_price}
                            onChange={handleChange}
                            label="Pilot Price (MK)"
                            placeholder={'0.00'}
                            disabled={true}
                        />
                        <FormInput 
                            type="number"
                            name="pilot_initial_payment_percentage"
                            value={subscriptionData.pilot_initial_payment_percentage}
                            onChange={handleChange}
                            label="Initial Payment (%)"
                            placeholder={'33.33'}
                        />
                        <FormInput 
                            type="number"
                            name="max_students"
                            value={subscriptionData.max_students}
                            onChange={handleChange}
                            label="Max Students"
                            placeholder={'100'}
                        />
                    </div>
                )}
            </div>

            {/* Plan Settings */}
            <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4 text-green-800">Plan Settings</h3>
                <div className="grid grid-cols-2 gap-4">
                    <FormInput 
                        type="number"
                        name="duration_months"
                        value={subscriptionData.duration_months}
                        onChange={handleChange}
                        label="Duration (Months)"
                        placeholder={'12'}
                    />
                    <div className="flex items-center space-x-2">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="is_active"
                                checked={subscriptionData.is_active}
                                onChange={handleChange}
                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Plan is active</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Pricing Summary */}
            {subscriptionData.pilot_enabled && subscriptionData.price && (
                <div className="bg-yellow-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-yellow-800">Pricing Summary</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                            <span className="font-medium">Original Price:</span>
                            <p className="text-lg font-bold text-gray-800">MK {parseFloat(subscriptionData.price || 0).toLocaleString()}</p>
                        </div>
                        <div>
                            <span className="font-medium">Pilot Price:</span>
                            <p className="text-lg font-bold text-blue-600">MK {parseFloat(subscriptionData.pilot_price || 0).toLocaleString()}</p>
                        </div>
                        <div>
                            <span className="font-medium">Initial Payment:</span>
                            <p className="text-lg font-bold text-green-600">MK {parseFloat(subscriptionData.pilot_price * (subscriptionData.pilot_initial_payment_percentage / 100) || 0).toLocaleString()}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="button_group">
            <FormButton label={isEditMode ? "Update Subscription Plan" : "Add Subscription Plan"} id="tyepButton" icon="plus" />
            </div>
        </form>
        </>
    );
};

export default Plans;