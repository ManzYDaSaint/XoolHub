import React, { useState } from 'react';
import api from '../../services/apiServices.jsx';
import FormInput from '../../components/input/formInput.jsx';
import FormButton from '../../components/input/formButton.jsx';
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setStudentFormData } from '../../helpers/examination/examSlice.jsx';
import ClassSelectInput from '../teacher/components/classSelect.jsx';
import YearSelectInput from './components/yearSelect.jsx';

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
    <div>
      <form onSubmit={onSubmit}>
        {step === 1 && (
          <div className="multi_step">
            <h3 style={{fontFamily: "'Poppins', san-serif"}}><span>Step 1:</span> Select Year and Class</h3>
            <div className="formGroup">
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
            <FormButton
              onClick={nextStep}
              label={'Next'}
              icon={'arrow right'}
              id={'nextButton'}
            />
          </div>
        )}

        {step === 2 && (
          <div className="multi_step">
            <h3 style={{fontFamily: "'Poppins', san-serif"}}><span>Step 2:</span> Enter Student Names</h3>
            {studentNames.map((student, index) => (
              <div key={index}>
                <label className="mb-3">
                  <FormInput
                    label={`Student Name ${index + 1}`}
                    type={'text'}
                    value={student}
                    onChange={(e) => handleChange(e, index)}
                    placeholder={'Type here...'}
                  />
                </label>
              </div>
            ))}
            <FormButton
              onClick={addStudentInput}
              id={'rowButton'}
              icon={'plus'}
              type={'button'}
            />
            <FormButton label={'Add Students'} id="tyepButton" />
          </div>
        )}
      </form>
    </div>
  );
};

export default StudentForm;

















// import React, { useState } from 'react';
// import api from '../../services/apiServices.jsx';
// import FormInput from '../../components/input/formInput.jsx'
// import FormButton from '../../components/input/formButton.jsx'
// import { toast } from 'react-hot-toast';
// import { useSelector, useDispatch } from 'react-redux';
// import { setStudentFormData } from '../../helpers/examination/examSlice.jsx';
// import ClassSelectInput from '../teacher/components/classSelect.jsx';
// import YearSelectInput from './components/yearSelect.jsx';


// const StudentForm = ({ fetchData }) => {
//     const studentFormData = useSelector((state) => state.exam.studentFormData);
//     const dispatch = useDispatch();
//     const [studentNames, setStudentNames] = useState([""]);
//     const [step, setStep] = useState(1);

//       // Handle submit
//       const handleSubmit = async(data) => {
//         // console.log(data)
//           try {
//             const res = await api.addStudent({ data });
//             if (res.data.success === true) {
//               fetchData();
//               toast.success(res.data.message);
//             } 
//             else {
//               toast.error(res.data.message);
//             }
//           } catch (error) {
//             toast.error('An error occurred. Please try again.');
//           }
//           dispatch(setStudentFormData({
//             student: '',
//             yearid: '',
//             classid: '',
//           }));
//       };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newStudentNames = [...studentNames];
//     newStudentNames = e.target;
//     dispatch(
//       setStudentFormData({
//         ...studentFormData,
//         newStudentNames,
//         [name]: value,
//       }));
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     handleSubmit(studentFormData);
//   };

//   // Function to handle adding more input fields for student names
//   const addStudentInput = () => {
//     setStudentNames([...studentNames, ""]);
//   };

//    // Function to handle moving to the next step
//    const nextStep = () => {
//     setStep(step + 1);
//   };

//   return (
//     <div>
//     <form onSubmit={onSubmit}>
//     {step === 1 && (
//       <div className='multi_step'>
//         <h3><span>Step 1 :</span> Select Year and Class</h3>
//         <form>
//           <div className='formGroup'>
//             <ClassSelectInput 
//               onChange={handleChange} 
//               label={'Class'}
//               name={'classid'}
//               value={studentFormData.classid}
//             />
//             <YearSelectInput 
//               onChange={handleChange} 
//               label={'Year'}
//               name={'yearid'}
//               value={studentFormData.yearid}
//             />
//           </div>
//           <FormButton 
//             onClick={nextStep}
//             label={'Next'}
//             icon={'arrow right'}
//             id={'nextButton'}
//           />
//         </form>
//       </div>
//     )}

//     {step === 2 && (
//       <div className='multi_step'>
//         <h3><span>Step 2:</span> Enter Student Names</h3>
//           {studentNames.map((student, index) => (
//             <div key={index}>
//               <label className='mb-3'>
//                 <FormInput
//                   label={'Student Name'}
//                   type={'text'}
//                   name={student}
//                   value={studentFormData.student}
//                   onChange={handleChange}
//                   placeholder={'Type here...'}
//                 />
//               </label>
//             </div>
//           ))}
//           <FormButton 
//             onClick={addStudentInput}
//             id={'rowButton'}
//             icon={'plus'}
//             type={'button'}
//           />
//           <FormButton label={'Add Students'} id="tyepButton" />
//       </div>
//     )}
//     </form>
//     </div>
//   );
// };

// export default StudentForm;


