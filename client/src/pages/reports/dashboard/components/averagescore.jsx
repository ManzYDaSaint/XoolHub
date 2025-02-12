import React, { useEffect, useState } from "react";
import SubjectChart from "./subject-chart";
import api from "../../../../services/apiServices";
import ClassSelector from "../../components/classSelector";

const AverageScore = () => {
  const [data, setData] = useState([]);
  const [classID, setClassID] = useState("");

  const filterData = async() => {
    const res = await api.avSubject({classID});
    setData(res.data.get);
  };

  useEffect(() => {
      if (classID) {
        const fetchData = async () => {
          await filterData(classID);
        };
        fetchData();
      } // eslint-disable-next-line
  }, [classID]);

  return (
    <div className="average_container mt-4">
      <div className="average_header">
        <h5>Average Score By Subject</h5>
        <div className="average_gender">
            <ClassSelector 
              onChange={(e) => {
                setClassID(e.target.value);
              }}
              name="classID"
              value={classID}
            />
        </div>
      </div>
      <div className="average_body">
        <SubjectChart data={data} />
      </div>
    </div>
  );
};

export default AverageScore;
