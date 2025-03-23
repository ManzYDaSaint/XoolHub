import React, { useState, useEffect } from 'react'
import TermForm from './termForm'
import TermTable from './termTable'
import { Pencil, Plus, Trash } from 'lucide-react'
import api from '../../services/apiServices.jsx'
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import FormButton from '../../components/input/formButton.jsx';
import { setIsEditMode, setEditItemId, setTermFormData } from '../examination/examSlice.jsx';


const TermData = () => {
    const handleTermClose = () => { setShowTerm(false); };
    const handleTermOpen = () => { setShowTerm(true); };
    const [showTerm, setShowTerm] = useState(false);

    const dispatch = useDispatch();
    const [termData, setTermData] = useState([]);
  
    // Fetch all the exams
    const fetchData = async () => {
      const res = await api.getTerm();
      const data = res.data.term;
      if(data.length < 0) {
          const termData = data.map((item, index) => ({
          sr: "",
          name: "No records found...",
          year: '',
          actions: ""
          }));
          setTermData(termData);
      }
      else {
          const termData = data.map((item, index) => ({
          sr: index + 1,
          name: item.name,
          year: item.year,
          start: item.start_date,
          end: item.end_date,
          actions: (
              <div>
              <button onClick={() => handleEdit(item.id)} className='action_icon'><Pencil size={15} className='action_edit' /></button>
              <button onClick={() => handleDelete(item.id)} className='action_icon'><Trash size={15} className='action_delete' /></button>
              </div>
          ),
          }));
          setTermData(termData);
      }
    };
  
    useEffect(() => {
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  
  
    // Get One exam
    const handleEdit = async(id) => {
      setShowTerm(true);
      const res = await api.editTerm(id);
      dispatch(setTermFormData({
        termName: res.data.edit.name,
        year: res.data.edit.yearid,
        startDate: res.data.edit.start_date,
        endDate: res.data.edit.end_date,
      }));
      dispatch(setIsEditMode(true));
      dispatch(setEditItemId(res.data.edit.id));
    };
    
      //   Handle Delete
      const handleDelete = async (id) => {
        try {
            const res = await api.deleteTerm(id);
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
    <>
        <div className="div" style={{ display: showTerm ? 'none' : 'block' }}>
            <button type="button" onClick={handleTermOpen} 
                class="add__rows__btn">
                <Plus size={15} className='plus' />
                Add
            </button>
        </div>
        <div className="toggleDiv" style={{ display: showTerm ? 'block' : 'none' }}>
            <TermForm fetchData={fetchData}/>
            <FormButton 
            label={'Close'}
            id={'closeBtn'}
            onClick={handleTermClose}
            />
        </div>
        <table class="custom__table table-hover mt-3" id="term__table">
            <TermTable setShowTerm={setShowTerm} termData={termData}/>
        </table>
    </>
  )
}

export default TermData