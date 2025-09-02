import React from "react";
import HeaderBtn from "./ui/headerBtn";
import {
  GraduationCap,
  Layers3,
  Wallet,
  ClipboardList,
  MessageSquare,
  CalendarClock,
  CreditCard,
} from "lucide-react";

const features = [
	{
		title: "Student Management",
		description: "Manage student data across multiple schools with ease.",
		Icon: GraduationCap,
	},
	{
		title: "Class & Subject Management",
		description: "Organize classes, assign subjects, and streamline scheduling.",
		Icon: Layers3,
	},
	{
		title: "Expenses Management",
		description: "Efficient expenses management for the whole institution.",
		Icon: Wallet,
	},
	{
		title: "Fees Management",
		description: "Automated fee collection and record-keeping.",
		Icon: CreditCard,
	},
	{
		title: "Examination Management",
		description: "Schedule exams and manage results effortlessly.",
		Icon: ClipboardList,
	},
	{
		title: "Telegram Integration",
		description:
			"Seamless communication between teachers, admins, and parents.",
		Icon: MessageSquare,
	},
];

const FeatureSection = () => {
	return (
		<section className="px-6 md:px-14 py-6 my-20 space-y-8 text-center">
			<p className="inline-flex">
				<HeaderBtn>Key Features</HeaderBtn>
			</p>
			<h2 className="text-xl font-bold text-blue-900 md:text-4xl">
				Explore the features that make <br /> our platform exceptional.
			</h2>
			<p className="text-gray-700 text-md md:text-lg">
				Powerful tools to streamline operations and elevate your school’s experience.
			</p>
			<div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 pt-4">
				{features.map((ft, index) => (
					<div
						key={index}
						className="group relative overflow-hidden rounded-2xl bg-white p-6 text-left shadow-sm ring-1 ring-black/5 transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
						tabIndex={0}
					>
						<div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-fuchsia-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
						<div className="relative flex items-start gap-4">
							<div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 ring-1 ring-indigo-200 transition-transform duration-300 group-hover:scale-105 group-hover:-translate-y-0.5">
								{ft.Icon ? <ft.Icon className="h-6 w-6" /> : <CalendarClock className="h-6 w-6" />}
							</div>
							<div>
								<h3 className="text-base md:text-lg font-semibold text-gray-900">
									{ft.title}
								</h3>
								<p className="mt-1 text-sm text-gray-600">{ft.description}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default FeatureSection;
