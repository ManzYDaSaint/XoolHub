import React, { useState, useEffect } from "react";
import FormButton from "../../../../components/input/formButton.jsx";
import api from "../../../../services/apiServices.jsx";
import { toast } from "react-hot-toast";
import PlanTable from "./table.jsx";
import Plans from "./plans.jsx";
import { Pencil, Plus, Trash } from "lucide-react";
import { setSubscriptionData } from "../../../../helpers/examination/examSlice.jsx";
import { useDispatch } from "react-redux";
import {
  setIsEditMode,
  setEditItemId,
} from "../../../../helpers/examination/examSlice.jsx";

const PlanData = () => {
  const dispatch = useDispatch();
  const [planData, setPlanData] = useState([]);
  const [showPlan, setShowPlan] = useState(false);
  const handlePlanOpen = () => {
    setShowPlan(true);
  };
  const handlePlanClose = () => {
    setShowPlan(false);
  };

  // Fetch all the exams
  const fetchData = async () => {
    const res = await api.getSubscription();
    const data = res.data.plan;
    if (data.length === 0) {
      const planData = data.map((item, index) => ({
        sr: "",
        name: "No records found...",
        price: "",
        max: "",
        actions: "",
      }));
      setPlanData(planData);
    } else {
      const planData = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        price: `MK${item.price}`,
        pilot_price: item.pilot_enabled ? `MK${item.pilot_price}` : 'N/A',
        pilot_status: item.pilot_enabled ? (
          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Enabled</span>
        ) : (
          <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">Disabled</span>
        ),
        max: item.features,
        actions: (
          <div>
            <button onClick={() => handleEdit(item.id)} className="action_icon">
              <Pencil size={18} color="green" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="ml-2"
            >
              <Trash size={18} color="red" />
            </button>
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
      toast.error("An error occurred. Please try again.");
    }
  };

  const handleEdit = async (id) => {
    setShowPlan(true);
    const res = await api.editPlan(id);
    dispatch(
      setSubscriptionData({
        name: res.data.edit.name || "",
        price: res.data.edit.price || "",
        max: res.data.edit.features || "",
        pilot_price: res.data.edit.pilot_price || "",
        pilot_discount_percentage: res.data.edit.pilot_discount_percentage || 50.00,
        pilot_initial_payment_percentage: res.data.edit.pilot_initial_payment_percentage || 33.33,
        pilot_enabled: res.data.edit.pilot_enabled || false,
        max_students: res.data.edit.max_students || "",
        duration_months: res.data.edit.duration_months || 12,
        is_active: res.data.edit.is_active !== undefined ? res.data.edit.is_active : true,
      })
    );
    dispatch(setIsEditMode(true));
    dispatch(setEditItemId(res.data.edit.id || ""));
  };

  return (
    <>
      <div className="div" style={{ display: showPlan ? "none" : "block" }}>
        <button
          type="button"
          onClick={handlePlanOpen}
          className="flex items-center bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 px-4 py-2 text-white text-sm gap-2 rounded-md"
        >
          <Plus size={15} className="plus" />
          Add
        </button>
      </div>
      <div
        className="toggleDiv"
        style={{ display: showPlan ? "block" : "none" }}
      >
        <Plans fetchData={fetchData} />
        <FormButton label={"Close"} id={"closeBtn"} onClick={handlePlanClose} />
      </div>
      <PlanTable planData={planData} />
    </>
  );
};

export default PlanData;
