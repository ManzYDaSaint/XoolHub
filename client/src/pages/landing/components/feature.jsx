import React from "react";
import HeaderBtn from "./ui/headerBtn";
import { motion } from "framer-motion";
import {
  GraduationCap,
  Layers3,
  Wallet,
  ClipboardList,
  MessageSquare,
  CreditCard,
  Users,
  BarChart3,
  Shield,
  Zap,
} from "lucide-react";

const features = [
	{
		title: "Student Management",
		description: "Manage student data across multiple schools with ease. Track enrollment, attendance, and academic progress seamlessly.",
		Icon: GraduationCap,
		color: "from-blue-500 to-indigo-600",
		delay: 0.1
	},
	{
		title: "Class & Subject Management",
		description: "Organize classes, assign subjects, and streamline scheduling with intelligent automation and conflict detection.",
		Icon: Layers3,
		color: "from-purple-500 to-pink-600",
		delay: 0.2
	},
	{
		title: "Expenses Management",
		description: "Efficient expenses management for the whole institution with real-time tracking and automated reporting.",
		Icon: Wallet,
		color: "from-green-500 to-emerald-600",
		delay: 0.3
	},
	{
		title: "Fees Management",
		description: "Automated fee collection and record-keeping with multiple payment gateways and automated reminders.",
		Icon: CreditCard,
		color: "from-orange-500 to-red-600",
		delay: 0.4
	},
	{
		title: "Examination Management",
		description: "Schedule exams and manage results effortlessly with automated grading and performance analytics.",
		Icon: ClipboardList,
		color: "from-indigo-500 to-purple-600",
		delay: 0.5
	},
	{
		title: "Telegram Integration",
		description: "Seamless communication between teachers, admins, and parents with instant notifications and updates.",
		Icon: MessageSquare,
		color: "from-blue-500 to-cyan-600",
		delay: 0.6
	},
	{
		title: "Attendance Tracking",
		description: "Automated attendance tracking with biometric integration and real-time reporting for better accountability.",
		Icon: Users,
		color: "from-teal-500 to-green-600",
		delay: 0.7
	},
	{
		title: "Analytics & Reports",
		description: "Comprehensive analytics and detailed reports to track performance and make data-driven decisions.",
		Icon: BarChart3,
		color: "from-violet-500 to-purple-600",
		delay: 0.8
	},
	{
		title: "Security & Compliance",
		description: "Enterprise-grade security with role-based access control and compliance with educational data protection standards.",
		Icon: Shield,
		color: "from-gray-600 to-slate-700",
		delay: 0.9
	}
];

const FeatureSection = () => {
	return (
		<section className="py-24 relative overflow-hidden">
			{/* Background decorative elements */}
			<div className="absolute inset-0">
				<div className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
				<div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '3s' }}></div>
			</div>

			<div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
				<div className="max-w-7xl mx-auto">
					{/* Header */}
					<motion.div
						className="mb-16"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
					>
						<p className="inline-flex"><HeaderBtn>Key Features</HeaderBtn></p>
					</motion.div>

					<motion.h2 
						className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent leading-tight"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
					>
						Explore the features that make <br className="hidden md:block" />
						our platform exceptional
					</motion.h2>

					<motion.p 
						className="text-lg md:text-xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.4 }}
					>
						Powerful tools to streamline operations and elevate your school's experience with intelligent automation and real-time insights.
					</motion.p>

					{/* Features Grid */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
						{features.map((ft, index) => (
							<motion.div
								key={index}
								className="group relative"
								initial={{ opacity: 0, y: 30 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: ft.delay }}
								whileHover={{ y: -10, scale: 1.02 }}
							>
								<div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300 h-full">
									{/* Icon Container */}
									<div className={`w-20 h-20 bg-gradient-to-br ${ft.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
										<ft.Icon className="h-10 w-10 text-white" />
									</div>

									{/* Content */}
									<div className="text-center">
										<h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors duration-300">
											{ft.title}
										</h3>
										<p className="text-gray-600 leading-relaxed text-sm md:text-base">
											{ft.description}
										</p>
									</div>

									{/* Hover Effect Overlay */}
									<div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl -z-10" />
								</div>
							</motion.div>
						))}
					</div>

					{/* Bottom CTA */}
					<motion.div 
						className="mt-20 text-center"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 1.2 }}
					>
						<div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg">
							<Zap className="h-5 w-5" />
							<span className="font-semibold">Ready to transform your school management?</span>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default FeatureSection;
