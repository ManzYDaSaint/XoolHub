import React, { useEffect, useState } from "react";
import Card from '../../students/dashboard/components/card'
import { Presentation, Users, UsersRound } from "lucide-react";
import GenderPieChart from './components/piechart'
import Ctcard from "./components/tcard";
import api from "../../../services/apiServices";

const TeacherBoard = () => {
    const [count, setCount] = useState(0);
    const [male, setMale] = useState(0);
    const [female, setFemale] = useState(0);
    const [teacher, setTeacher] = useState([]);
  
    const fethCount = async () => {
      try {
        const res = await api.countTeachers();
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
        const res = await api.countMaleTeachers();
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
          const res = await api.countFemaleTeachers();
          const data = res.data.counter;
          setFemale(data.count);
        } catch (error) {
          console.error("Error fetching student count:", error);
        }
      };
    
      useEffect(() => {
        fetchFemale();
        }, []); // eslint-disable-line react-hooks/exhaustive-deps

        const fetchData = async () => {
          const res = await api.getClassTeacher();
          const data = res.data.classt;
          setTeacher(data);
        };
        useEffect(() => {
          fetchData();
        }, []);

  return (
    <div className="student_section">
      <div className="student_section_container">
        <div className="box">
          <div className="flexer">
            <Card
              icon={UsersRound}
              title={count}
              description={"Teacher"}
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
          <div className="pie_card mt-5">
            <h4 className="pie_title">Gender Distribution</h4>
            <GenderPieChart />
          </div>
        </div>
        <div className="box">
        <div className="bottomist ">
          {/* <h4 className="top_performing_title text-center mb-5">Best Teachers</h4>
          <div className="top_performing">
            <Ctcard 
              icon={Users}
              score={"Form 3"}
              student={"Emmanuel Nyangazi"}
            />
            <Ctcard 
              icon={Users}
              score={"Form 3"}
              student={"Emmanuel Nyangazi"}
            />
            <Ctcard 
              icon={Users}
              score={"Form 3"}
              student={"Emmanuel Nyangazi"}
            />
            </div> */}
          </div> 
          <div className="topist mt-5">
          <h4 className="top_performing_title">Class Teachers</h4>
          <div className="top_performing">
            {
              teacher.map((item) => (
                <Ctcard 
                  icon={Presentation}
                  score={item.classs}
                  student={item.teacher}
                />
              ))
            }
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default TeacherBoard;
