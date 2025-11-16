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
      <div className="bg-gray-100 px-4 py-2 rounded-lg flex flex-col mb-4">
        {label && <label htmlFor={''} className="text-sm font-medium text-gray-700 py-2">{label}</label>}
        <div className="inputContainer">
          <select name={name} value={value} onChange={handleClassChange} className="w-full bg-transparent text-sm outline-none px-4 pb-2">
            <option value="" disabled>Select an option</option>
            {classs.map((clas) => (
              <option key={clas.id} value={clas.id}>
                {clas.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-gray-100 px-4 py-2 rounded-lg flex flex-col mb-4">
        {labell && <label htmlFor={''} className="text-sm font-medium text-gray-700 py-2">{labell}</label>}
        <div className="inputContainer">
          <select name={namee} value={valuee} onChange={handleSubjectChange} className="w-full bg-transparent text-sm outline-none px-4 pb-2" disabled={!selectedClass}>
            <option value="" disabled>Select an option</option>
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
