import React from "react";
import Card from '../../students/dashboard/components/card'
import { Presentation, Users, UsersRound } from "lucide-react";
import GenderPieChart from './components/piechart'
import Ctcard from "./components/tcard";

const TeacherBoard = () => {
  const piedata = [
    { name: 'Male', value: 25 },
    { name: 'Female', value: 30 },
  ];

  return (
    <div className="student_section">
      <div className="student_section_container">
        <div className="box">
          <div className="flexer">
            <Card
              icon={UsersRound}
              title={"981"}
              description={"Teacher"}
            />
            <div className="card_container">
              <div className="student_count">
                <div className="counter">
                  <UsersRound size={30} className="card_icon" />
                  <div className="card_detail">
                    <h4>120</h4>
                    <p>Male</p>
                  </div>
                </div>
                <div className="vr"></div>
                <div className="counter">
                  <Users size={30} className="card_icon" />
                  <div className="card_detail">
                    <h4>670</h4>
                    <p>Female</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pie_card mt-5">
            <h4 className="pie_title">Gender Distribution</h4>
            <GenderPieChart piedata={piedata}/>
          </div>
        </div>
        <div className="box">
          <h4 className="top_performing_title">Class Teachers</h4>
          <div className="top_performing">
            <Ctcard 
              icon={Presentation}
              score={"Form 3"}
              student={"Emmanuel Nyangazi"}
            />
            <Ctcard 
              icon={Presentation}
              score={"Form 3"}
              student={"Emmanuel Nyangazi"}
            />
            <Ctcard 
              icon={Presentation}
              score={"Form 3"}
              student={"Emmanuel Nyangazi"}
            />
            <Ctcard 
              icon={Presentation}
              score={"Form 3"}
              student={"Emmanuel Nyangazi"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherBoard;
