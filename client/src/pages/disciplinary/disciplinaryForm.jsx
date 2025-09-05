import React, { useState, useEffect } from 'react';
import FormInput from '../../components/input/formInput';
import FormButton from '../../components/input/formButton';
import FormSelect from '../../components/input/formSelect';
import { X, User, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import api from '../../services/apiServices';
import { useDispatch, useSelector } from 'react-redux';
import { setDisciplinaryFormData, setIsEditMode, setEditItemId } from '../../helpers/examination/examSlice.jsx';
import AutoSuggestInput from '../bursar/components/AutoSuggestInput';
import toast from 'react-hot-toast';

const DisciplinaryForm = ({ isOpen, onClose, loading, fetchData }) => {


  const [students, setStudents] = useState([]);
  const isEditMode = useSelector((state) => state.exam.isEditMode);
    const editItemId = useSelector((state) => state.exam.editItemId);
  const dispatch = useDispatch();
  const disciplinaryFormData = useSelector((state) => state.exam.disciplinaryFormData);

  useEffect(() => {
    // Fetch the list of students from the API
    const fetchStudents = async () => {
      try {
        const response = await api.gettStudent();
        setStudents(response.data.student);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleSuggestionSelected = (suggestion) => {
    dispatch(
      setDisciplinaryFormData({
        ...disciplinaryFormData,
        studentId: suggestion.id, // Store the student ID
        student: suggestion.name, // Store the student name for display
      })
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      setDisciplinaryFormData({
        ...disciplinaryFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Map frontend field names to API expected field names
    const apiData = {
      studentId: disciplinaryFormData.studentId,
      category: disciplinaryFormData.category,
      actionTaken: disciplinaryFormData.action, // Map 'action' to 'actionTaken'
      severityLevel: disciplinaryFormData.severity, // Map 'severity' to 'severityLevel'
      incidentDate: disciplinaryFormData.date, // Map 'date' to 'incidentDate'
      status: disciplinaryFormData.status,
      remarks: disciplinaryFormData.remarks,
      evidence: disciplinaryFormData.evidence,
      witnesses: disciplinaryFormData.witnesses,
      parentNotified: disciplinaryFormData.parentNotified,
      followUpDate: disciplinaryFormData.followUpDate,
      followUpNotes: disciplinaryFormData.followUpNotes
    };

    if(isEditMode) {
      const res = await api.updateDisciplinary(editItemId, apiData);
      if(res.data.success === true) {
        toast.success(res.data.message);
        onClose();
        fetchData();
      } else {
        toast.error(res.data.message);
      }
    }
    else {
      const res = await api.InsertDisciplinary(apiData);
      if(res.data.success === true) {
        toast.success(res.data.message);
        onClose();
        fetchData();
      } else {
        toast.error(res.data.message);
      }
    }

    dispatch(setIsEditMode(false));
    dispatch(setEditItemId(null));
    dispatch(setDisciplinaryFormData({
      studentId: '',
      student: '',
      category: '',
      severity: '',
      date: '',
      status: '',
      action: '',
      evidence: '',
      witnesses: '',
      remarks: '',
      parentNotified: false,
      followUpDate: '',
      followUpNotes: ''
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {isEditMode ? 'Edit Disciplinary Record' : 'Add New Disciplinary Record'}
              </h2>
              <p className="text-sm text-gray-600">
                {isEditMode ? 'Update the disciplinary record details' : 'Create a new disciplinary record for a student'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Student Information Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-md font-medium text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 text-blue-600 mr-2" />
              Student Information
            </h3>
              <AutoSuggestInput
                suggestions={students}
                onSuggestionSelected={handleSuggestionSelected}
                onChange={handleChange}
                name="student"
                value={disciplinaryFormData.student || ''}
                placeholder="Type student name here..."
              />
          </div>

          {/* Incident Details Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
              Incident Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormSelect
                label="Category"
                name="category"
                value={disciplinaryFormData.category}
                onChange={handleChange}
                required
                className=''
              >
                <option value="Academic Misconduct">Academic Misconduct</option>
                <option value="Behavioral Issues">Behavioral Issues</option>
                <option value="Bullying">Bullying</option>
                <option value="Dress Code Violation">Dress Code Violation</option>
                <option value="Fighting">Fighting</option>
                <option value="Late Arrival">Late Arrival</option>
                <option value="Property Damage">Property Damage</option>
                <option value="Substance Abuse">Substance Abuse</option>
                <option value="Truancy">Truancy</option>
                <option value="Other">Other</option>
              </FormSelect>

              <FormSelect
                label="Severity Level"
                name="severity"
                value={disciplinaryFormData.severity}
                onChange={handleChange}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </FormSelect>

              <FormInput
                label="Date of Incident"
                type="date"
                name="date"
                value={disciplinaryFormData.date}
                onChange={handleChange}
                required
              />

              <FormSelect
                label="Status"
                name="status"
                value={disciplinaryFormData.status}
                onChange={handleChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Under Investigation">Under Investigation</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </FormSelect>
            </div>

            <div className="mt-4">
              <FormInput
                label="Action Taken"
                type="text"
                name="action"
                value={disciplinaryFormData.action}
                onChange={handleChange}
                placeholder="e.g., Warning, Suspension, Detention, etc."
                required
              />
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <FileText className="h-5 w-5 text-green-600 mr-2" />
              Additional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                label="Evidence"
                type="text"
                name="evidence"
                value={disciplinaryFormData.evidence}
                onChange={handleChange}
                placeholder="Any evidence or documentation"
              />

              <FormInput
                label="Witnesses"
                type="text"
                name="witnesses"
                value={disciplinaryFormData.witnesses}
                onChange={handleChange}
                placeholder="Names of witnesses if any"
              />
            </div>

            <div className="mt-4">
              <FormInput
                label="Remarks"
                type="textarea"
                name="remarks"
                value={disciplinaryFormData.remarks}
                onChange={handleChange}
                placeholder="Additional comments or observations"
                rows={3}
              />
            </div>
          </div>

          {/* Follow-up Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <CheckCircle className="h-5 w-5 text-purple-600 mr-2" />
              Follow-up & Notifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="parentNotified"
                  name="parentNotified"
                  checked={disciplinaryFormData.parentNotified}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="parentNotified" className="text-sm font-medium text-gray-700">
                  Parent/Guardian Notified
                </label>
              </div>

              <FormInput
                label="Follow-up Date"
                type="date"
                name="followUpDate"
                value={disciplinaryFormData.followUpDate}
                onChange={handleChange}
                placeholder="Date for follow-up"
              />
            </div>

            <div className="mt-4">
              <FormInput
                label="Follow-up Notes"
                type="textarea"
                name="followUpNotes"
                value={disciplinaryFormData.followUpNotes}
                onChange={handleChange}
                placeholder="Notes for follow-up actions"
                rows={3}
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <FormButton
              label={isEditMode ? 'Update Record' : 'Add Record'}
              type="submit"
              loading={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default DisciplinaryForm;
