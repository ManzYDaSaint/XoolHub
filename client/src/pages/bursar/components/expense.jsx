"use client";

import { useState, useEffect } from "react";
import {
  PlusCircle,
  DollarSign,
  TrendingUp,
  Calendar,
  CreditCard,
  Pencil,
  Trash,
} from "lucide-react";
import XpenseTable from "./expenseTable";
import FormInput from "../../../components/input/formInput";
import { useSelector, useDispatch } from "react-redux";
import {
  setExpenseFormData,
  setIsEditMode,
  setEditItemId,
} from "../../../helpers/examination/examSlice.jsx";
import api from "../../../services/apiServices";
import toast, { Toaster } from "react-hot-toast";
import CountUp from "react-countup";

// Sample data for expenses
// const expensesData = [
//   {
//     id: 1,
//     date: "2025-03-15",
//     category: "Supplies",
//     description: "Classroom materials",
//     amount: 250.0,
//     status: "Approved",
//   },
//   {
//     id: 2,
//     date: "2025-03-12",
//     category: "Equipment",
//     description: "Projector repair",
//     amount: 175.5,
//     status: "Pending",
//   },
//   {
//     id: 3,
//     date: "2025-03-10",
//     category: "Transportation",
//     description: "Field trip buses",
//     amount: 450.0,
//     status: "Approved",
//   },
//   {
//     id: 4,
//     date: "2025-03-05",
//     category: "Utilities",
//     description: "Electricity bill",
//     amount: 320.75,
//     status: "Approved",
//   },
//   {
//     id: 5,
//     date: "2025-03-01",
//     category: "Maintenance",
//     description: "Plumbing repairs",
//     amount: 180.25,
//     status: "Rejected",
//   },
// ];

// Summary data

