import React, { useEffect, useState } from "react";
import Card from "./components/card";
import { GraduationCap, Users, UsersRound } from "lucide-react";
import StudentBarChart from "./components/barchart";
import TopPerforming from "./components/topcard";
import GenderPieChart from "./components/piechart";
import api from "../../../services/apiServices";

const StudentDashboard = () => {
  const [count, setCount] = useState(0);
  const [male, setMale] = useState(0);
  const [female, setFemale] = useState(0);
  const [chart, setChart] = useState([]);

  const fethCount = async () => {
    try {
      const res = await api.countStudent();
      const data = res.data.counter;
      setCount(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fethCount();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchMale = async () => {
    try {
      const res = await api.countMale();
      const data = res.data.counter;
      setMale(data.count);
    } catch (error) {
      console.error("Error fetching student count:", error);
    }
  };

  useEffect(() => {
    fetchMale();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const fetchFemale = async () => {
      try {
        const res = await api.countFemale();
        const data = res.data.counter;
        setFemale(data.count);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };
  
    useEffect(() => {
      fetchFemale();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps


    const fetchGenderClass = async () => {
      try {
        const res = await api.countGenderByClass();
        const data = res.data.counter;
        setChart(data);
      } catch (error) {
        console.error("Error fetching student count:", error);
      }
    };
  
    useEffect(() => {
      fetchGenderClass();
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

      // Reshape Data
      const reshapedData = chart.reduce((acc, item) => {
        const existingClass = acc.find((entry) => entry.class === item.class);
        if (existingClass) {
          existingClass[item.gender] = parseInt(item.count, 10); // Add gender count to the existing class
        } else {
          acc.push({
            class: item.class,
            [item.gender]: parseInt(item.count, 10), // Initialize gender count
          });
        }
        return acc;
      }, []);

      

  return (
    <div className="student_section">
      <div className="student_section_container">
        <div className="box">
          <div className="flexer">
            <Card
              icon={UsersRound}
              title={count}
              description={"Student Count"}
            />
            <div className="card_container">
              <div className="student_count">
                <div className="counter">
                  <UsersRound size={30} className="card_icon" />
                  <div className="card_detail">
                    <h4>{male}</h4>
                    <p>Male</p>
                  </div>
                </div>
                <div className="vr"></div>
                <div className="counter">
                  <Users size={30} className="card_icon" />
                  <div className="card_detail">
                    <h4>{female}</h4>
                    <p>Female</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="graph_card mt-5">
            <h4 className="graph_title">Student Count</h4>
            <StudentBarChart data={reshapedData} />
          </div>
          <div className="pie_card mt-5">
            <h4 className="pie_title">Gender Distribution</h4>
            <GenderPieChart />
          </div>
        </div>
        <div className="box">
          <h4 className="top_performing_title">Top Performing Students</h4>
          <div className="top_performing">
            <TopPerforming
              icon={GraduationCap}
              score={"90%"}
              student={"Emmanuel Nyangazi"}
              term={"Term 1"}
              exam={"MidTerm"}
              form={"Form 1"}
            />
            <TopPerforming
              icon={GraduationCap}
              score={"87%"}
              student={"Darry Mwandelire"}
              term={"Term 1"}
              exam={"MidTerm"}
              form={"Form 3"}
            />
            <TopPerforming
              icon={GraduationCap}
              score={"90%"}
              student={"John Doe"}
              term={"Term 1"}
              exam={"MidTerm"}
              form={"Form 1"}
            />
            <TopPerforming
              icon={GraduationCap}
              score={"90%"}
              student={"John Doe"}
              term={"Term 1"}
              exam={"MidTerm"}
              form={"Form 1"}
            />
          </div>
          <div className="worst_students">
            <h4 className="worst_performing_title">
              Worst Performing Students
            </h4>
            <div className="top_performing">
              <TopPerforming
                icon={GraduationCap}
                score={"90%"}
                student={"Emmanuel Nyangazi"}
                term={"Term 1"}
                exam={"MidTerm"}
                form={"Form 1"}
              />
              <TopPerforming
                icon={GraduationCap}
                score={"87%"}
                student={"Darry Mwandelire"}
                term={"Term 1"}
                exam={"MidTerm"}
                form={"Form 3"}
              />
              <TopPerforming
                icon={GraduationCap}
                score={"90%"}
                student={"John Doe"}
                term={"Term 1"}
                exam={"MidTerm"}
                form={"Form 1"}
              />
              <TopPerforming
                icon={GraduationCap}
                score={"90%"}
                student={"John Doe"}
                term={"Term 1"}
                exam={"MidTerm"}
                form={"Form 1"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
