import React, { useState, useEffect } from 'react';
import api from '../../services/apiServices';

const ClassSelector = ({ label, selectedClass, handleClassChange, handleSubjectChange, name, value, labell, namee, valuee }) => {
  const [classs, setClasss] = useState([]);
  const [subject, setSubject] = useState([]); 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.getAssignClass();
        const data = response.data.ct;
        setClasss(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (selectedClass) {
        try {
          const response = await api.getAssignSubject(selectedClass);
          const data = response.data.st;
          setSubject(data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [selectedClass]);

  return (
    <>
      <div className="formInputContainer">
        {label && <label htmlFor={''}>{label}</label>}
        <div className="inputContainer">
          <select name={name} value={value} onChange={handleClassChange}>
            <option value="" selected disabled>Select an option</option>
            {classs.map((clas) => (
              <option key={clas.classid} value={clas.classid}>
                {clas.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="formInputContainer">
        {labell && <label htmlFor={''}>{labell}</label>}
        <div className="inputContainer">
          <select name={namee} value={valuee} onChange={handleSubjectChange} disabled={!selectedClass}>
            <option value="" selected disabled>Select an option</option>
            {subject.map((code) => (
              <option key={code.subjectid} value={code.subjectid}>
                {code.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default ClassSelector;
