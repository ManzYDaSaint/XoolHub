import React, { useEffect, useState } from "react";
import FormButton from "../../../components/input/formButton";
import ClassSelector from "../../reports/components/classSelector";
import YearSelectInput from "../components/yearSelect";
import Table from "./table";
import api from "../../../services/apiServices";
import ToggleSwitch from "./toggle";
import { InfinitySpin } from "react-loader-spinner";
import { toast } from 'react-hot-toast'

const PromotionData = () => {
  const [students, setStudents] = useState([]);
  const [currentClass, setCurrentClass] = useState("");
  const [nextClass, setNextClass] = useState("");
  const [nextYear, setNextYear] = useState("");
  const [studentIDs, setStudentIDs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const filterData = async (data) => {
    try {
      setIsLoading(true);
      const res = await api.getStudentPromotion({data});
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
    finally {
      setIsLoading(false);
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

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(studentIDs, currentClass, nextClass, nextYear);
  }
  const handleSubmit = async (studentIDs, currentClass, nextClass, nextYear) => {
    if (studentIDs.length === 0 || currentClass === "" || nextClass === "" || nextYear === "") {
      toast.error("Please select all fields.");
      return;
    }

    try {
      const res = await api.updatePro({studentIDs, currentClass, nextClass, nextYear});
    if (res.data.success === true) {
      toast.success("Students promoted successfully.");
      setStudentIDs([]);
      setCurrentClass("");
      setNextClass("");
      setNextYear("");
    } else {
      toast.error("An error occurred. Please try again.");
    } 
    } catch (error) {
      error.response.data.errors.forEach((error) => {
        toast.error(error.message);
      });
    }
  }

  return (
    <form onSubmit={onSubmit}>
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
              
              <div className="formGroup ml-3">
                <YearSelectInput
                  label={"Next Academic Year"}
                  onChange={(e) => {
                    setNextYear(e.target.value);
                  }}
                  name={"nextYear"}
                  value={nextYear}
                />
                <ClassSelector
                  label={"Next Class:"}
                  onChange={(e) => {
                    setNextClass(e.target.value);
                  }}
                  name={"nextClass"}
                  value={nextClass}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="promote-table">
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <InfinitySpin width='150' color="#007BFE" />
                      </div>
        ) : (
          <Table data={students} />
        )}
      </div>
      <FormButton
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg"
        label={"Promote Students"}
        id={"tyepButton"}
        type={"submit"}
      />
    </div>
    </form>
  );
};

export default PromotionData;
