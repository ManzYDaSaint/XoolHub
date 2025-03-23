import React, { useState, useEffect } from "react";
import Modal from "./modal";
import api from "../../../services/apiServices";
import { Timer, CircleCheckBig, Trash2 } from "lucide-react";
import PayTable from "../../fees/components/payTable";
import PfForm from "./form";
import FormButton from "../../../components/input/formButton";
import { useDispatch } from "react-redux";
import {
  setIsEditMode,
  setEditItemId,
  setFeesFormData,
  setPayFormData,
} from "../../../helpers/examination/examSlice.jsx";
import FeesForm from "../../fees/components/feesForm.jsx";
import FeesTable from "../../fees/components/feesTable.jsx";
import { toast, Toaster } from "react-hot-toast";
import { Pencil, FilePen, Trash } from "lucide-react";

const FeePayments = () => {
  const dispatch = useDispatch();
  const [feesData, setFeesData] = useState([]);
  const [showFees, setShowFees] = useState(false);
  const handleFeesOpen = () => {
    setShowFees(true);
  };
  const handleFeesClose = () => {
    setShowFees(false);
  };
  const [payData, setPayData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddPayment = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchData = async () => {
    const res = await api.gettPay();
    const data = res.data.pay;
    if (data.length === 0) {
      const payData = data.map((item, index) => ({
        sr: "",
        date: "",
        name: "No records found...",
        term: "",
        class: "",
        fee: "",
        amount: "",
        status: "",
        actions: "",
      }));
      setPayData(payData);
    } else {
      const payData = data.map((item, index) => ({
        sr: index + 1,
        date: item.updated_at.slice(0, 10),
        name: item.student,
        term: item.term + " (" + item.year + ")",
        class: item.class,
        fee: item.fee,
        amount: item.paid,
        status: (
          <>
            {item.status === "Pending" ? (
              <>
                <Timer size={16} className="iconLucide" color="orange" />{" "}
                Ongoing
              </>
            ) : item.status === "Complete" ? (
              <>
                <CircleCheckBig
                  size={15}
                  className="iconLucide"
                  color="green"
                />{" "}
                Complete
              </>
            ) : (
              item.status
            )}
          </>
        ),
        actions: (
          <div className="flex items-center gap-1 justify-center">
            <button onClick={() => handlePayEdit(item.id)} className='action_icon'><FilePen size={18} className='action_edit' /></button>
            <button onClick={() => handlePayDelete(item.id)} className='action_icon'><Trash2 size={18} className='action_delete' /></button>
          </div>
        ),
      }));
      setPayData(payData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDa = async () => {
    const res = await api.getFee();
    const data = res.data.fee;
    if (data.length < 1) {
      const feesData = data.map((item, index) => ({
        sr: "",
        name: "No records found...",
        amount: "",
        description: "",
        actions: "",
      }));
      setFeesData(feesData);
    } else {
      const feesData = data.map((item, index) => ({
        sr: index + 1,
        name: item.name,
        amount: item.amount,
        description: item.description,
        actions: (
          <div>
            <button onClick={() => handleEdit(item.id)} className="action_icon">
              <Pencil className="action_edit" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="action_icon"
            >
              <Trash className="action_delete" />
            </button>
          </div>
        ),
      }));
      setFeesData(feesData);
    }
  };

  useEffect(() => {
    fetchDa();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = async (id) => {
    setShowFees(true);
    const res = await api.editFee(id);
    dispatch(
      setFeesFormData({
        name: res.data.edit.name,
        amount: res.data.edit.amount,
        description: res.data.edit.description,
      })
    );
    dispatch(setIsEditMode(true));
    dispatch(setEditItemId(res.data.edit.id));
  };

  //   Handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await api.deleteFee(id);
      if (res.data.success === true) {
        fetchDa();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };


 const handlePayEdit = async(id) => {
          setIsModalOpen(true);
          const res = await api.editPay(id);
          dispatch(setPayFormData({
              paid: res.data.edit.paid,
              term: res.data.edit.termid,
              feeid: res.data.edit.feeid,
          }));
          dispatch(setIsEditMode(true));
          dispatch(setEditItemId(res.data.edit.id));
      };
        
      //   Handle Delete
      const handlePayDelete = async (id) => {
          try {
              const res = await api.deletePay(id);
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
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <Toaster />
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Fee Payments</h2>
          <p className="text-sm text-gray-500">View all recent fee payments</p>
        </div>
        <div className="flex justify-between items-center gap-4">
          <FormButton
            type={""}
            label={"Pay"}
            id={"rowButton"}
            onClick={handleAddPayment}
          />
          <div className="div" style={{ display: showFees ? "none" : "block" }}>
            <FormButton
              type={""}
              label={"+ Create"}
              id={"tyepButton"}
              onClick={handleFeesOpen}
            />
          </div>
        </div>
      </div>
      <div
        className="toggleDiv"
        style={{ display: showFees ? "block" : "none" }}
      >
        <FeesForm fetchData={fetchDa} />
        <FormButton label={"Close"} id={"closeBtn"} onClick={handleFeesClose} />
        <FeesTable
          setShowFees={setShowFees}
          feesData={feesData}
          fetchData={fetchDa}
        />
      </div>

      <PayTable payData={payData} />

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h3 className="text-lg font-bold mb-4">Add New Payment</h3>
        <PfForm fetchData={fetchData} setIsModalOpen={setIsModalOpen} />
      </Modal>
    </div>
  );
};

export default FeePayments;
