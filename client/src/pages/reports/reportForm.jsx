import React, { useState } from 'react';
import api from '../../services/apiServices.jsx'
import FormButton from '../../components/input/formButton.jsx'
import { toast } from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { setEditItemId, setReportFormData } from '../../helpers/examination/examSlice.jsx';
import YearSelector from './components/yearSelector.jsx';
import TermSelector from './components/termSelector.jsx';
import ClassSelector from './components/classSelector.jsx';
import ExamSelector from './components/typeSelector.jsx';
import ReportTable from './reportTable.jsx'
import { Printer } from 'lucide-react'

const ReportForm = () => {
  const reportFormData = useSelector((state) => state.exam.reportFormData);
  const dispatch = useDispatch();
  const [reportData, setReportData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle submit
  const handleSubmit = async (data) => {
    try {
      const res = await api.getReport({ data });
      const students = res.data.students

      if (students.length === 0) {
        const reportData = data.map((item, index) => ({
          print: "",
          sr: "",
          agg: "",
          name: "No records found...",
        }));
        setReportData(reportData);
      }
      else {
        const reportData = students.map((item, index) => ({
          print: (
            <>
              <button onClick={() => handlePrint(item.studentid)} className='action_icon'><Printer size={18} /></button>
            </>
          ),
          sr: index + 1,
          agg: item.aggregate,
          name: item.studentname,
        }));
        setReportData(reportData);
      }

    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
    dispatch(setReportFormData({
      yearid: '',
      termid: '',
      typeid: '',
      classid: '',
    }));
    dispatch(setEditItemId(null));
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setReportFormData({
        ...reportFormData,
        [name]: value,
      }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(reportFormData);
  };


  const handlePrint = (studentid) => {
    console.log(studentid);
  }


  return (
    <>
      <form onSubmit={onSubmit} autoComplete='off'>
        <div className='formGroup'>
          <YearSelector
            onChange={handleChange}
            label={'Academic Year'}
            name={'yearid'}
            value={reportFormData.yearid}
          />
          <TermSelector
            onChange={handleChange}
            label={'Term'}
            name={'termid'}
            value={reportFormData.termid}
          />
          <ExamSelector
            onChange={handleChange}
            label={'Exam Type'}
            name={'typeid'}
            value={reportFormData.typeid}
          />
          <ClassSelector
            onChange={handleChange}
            label={'Class'}
            name={'classid'}
            value={reportFormData.classid}
          />
        </div>
        <FormButton label={isLoading ? 'Filtering..' : 'Filter'} id="tyepButton" />
      </form>
      <table className="custom__table table-hover mt-3 w-100" id="fees__table">
        <ReportTable reportData={reportData} data={data} />
      </table>
    </>
  );
};

export default ReportForm;