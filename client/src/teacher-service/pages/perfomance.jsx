import React from "react";
import {
  ShieldCheck,
  BookOpen,
  Wallet,
  CalendarCheck,
} from "lucide-react";

const analytics = [
  {
    title: "Discipline",
    icon: <ShieldCheck className="text-blue-500 w-8 h-8" />,
    stat: "98%",
    desc: "Positive Behavior",
    bg: "bg-blue-50",
  },
  {
    title: "Academics",
    icon: <BookOpen className="text-green-500 w-8 h-8" />,
    stat: "87%",
    desc: "Average Score",
    bg: "bg-green-50",
  },
  {
    title: "Fees",
    icon: <Wallet className="text-yellow-500 w-8 h-8" />,
    stat: "92%",
    desc: "Fees Paid",
    bg: "bg-yellow-50",
  },
  {
    title: "Attendance",
    icon: <CalendarCheck className="text-purple-500 w-8 h-8" />,
    stat: "95%",
    desc: "Attendance Rate",
    bg: "bg-purple-50",
  },
];

const Performances = () => {
  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {analytics.map((item) => (
        <div
          key={item.title}
          className={`flex flex-col items-center rounded-xl shadow ${item.bg} p-6`}
        >
          <div>{item.icon}</div>
          <div className="mt-4 text-lg font-semibold">{item.title}</div>
          <div className="mt-2 text-3xl font-bold">{item.stat}</div>
          <div className="text-gray-500">{item.desc}</div>
        </div>
      ))}
    </div>
  );
};

export default Performances;
