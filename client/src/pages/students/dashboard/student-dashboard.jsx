import React from "react";
import Card from "./components/card";
import { GraduationCap, Users, UsersRound } from "lucide-react";
import StudentBarChart from "./components/barchart";
import TopPerforming from "./components/topcard";
import GenderPieChart from "./components/piechart";

const StudentDashboard = () => {
  const data = [
    { name: "Form 1", Male: 20, Female: 15 },
    { name: "Form 2", Male: 25, Female: 22 },
    { name: "Form 3", Male: 18, Female: 17 },
    { name: "Form 4", Male: 58, Female: 81 },
  ];

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
              description={"Student Count"}
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
          <div className="graph_card mt-5">
            <h4 className="graph_title">Student Count</h4>
            <StudentBarChart data={data} />
          </div>
          <div className="pie_card mt-5">
            <h4 className="pie_title">Gender Distribution</h4>
            <GenderPieChart piedata={piedata}/>
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
