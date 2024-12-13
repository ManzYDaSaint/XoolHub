import React from "react";
import Card from "../../../students/dashboard/components/card";
import { File, CircleDashed } from "lucide-react";
import CustomCard from "./custom-card";

const ReportOverview = () => {
  return (
    <div className="overview-section">
      <Card icon={File} title={"14"} description={"Total Results"} />
      <CustomCard
        icon={CircleDashed}
        title={"Form 1"}
        percentage={"40"}
        description={'Percentage of system result'}
      />
      <CustomCard
        icon={CircleDashed}
        title={"Form 2"}
        percentage={"95"}
        description={'Percentage of system result'}
      />
      <CustomCard
        icon={CircleDashed}
        title={"Form 3"}
        percentage={"70"}
        description={'Percentage of system result'}
      />
      <CustomCard
        icon={CircleDashed}
        title={"Form 4"}
        percentage={"20"}
        description={'Percentage of system result'}
      />
    </div>
  );
};

export default ReportOverview;
