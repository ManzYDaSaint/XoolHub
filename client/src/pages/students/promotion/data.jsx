import React, { useEffect, useState } from "react";
import FormButton from "../../../components/input/formButton";
import ClassSelector from "../../reports/components/classSelector";
import YearSelectInput from "../components/yearSelect";
import Table from "./table";
import api from "../../../services/apiServices";
import ToggleSwitch from "./toggle";

const PromotionData = () => {
  const [students, setStudents] = useState([]);
  const [currentClass, setCurrentClass] = useState("");
  const [studentIDs, setStudentIDs] = useState([]);

  const filterData = async (data) => {
    try {
      const res = await api.getStudentPromotion({data}); // Ensure correct API call
      const info = res.data.info;
      if(info.length === 0) {
        const students = info.map((item, index) => ({
        sr: "",
        tick: '',
        name: "No records found...",
        exam: "",
        agg: "",
        remark: "",
      }));
      setStudents(students);
    } else {
      const students = info.map((item, index) => ({
        sr: item.rank,
        tick: (
          <div>
            <ToggleSwitch 
              id={item.studentid}
              onToggle={handleToggle}
            />
          </div>
        ),
        name: item.student,
        exam: item.exam,
        agg: item.agg,
        remark: item.remarks,
      }));
      setStudents(students);
    }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Update table data when class changes
  useEffect(() => {
    if (currentClass) {
      const fetchData = async () => {
        await filterData(currentClass);
      };
      fetchData();
    } // eslint-disable-next-line
  }, [currentClass]);


  const handleToggle = (studentId) => {
    setStudentIDs((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId) // Remove if already selected
        : [...prevSelected, studentId] // Add if not selected
    );
  };
  console.log(studentIDs);

  const handleSubmit = async () => {
    if (studentIDs.length === 0) {
      alert("No students selected for promotion.");
      return;
    }
  }


  const handleCurrectChange = (e) => {
    
  };

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
                  label="Current Class:"
                  onChange={(e) => {
                    setCurrentClass(e.target.value);
                  }}
                  name="currentClass"
                  value={currentClass}
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
              <form onSubmit={handleSubmit}></form>
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
        <Table data={students} />
      </div>
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
