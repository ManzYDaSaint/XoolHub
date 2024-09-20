import React, { useState } from "react";

function MultiStepForm() {

  // Function to handle input changes for class and year
  const handleClassYearChange = (e) => {
    const { name, value } = e.target;
    setClassYearData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle changes in student name inputs
  const handleStudentNameChange = (e, index) => {
    const newStudentNames = [...studentNames];
    newStudentNames[index] = e.target.value;
    setStudentNames(newStudentNames);
  };

  return (
    <div>
      <h2>Student Registration</h2>
      
    </div>
  );
}

export default MultiStepForm;