const ExpensesPage = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const expenseFormData = useSelector((state) => state.exam.expenseFormData);
  const dispatch = useDispatch();
  const isEditMode = useSelector((state) => state.exam.isEditMode);
  const editItemId = useSelector((state) => state.exam.editItemId);
  const [sum, setSum] = useState(0);
  const [count, setCount] = useState(0);
  const [avg, setAvg] = useState(0);

  const summaryData = [
    {
      title: "Total Expenses",
      value: sum,
      icon: <DollarSign className="h-5 w-5" />,
      trend: "+12.5%",
      color: "bg-blue-500",
    },
    {
      title: "Monthly Average",
      value: avg,
      icon: <TrendingUp className="h-5 w-5" />,
      trend: "-3.2%",
      color: "bg-purple-500",
    },
    {
      title: "Pending Approvals",
      value: count,
      icon: <Calendar className="h-5 w-5" />,
      trend: "0",
      color: "bg-amber-500",
    },
  ];

  const handleAddExpense = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setExpenseFormData({
      date: "",
      category: "",
      description: "",
      amount: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setExpenseFormData({
        ...expenseFormData,
        [name]: value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expenseFormData);
    handleCloseModal();
  };

  const onSubmit = async (data) => {
    try {
      if (editItemId) {
        const res = await api.updateExpense(editItemId, data);
        if (res.data.success === true) {
          fetchData();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await api.insertExpense(data);
        if (res.data.success === true) {
          fetchData();
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      fetchCount();
      fetchSum();
      fetchAvg();
      dispatch(
        setExpenseFormData({
          date: "",
          description: "",
          category: "",
          amount: "",
        })
      );
      dispatch(setIsEditMode(false));
      dispatch(setEditItemId(""));
    }
  };

  const fetchData = async () => {
    const res = await api.getExpense();
    const expensesData = res.data.expense;
    if (expensesData.length === 0) {
      const info = expensesData.map(() => ({
        sr: "",
        date: "No records found...",
        category: "",
        description: "",
        amount: "",
        status: "",
        action: "",
      }));
      setData(info);
    } else {
      const info = expensesData.map((item, index) => ({
        sr: index + 1,
        date: item.date,
        category: item.category,
        description: item.description,
        amount: item.amount,
        status: (
          <span
            className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold leading-5 ${
              item.status === "Approved"
                ? "bg-green-100 text-green-800"
                : item.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {item.status}
          </span>
        ),
        action: (
          <div>
            {item.status === "Approved" ? (
              ""
            ) : (
              <span>
                {" "}
                <button
                  onClick={() => handleEdit(item.id)}
                  className="action_icon"
                >
                  <Pencil size={18} className="action_edit" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="action_icon"
                >
                  <Trash size={18} className="action_delete" />
                </button>
              </span>
            )}
          </div>
        ),
      }));
      setData(info);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleEdit = async (id) => {
    handleAddExpense();
    const res = await api.editExpense(id);
    dispatch(
      setExpenseFormData({
        date: res.data.edit.date,
        description: res.data.edit.description,
        category: res.data.edit.category,
        amount: res.data.edit.amount,
      })
    );
    dispatch(setIsEditMode(true));
    dispatch(setEditItemId(res.data.edit.id));
  };

  //   Handle Delete
  const handleDelete = async (id) => {
    try {
      const res = await api.deleteExpense(id);
      if (res.data.success === true) {
        fetchData();
        fetchCount();
        fetchSum();
        fetchAvg();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  const fetchSum = async () => {
    const res = await api.sumExpense();
    const sum = res.data.sum;
    setSum(sum.sam || 0);
  };

  useEffect(() => {
    fetchSum();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchCount = async () => {
    const res = await api.countExpense();
    const count = res.data.count;
    setCount(count.conta || 0);
  };

  useEffect(() => {
    fetchCount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchAvg = async () => {
    const res = await api.avgExpense();
    const count = res.data.avg;
    setAvg(count.average || 0);
  };

  useEffect(() => {
    fetchAvg();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex bg-gray-100 pb-3">
      <Toaster />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between shadow p-4">
          <div>
            <h1
              className="text-lg font-semibold"
              style={{ fontFamily: "'Poppins', san-serif" }}
            >
              Expenses Management
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage all school expenses
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <button
              onClick={handleAddExpense}
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Expense
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 px-10">
          {summaryData.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-white shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${item.color} text-white`}
                  >
                    {item.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">
                      {item.title}
                    </p>
                    <div className="flex items-baseline">
                      <p className="text-2xl font-semibold text-gray-900">
                        {/* {item.value} */}
                        <CountUp
                          start={0}
                          end={item.value}
                          duration={2.5}
                          separator=","
                        />
                      </p>
                      <p className="ml-2 text-sm font-medium text-green-600">
                        {item.trend}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Expenses Table */}
        <div className="p-6 bg-white shadow-lg rounded-lg mx-10">
          <XpenseTable Data={data} />
        </div>
      </div>

      {/* Add Expense Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start py-5">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 mb-5">
                      Add New Expense
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="formGroup">
                          <FormInput
                            label={"Date"}
                            type="date"
                            name="date"
                            required
                            value={expenseFormData.date}
                            onChange={handleInputChange}
                          />
                          <FormInput
                            label={"Amount (MK)"}
                            type="number"
                            name="amount"
                            required
                            value={expenseFormData.amount}
                            onChange={handleInputChange}
                            placeholder={"0.00"}
                          />
                        </div>
                        <div className="formInputContainer">
                          <label htmlFor={"Category"}>Category</label>
                          <div className="inputContainer">
                            <select
                              id="category"
                              name="category"
                              required
                              value={expenseFormData.category}
                              onChange={handleInputChange}
                            >
                              <option value="">Select a category</option>
                              <option value="supplies">Supplies</option>
                              <option value="equipment">Equipment</option>
                              <option value="transportation">
                                Transportation
                              </option>
                              <option value="utilities">Utilities</option>
                              <option value="maintenance">Maintenance</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <FormInput
                          label={"Description"}
                          type="text"
                          name="description"
                          required
                          value={expenseFormData.description}
                          onChange={handleInputChange}
                          placeholder={"Type description here..."}
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 pb-5 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {isEditMode ? "Update Expense" : "Add Expense"}
                </button>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpensesPage;
