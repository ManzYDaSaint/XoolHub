import React, { useState, useEffect } from 'react'
import { Icon } from 'semantic-ui-react'
import FormButton from '../../../components/input/formButton.jsx'
import api from '../../../services/apiServices.jsx'
import { toast } from 'react-hot-toast';
import ClassTForm from './form.jsx';
import ClassTTable from './table.jsx';

const ClassTData = () => {
  const [classTeacherData, setClassTeacherData] = useState([]);
  const [showClassT, setShowClassT] = useState(false);
  const handleClassTOpen = () => { setShowClassT(true); };
  const handleClassTClose = () => { setShowClassT(false); };

    // Fetch all the exams
const fetchData = async () => {
  const res = await api.getClassTeacher();
  const data = res.data.classt;
  if(data.length < 1) {
      const classTeacherData = data.map((item, index) => ({
      sr: "",
      teacher: "No records found...",
      class: "",
      actions: ""
      }));
      setClassTeacherData(classTeacherData);
  }
  else {
      const classTeacherData = data.map((item, index) => ({
      sr: index + 1,
      teacher: item.teacher,
      class: item.classs,
      actions: (
          <div>
          <button onClick={() => handleDelete(item.id)} className='action_icon'><Icon name='trash alternate' className='action_delete' /></button>
          </div>
      ),
      }));
      setClassTeacherData(classTeacherData);
  }
};

useEffect(() => {
    fetchData();
}, []); // eslint-disable-line react-hooks/exhaustive-deps

    
  //   Handle Delete
  const handleDelete = async (id) => {
      try {
          const res = await api.deleteClassTeacher(id);
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
        <div className="div" style={{ display: showClassT ? 'none' : 'block' }}>
            <button type="button" onClick={handleClassTOpen} 
                class="add__rows__btn">
                <Icon name='plus' className='plus' />
                Add
            </button>
            </div>
            <div className="toggleDiv" style={{ display: showClassT ? 'block' : 'none' }}>
            <ClassTForm fetchData={fetchData}/>
            <FormButton 
                label={'Close'}
                id={'closeBtn'}
                onClick={handleClassTClose}
            />
            </div>
            <table class="customo__table table-hover mt-3" id="JCE__remark__table">
              <ClassTTable setShowClassT={setShowClassT} classTeacherData={classTeacherData}/>
            </table>
    </div>
  )
}

export default ClassTData