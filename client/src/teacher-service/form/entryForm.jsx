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
    <div>
      <form onSubmit={handleFilter}>
        {step === 1 && (
          <div className="multi_step">
            <h3 style={{fontFamily: "'Poppins', san-serif"}}><span className='m-3'>Step 1:</span> Specify students to add results.</h3>
            <div className="formGroup">
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
            <FormButton
              label={'Specify'}
              icon={'arrow right'}
              id={'nextButton'}
            />
          </div>
        )}
      </form>
      <form onSubmit={onSubmit}>
        {step === 2 && (
          <div className="multi_step mt-3">
            <h3 style={{fontFamily: "'Poppins', san-serif"}}><span className='m-3'>Step 2:</span> Enter Examination Scores</h3>
              <div>
                <table className="table customisedTable">
                  <thead>
                    <tr>
                      <th width='10%' className='py-3 px-3 text-left'>Sr</th>
                      <th width='60%' className='py-3 px-3 text-left'>Student Name</th>
                      <th width='30%' className='py-3 px-3 text-left'>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map((student, index) => (
                      <tr key={student.id} className='text-left'>
                        <td className='py-3 px-3 text-left'>{index+1}</td>
                        <td>{student.name}</td>
                        <td>
                          <input 
                            type="text" 
                            placeholder='Type score here..' 
                            className='scoreInput p-2 rounded' 
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
            <FormButton 
              label={loading ? 'Processing...' : 'Add Results'} 
              id="tyepButton" 
              disabled={loading} 
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default EntryForm;