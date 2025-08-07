import React from "react";

const Ctcard = ({ icon: Icon, score, student }) => {
  return (
    <div className="p-4 border-2 border-gray-300 rounded-lg">
      <div className="flex items-center gap-4">
        <p className="bg-blue-600 rounded-md ml-1 px-3 py-2 text-white">

        {Icon && <Icon size={35} className="h-6 w-6 md:h-7 md:w-7" />}
        </p>
        <div className="">
          <h4 className="text-sm text-gray-700">{score}</h4>
          <p className="font-semibold">{student}</p>
        </div>
      </div>
    </div>
  );
};

export default Ctcard;
