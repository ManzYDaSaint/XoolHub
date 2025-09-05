import React, { useState } from 'react';
import FormButton from '../../components/input/formButton.jsx';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterFormData } from '../../helpers/examination/examSlice.jsx';
import TypeSelector from '../components/examTypeSelector.jsx';
import ClassSelector from '../components/classSelector.jsx';
import api from '../../services/apiServices.jsx';

const EntryForm = () => {
  const filterFormData = useSelector((state) => state.exam.filterFormData);
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [students, setStudents] = useState([]);
  const [studentScores, setStudentScores] = useState(
    students.reduce((acc, student) => {
      acc[student.id] = ''; // Initialize all student scores to an empty string
      return acc;
    }, {})
  );

  // Dependant
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [typeid, setTypeid] = useState('');

  // Handle form submission
  const handleFilterSubmit = async (data) => {
    try {
      const res = await api.getFilter(data);
      if (res.data.success === true) {
        const students = res.data.filter;
        setStudents(students);
        nextStep();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
    dispatch(setFilterFormData({
      typeid: '',
    }));
    setTypeid(data.typeid)
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const scoreData = students.map(student => ({
      id: student.id,
      score: studentScores[student.id],
      typeid,
      selectedClass,
      selectedSubject
    }));

    setLoading(true);
    try {
      const res = await api.insertResult(scoreData);
      if (res.data.success === true) {
        toast.success(res.data.message);
    } else {
        toast.error(res.data.message);
    }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      prevStep();
      setLoading(false);
      dispatch(setFilterFormData({
        typeid: '',
      }));
      setTypeid('')
      setSelectedClass('')
      setSelectedSubject('')
    }
  }

  // Handle input changes for class and year, as well as student names
  const handleEntryChange = (e, studentId) => {
    const { value } = e.target;
    setStudentScores({
      ...studentScores,
      [studentId]: value // Update score for the specific student
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFilterFormData({
      ...filterFormData,
      [name]: value,
    }));
  };

  // Proceed to the next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Proceed to the next step
  const prevStep = () => {
    setStep(step - 1);
  };

  // Dependent Selection
   // Handle when a country is selected
   const handleClassChange = (e) => {
    const classo = e.target.value;
    setSelectedClass(classo);
    setSelectedSubject('');
  };

  // Handle when a city is selected
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
  };

  const handleFilter = (e) => {
    e.preventDefault();

    const formData = {
      ...filterFormData,
      selectedClass,
      selectedSubject,
    };
    handleFilterSubmit(formData);
  }

  return (
    <div className="space-y-8">
      {/* Progress Indicator */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/30"></div>
        <div className="relative p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Examination Entry</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 1 ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <span className={`text-sm font-medium ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>
                  Specify Students
                </span>
              </div>
              <div className="w-12 h-0.5 bg-gray-200"></div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= 2 ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <span className={`text-sm font-medium ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>
                  Enter Scores
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleFilter}>
        {step === 1 && (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/30"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Step 1: Specify Students</h3>
              </div>
              
              <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-blue-800">
                  💡 <strong>Tip:</strong>{" "}
                  <span className="text-blue-700">
                    Select the examination type, class, and subject to specify which students to add results for.
                  </span>
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <TypeSelector 
                  onChange={handleChange}
                  label={'Examination Type'}
                  name={'typeid'}
                  value={filterFormData.typeid}
                />
                <ClassSelector 
                  onChange={handleChange}
                  label={'Class'}
                  name={'classid'}
                  value={selectedClass}
                  selectedClass={selectedClass}
                  handleClassChange={handleClassChange}
                  handleSubjectChange={handleSubjectChange}
                  labell={'Subject'}
                  namee={'subjectid'}
                  valuee={selectedSubject}
                />
              </div>
              
              <div className="flex justify-end">
                <FormButton
                  label={'Specify Students'}
                  icon={'arrow right'}
                  id={'nextButton'}
                />
              </div>
            </div>
          </div>
        )}
      </form>

      <form onSubmit={onSubmit}>
        {step === 2 && (
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/30"></div>
            <div className="relative p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">Step 2: Enter Examination Scores</h3>
              </div>

              <div className="bg-purple-50/50 border border-purple-200/50 rounded-xl p-4 mb-6">
                <p className="text-sm font-medium text-purple-800">
                  💡 <strong>Tip:</strong>{" "}
                  <span className="text-purple-700">
                    Enter the examination scores for each student. Make sure to fill all required fields.
                  </span>
                </p>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-200/50 mb-8">
                <table className="min-w-full divide-y divide-gray-200/50">
                  <thead className="bg-gradient-to-r from-gray-50 to-gray-100/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Sr
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/80 backdrop-blur-sm divide-y divide-gray-200/50">
                    {students.map((student, index) => (
                      <tr key={student.id} className="hover:bg-blue-50/50 transition-all duration-200 group">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-gray-700">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-gray-700">
                          {student.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input 
                            type="text" 
                            placeholder='Enter score...' 
                            className='w-full px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-xl text-gray-900 placeholder-gray-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 focus:bg-white/90 hover:border-gray-300/70 hover:bg-white/90' 
                            onChange={(e) => handleEntryChange(e, student.id)}
                            name='score'
                            value={studentScores[student.id] || ''}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={prevStep}
                  className="group flex items-center gap-2 px-6 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50/80 rounded-xl transition-all duration-200 border border-gray-300/50 hover:border-gray-400/50"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Previous
                </button>
                
                <FormButton 
                  label={loading ? 'Processing...' : 'Add Results'} 
                  id="tyepButton" 
                  disabled={loading} 
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default EntryForm;