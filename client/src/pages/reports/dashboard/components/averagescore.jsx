import React from "react";
import SubjectChart from "./subject-chart";

const AverageScore = () => {
  const data = [
    { subject: "Agriculture", average: 20 },
    { subject: "Biology", average: 25 },
    { subject: "Chemistry", average: 18 },
    { subject: "English", average: 58 },
    { subject: "Mathematics", average: 49 },
    { subject: "Chichewa", average: 89 },
    { subject: "Physics", average: 72 },
    { subject: "L/Skills", average: 20 },
    { subject: "BK", average: 90 },
    { subject: "Arts", average: 61 },
    { subject: "Geography", average: 39 },
  ];

  return (
    <div className="average_container">
      <div className="average_header">
        <h5>Average Score By Subject</h5>
        <div className="average_gender">
            <select value={''} onChange={''}>
                <option value={''} disabled selected>-- Select class --</option>
                <option value={'Form 1'}>Form 1</option>
                <option value={'Form 2'}>Form 2</option>
                <option value={'Form 3'}>Form 3</option>
                <option value={'Form 4'}>Form 4</option>
            </select>
        </div>
      </div>
      <div className="average_body">
        <SubjectChart data={data} />
      </div>
    </div>
  );
};

export default AverageScore;
