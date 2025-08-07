import React from "react";
import ExamPro from "./assets/examPro.png";
import ExamData from "../../../../helpers/examination/examData";

const Examinations = () => {
  return (
    <div class="border-2 border-gray-300 rounded-lg p-4">
      <div class="flex items-center border-b-2 border-gray-300 pb-3">
        <img src={ExamPro} alt="contentIcon" className="h-16" />
        <h5 className="text-lg font-semibold text-gray-600 border-l-2 border-gray-300 pl-4 ml-4">
          Examination Type
        </h5>
      </div>
      <div class="col-lg-12">
        <div class="examination__container mt-4">
          <ExamData />
        </div>
      </div>
    </div>
  );
};

export default Examinations;
