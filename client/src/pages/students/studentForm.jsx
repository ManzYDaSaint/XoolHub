import React, { useState } from 'react';
import api from '../../services/apiServices.jsx';
import FormInput from '../../components/input/formInput.jsx';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setStudentFormData } from '../../helpers/examination/examSlice.jsx';
import ClassSelectInput from '../teacher/components/classSelect.jsx';
import YearSelectInput from './components/yearSelect.jsx';
import { ChevronRight, ChevronLeft, Users, GraduationCap, Plus, CheckCircle } from 'lucide-react';

const StudentForm = ({ fetchData }) => {
  const studentFormData = useSelector((state) => state.exam.studentFormData);
  const dispatch = useDispatch();
  
  const [studentNames, setStudentNames] = useState([""]); // Array to store student names
  const [step, setStep] = useState(1); // Manage form steps

  // Handle form submission
  const handleSubmit = async (data) => {
    try {
      const res = await api.addStudent({ data });
      if (res.data.success === true) {
        fetchData();
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
    dispatch(setStudentFormData({
      yearid: '',
      classid: '',
      students: '',
    }));
  };

  // Handle input changes for class and year, as well as student names
  const handleChange = (e, index = null) => {
    const { name, value } = e.target;

    // If handling student names (from Step 2)
    if (index !== null) {
      const updatedStudentNames = [...studentNames];
      updatedStudentNames[index] = value; // Update the specific student name
      setStudentNames(updatedStudentNames);
    } else {
      // Handle class or year input changes (from Step 1)
      dispatch(setStudentFormData({
        ...studentFormData,
        [name]: value,
      }));
    }
  };

  // Add another input field for entering another student name
  const addStudentInput = () => {
    setStudentNames([...studentNames, ""]);
  };

  // Proceed to the next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Submit the form data
  const onSubmit = (e) => {
    e.preventDefault();
    
    // Combine class, year, and student names into form data
    const formData = {
      ...studentFormData,
      studentNames, // Add student names to the formData
    };
    handleSubmit(formData); // Submit form
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl ${step >= 1 ? 'bg-gradient-to-br from-blue-500 to-indigo-600' : 'bg-gray-300'}`}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-medium ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                Step 1: Select Class & Year
              </span>
              <span className="text-xs text-gray-500">Choose academic details</span>
            </div>
          </div>
          
          <div className={`h-1 w-16 rounded-full ${step >= 2 ? 'bg-gradient-to-r from-blue-500 to-indigo-600' : 'bg-gray-300'}`}></div>
          
          <div className="flex items-center gap-4">
            <div className={`p-2 rounded-xl ${step >= 2 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gray-300'}`}>
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className={`text-sm font-medium ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                Step 2: Add Students
              </span>
              <span className="text-xs text-gray-500">Enter student names</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} className="w-full max-w-4xl">
        {step === 1 && (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Select Academic Details</h3>
                  <p className="text-gray-600 text-sm">Choose the year and class for student enrollment</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <ClassSelectInput
                  handleChange={handleChange}
                  label={'Class'}
                  name={'classid'}
                  value={studentFormData.classid}
                />
                <YearSelectInput
                  onChange={handleChange}
                  label={'Year'}
                  name={'yearid'}
                  value={studentFormData.yearid}
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300/50 font-medium text-sm"
                >
                  Next Step
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200" />
                </button>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/30"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Add Student Names</h3>
                  <p className="text-gray-600 text-sm">Enter the names of students to be enrolled</p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {studentNames.map((student, index) => (
                  <div key={index} className="group relative">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg group-focus-within:from-blue-100 group-focus-within:to-indigo-100 transition-all duration-200">
                        <span className="text-sm font-medium text-gray-600 group-focus-within:text-blue-600">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <FormInput
                          label={`Student Name ${index + 1}`}
                          type={'text'}
                          value={student}
                          onChange={(e) => handleChange(e, index)}
                          placeholder={'Enter student name...'}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={addStudentInput}
                  className="group inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-gray-300/50 font-medium text-sm"
                >
                  <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
                  Add Another Student
                </button>
                
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="group inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-gray-300/50 font-medium text-sm"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                    Previous
                  </button>
                  
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-green-300/50 font-medium text-sm"
                  >
                    <CheckCircle className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    Add Students
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default StudentForm;