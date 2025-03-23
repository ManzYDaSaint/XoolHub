"use client";

import { useState, useEffect } from "react";
import {
  PlusCircle,
  DollarSign,
  TrendingUp,
  Calendar,
  CreditCard,
} from "lucide-react";
import XpenseTable from "./expenseTable";

// Sample data for expenses
const expensesData = [
  {
    id: 1,
    date: "2025-03-15",
    category: "Supplies",
    description: "Classroom materials",
    amount: 250.0,
    status: "Approved",
  },
  {
    id: 2,
    date: "2025-03-12",
    category: "Equipment",
    description: "Projector repair",
    amount: 175.5,
    status: "Pending",
  },
  {
    id: 3,
    date: "2025-03-10",
    category: "Transportation",
    description: "Field trip buses",
    amount: 450.0,
    status: "Approved",
  },
  {
    id: 4,
    date: "2025-03-05",
    category: "Utilities",
    description: "Electricity bill",
    amount: 320.75,
    status: "Approved",
  },
  {
    id: 5,
    date: "2025-03-01",
    category: "Maintenance",
    description: "Plumbing repairs",
    amount: 180.25,
    status: "Rejected",
  },
];

// Summary data
const summaryData = [
  {
    title: "Total Expenses",
    value: "$1,376.50",
    icon: <DollarSign className="h-5 w-5" />,
    trend: "+12.5%",
    color: "bg-blue-500",
  },
  {
    title: "Monthly Average",
    value: "$458.83",
    icon: <TrendingUp className="h-5 w-5" />,
    trend: "-3.2%",
    color: "bg-purple-500",
  },
  {
    title: "Pending Approvals",
    value: "1",
    icon: <Calendar className="h-5 w-5" />,
    trend: "0",
    color: "bg-amber-500",
  },
];

const ExpensesPage = () => {
  const [expenses, setExpenses] = useState(expensesData);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [newExpense, setNewExpense] = useState({
    date: "",
    category: "",
    description: "",
    amount: "",
  });

  const handleAddExpense = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setNewExpense({
      date: "",
      category: "",
      description: "",
      amount: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({
      ...newExpense,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId =
      expenses.length > 0 ? Math.max(...expenses.map((exp) => exp.id)) + 1 : 1;

    const expenseToAdd = {
      id: newId,
      ...newExpense,
      amount: Number.parseFloat(newExpense.amount),
      status: "Pending",
    };

    setExpenses([...expenses, expenseToAdd]);
    handleCloseModal();
  };

  useEffect(() => {
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
        action: "",
      }));
      setData(info);
    }
  }, []);

  return (
    <div className="flex bg-gray-100 pb-3">
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
                        {item.value}
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
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <CreditCard className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Add New Expense
                    </h3>
                    <div className="mt-2">
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label
                            htmlFor="date"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Date
                          </label>
                          <input
                            type="date"
                            name="date"
                            id="date"
                            required
                            value={newExpense.date}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="category"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Category
                          </label>
                          <select
                            id="category"
                            name="category"
                            required
                            value={newExpense.category}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                          >
                            <option value="">Select a category</option>
                            <option value="Supplies">Supplies</option>
                            <option value="Equipment">Equipment</option>
                            <option value="Transportation">
                              Transportation
                            </option>
                            <option value="Utilities">Utilities</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows={3}
                            required
                            value={newExpense.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                            placeholder="Brief description of the expense"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Amount ($)
                          </label>
                          <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="text-gray-500 sm:text-sm">
                                $
                              </span>
                            </div>
                            <input
                              type="number"
                              name="amount"
                              id="amount"
                              required
                              value={newExpense.amount}
                              onChange={handleInputChange}
                              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                              placeholder="0.00"
                              step="0.01"
                              min="0"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Add Expense
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
