import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import FormButton from '../../../components/input/formButton.jsx'
import api from '../../../services/apiServices.jsx'
import { useDispatch } from 'react-redux';
import { setIsEditMode, setEditItemId, setTeacherFormData } from '../../../helpers/examination/examSlice.jsx'
import { toast } from 'react-hot-toast';
import AddForm from './form.jsx';
import AddTable from './table.jsx';

const Data = () => {
  const dispatch = useDispatch();
  const [teacherData, setTeacherData] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const handleAddOpen = () => { setShowAdd(true); };
  const handleAddClose = () => { setShowAdd(false); };

    // Fetch all the exams
const fetchData = async () => {
  const res = await api.getTeacher();
  const data = res.data.teacher;
  if(data.length < 1) {
      const teacherData = data.map((item, index) => ({
      sr: "",
      name: "No records found...",
      contact: "",
      email: "",
      address: "",
      password: "",
      actions: ""
      }));
      setTeacherData(teacherData);
  }
  else {
      const teacherData = data.map((item, index) => ({
      sr: index + 1,
      name: item.name,
      contact: item.contact,
      email: item.email,
      address: item.address,
      password: item.password,
      actions: (
          <div>
          <button onClick={() => handleEdit(item.id)} className='action_icon'><Icon name='pencil' className='action_edit' /></button>
          <button onClick={() => handleDelete(item.id)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
          <button onClick={() => handleView(item.id)} className='action_icon'><Icon name='eye' className='action_view' /></button>
          </div>
      ),
      }));
      setTeacherData(teacherData);
  }
};

useEffect(() => {
    fetchData();
}, []); // eslint-disable-line react-hooks/exhaustive-deps

const handleView = async(id) => {
    console.log('Viewing this ID:', id)
}


  // Get One exam
  const handleEdit = async(id) => {
    setShowAdd(true);
      const res = await api.editTeacher(id);
      dispatch(setTeacherFormData({
          name: res.data.edit.name,
          contact: res.data.edit.contact,
          email: res.data.edit.email,
          address: res.data.edit.address,
      }));
      dispatch(setIsEditMode(true));
      dispatch(setEditItemId(res.data.edit.id));
  };
    
  //   Handle Delete
  const handleDelete = async (id) => {
      try {
          const res = await api.deleteTeacher(id);
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
    <div>
        <div className="div" style={{ display: showAdd ? 'none' : 'block' }}>
            <button type="button" onClick={handleAddOpen} 
                class="add__rows__btn">
                <Icon name='plus' className='plus' />
                Add
            </button>
            </div>
            <div className="toggleDiv" style={{ display: showAdd ? 'block' : 'none' }}>
            <AddForm fetchData={fetchData}/>
            <FormButton 
                label={'Close'}
                id={'closeBtn'}
                onClick={handleAddClose}
            />
            </div>
            <table class="customo__table table-hover mt-3" id="JCE__remark__table">
              <AddTable setShowAdd={setShowAdd} teacherData={teacherData}/>
            </table>
    </div>
  )
}

export default Data