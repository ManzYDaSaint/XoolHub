import React, { useState, useEffect } from "react";
import FormButton from "../../components/input/formButton.jsx";
import api from "../../services/apiServices.jsx";
import { toast, Toaster } from "react-hot-toast";
import DisciplinaryForm from "./disciplinaryForm.jsx";
import DisciplinaryTable from "./disciplinaryTable.jsx";
import { FilePenLine, Plus, Trash, AlertTriangle, Shield, Users } from "lucide-react";

const DisciplinaryData = () => {
  const [disciplinaryData, setDisciplinaryData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0
  });

  const handleFormOpen = () => {
    setShowForm(true);
    setIsEditMode(false);
    setEditingRecord(null);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setIsEditMode(false);
    setEditingRecord(null);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this disciplinary record?")) {
      try {
        setLoading(true);
        const response = await api.deleteDisciplinary(id);
        if (response.data.success) {
          toast.success("Disciplinary record deleted successfully");
          fetchData();
        } else {
          toast.error(response.data.message || "Failed to delete record");
        }
      } catch (error) {
        console.error("Delete error:", error);
        toast.error("Failed to delete disciplinary record");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = (record) => {
    setEditingRecord(record);
    setIsEditMode(false);
    setShowForm(true);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.getDisciplinary();
      if (response.data.success) {
        const data = response.data.disciplinary || [];
        const formattedData = data.map((item, index) => ({
          sr: index + 1,
          studentName: item.studentName,
          studentClass: item.studentClass,
          category: item.category,
          action: item.action,
          date: new Date(item.date).toLocaleDateString(),
          status: item.status,
          severity: item.severity,
          remarks: item.remarks,
          actions: (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleView(item)}
                className="action_icon"
                title="View Details"
              >
                <FilePenLine size={18} color="blue" />
              </button>
              <button
                onClick={() => handleEdit(item)}
                className="action_icon"
                title="Edit Record"
              >
                <FilePenLine size={18} color="green" />
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="action_icon"
                title="Delete Record"
              >
                <Trash size={18} color="red" />
              </button>
            </div>
          ),
        }));
        setDisciplinaryData(formattedData);
         
        // Calculate stats
        const total = data.length;
        const pending = data.filter(item => item.status === 'Pending').length;
        const resolved = data.filter(item => item.status === 'Resolved').length;
        setStats({ total, pending, resolved });
      } else {
        setDisciplinaryData([]);
        setStats({ total: 0, pending: 0, resolved: 0 });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch disciplinary records");
      setDisciplinaryData([]);
    } finally {
      setLoading(false);
    }
  }; 

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50">
      <Toaster />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm">
          <div className="px-8 py-6 pl-20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-red-800 to-orange-800 bg-clip-text text-transparent">
                    Disciplinary Management
                  </h1>
                  <p className="text-gray-600 font-medium">
                    Manage student disciplinary records and maintain school discipline
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <FormButton
                  label="Add New Record"
                  onClick={handleFormOpen}
                  className="group flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-600 text-white rounded-xl hover:from-red-600 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                >
                  <Plus size={18} className="group-hover:scale-110 transition-transform duration-200" />
                </FormButton>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className="px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
                <div className="relative p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                      <AlertTriangle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stats.total}</div>
                      <div className="text-gray-600 font-medium">Total Records</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50/50 to-orange-50/30"></div>
                <div className="relative p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stats.pending}</div>
                      <div className="text-gray-600 font-medium">Pending Cases</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
                <div className="relative p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-gray-900">{stats.resolved}</div>
                      <div className="text-gray-600 font-medium">Resolved Cases</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-orange-50/30"></div>
              <div className="relative p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl">
                    <FilePenLine className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Disciplinary Records</h3>
                </div>
                <DisciplinaryTable 
                  disciplinaryData={disciplinaryData} 
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Form Modal */}
        {showForm && (
          <DisciplinaryForm
            isOpen={showForm}
            onClose={handleFormClose}
            isEditMode={isEditMode}
            record={editingRecord}
            loading={loading}
            fetchData={fetchData}
          />
        )}
      </div>
    </div>
  );
};

export default DisciplinaryData;
