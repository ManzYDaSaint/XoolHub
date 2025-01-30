import React, { useEffect, useState } from "react";
import FormButton from "../../../components/input/formButton";
import ClassSelector from "../../reports/components/classSelector";
import YearSelectInput from "../components/yearSelect";
import Table from "./table";

const PromotionData = () => {
    const [dat, setData] = useState([]);
  //   const [students, setStudents] = useState([]);
  //   const [selectedClass, setSelectedClass] = useState("");
  //   const [promotionMode, setPromotionMode] = useState("manual"); // 'manual' or 'automatic'
  //   const [selectedStudents, setSelectedStudents] = useState([]);

  //   useEffect(() => {
  //     // Fetch students and classes from the API
  //     async function fetchData() {
  //       // Replace with your API endpoint
  //       const response = await fetch("/api/students");
  //       const data = await response.json();
  //       setStudents(data);
  //     }
  //     fetchData();
  //   }, []);

  //   const handlePromotion = async () => {
  //     const payload = {
  //     //   promotionMode,
  //     //   selectedClass,
  //     //   students: promotionMode === "manual" ? selectedStudents : students.filter(student => student.passed),
  //     };

  // Call your API to promote students
  // const response = await fetch("/api/promote", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });

  // if (response.ok) {
  //   alert("Students promoted successfully!");
  //   setSelectedStudents([]);
  // } else {
  //   alert("Failed to promote students.");
  // }
  //   };

  //   const handleCheckboxChange = (studentId) => {
  //     setSelectedStudents((prev) =>
  //       prev.includes(studentId)
  //         ? prev.filter((id) => id !== studentId)
  //         : [...prev, studentId]
  //     );
  //   };

  
useEffect(() => {
    const data = [{
        sr: '',
        tick: (
            <div>
                <input
                    type="checkbox"
                    // checked={selectedStudents.includes(student.id)}
                    // onChange={() => handleCheckboxChange(student.id)}
                />
            </div>
        ),
        name: '',
        exam: '',
        remark: ''
    }];
    setData(data);
}, [])

  const handleCurrectChange = () => {};

  return (
    <div className="">
      <div className="mb-6">
        <div className="promotion-content">
          <div className="flex flex-wrap gap-4 w-100">
            <div className="current">
              <h6
                className="mb-2 text-gray-600 text-lg"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Promoted Class
              </h6>
              <div className="formGroup">
                <ClassSelector
                  label={"Current Class:"}
                  onChange={handleCurrectChange}
                  name={"currentClass"}
                  value={""}
                />
              </div>
            </div>
            <div class="w-px bg-gray-400"></div>
            <div className="nextYear">
              <h6
                className="mb-2 text-gray-600 text-lg ml-3"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Target Academic Year and Class
              </h6>
              <div className="formGroup ml-3">
                <YearSelectInput
                  label={"Next Academic Year"}
                  onChange={""}
                  name={"nextYear"}
                  value={""}
                />
                <ClassSelector
                  label={"Next Class:"}
                  onChange={handleCurrectChange}
                  name={"nextClass"}
                  value={""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="promote-table">
        <Table data={dat}/>
      </div>

      {/* {promotionMode === "manual" && ( */}

      

      {/* )} */}

      <FormButton
        onClick={""}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        label={"Promote Students"}
        id={"tyepButton"}
      />
    </div>
  );
};

export default PromotionData;
