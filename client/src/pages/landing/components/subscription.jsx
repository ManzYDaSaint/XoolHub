// import React from "react";
// import { Trophy, CheckCircle } from "lucide-react";
// import { Link } from "react-router-dom";
// import HeaderBtn from "./ui/headerBtn";

// const SubscriptionOptions = () => {
//   const pricingPlans = [
//     {
//       label: "Basic Suite",
//       name: "Starter",
//       price: "50,000",
//       period: "/term",
//       currency: "MK",
//       description: "Perfect for single or small schools",
//       features: [
//         "Student Information Management",
//         "Basic Attendance Tracking",
//         "Class Scheduling",
//         "Parent Communication Portal",
//         "Basic Reporting",
//         "Email Support"
//       ],
//       popular: false,
//     },
//     {
//       label: "Premium Suite",
//       name: "Professional",
//       price: "150,000",
//       period: "/term",
//       currency: "MK",
//       description: "Ideal for growing schools and academies",
//       features: [
//         "Everything in Starter",
//         "Bulk Student Management",
//         "Advanced Analytics",
//         "White-label Branding",
//         "Staff & Teacher Management",
//         "Fees Management",
//         "Downloadable Report Cards",
//         "Priority Support"
//       ],
//       popular: true,
//     },
//     {
//       label: "Enterprise Suite",
//       name: "Enterprise",
//       price: "250,000",
//       period: "/term",
//       currency: "MK",
//       description: "For large school groups and districts",
//       features: [
//         "Everything in Professional",
//         "API Access & Integrations",
//         "WhatsApp Integrations",
//         "Dedicated Account Manager",
//         "Bulk Data Import/Export",
//         "24/7 Phone Support",
//         "Custom Modules & Workflows"
//       ],
//       popular: false,
//     },
//   ]

//   return (
//     <section className="px-14 py-6 my-20 space-y-8 text-center">
//       <p className="inline-flex">
//         <HeaderBtn>Pricing</HeaderBtn>
//       </p>
//       <h5 className="text-xl font-bold text-blue-900 md:text-4xl">
//         Flexible Plans to Grow with Your <br /> School either Public or Private
//       </h5>
//       <p className="text-gray-700 text-md md:text-lg">
//         Check out our pricing options and choose the best
//         <br /> plan depending on your school's needs.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto py-6 md:py-16">
//             {pricingPlans.map((plan, index) => (
//               <div
//                 key={index}
//                 className={`relative ${plan.popular ? "border-2 border-blue-800 shadow-xl scale-105 rounded-lg p-6 py-2" : "border border-gray-200 shadow-lg rounded-lg p-6"} hover:shadow-xl transition-all duration-300`}
//               >
//                 {plan.popular && (
//                   <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
//                     <span className="bg-blue-800 text-sm md:text-md text-white px-4 py-1 rounded-full">Most Popular</span>
//                   </div>
//                 )}
//                 <div className="text-center pb-8">
//                   <header className="flex flex-col md:flex-row items-center justify-between py-4 space-y-2">
//                   <h3 className="text-sm md:text-lg font-semibold text-gray-700">{plan.label}</h3>
//                   <HeaderBtn>{plan.name}</HeaderBtn>
//                   </header>
//                   <div className="mt-4">
//                     <span className="text-blue-900 text-semibold">{plan.currency}</span>
//                     <span className="text-2xl md:text-4xl font-bold text-left text-blue-900">{plan.price}</span>
//                     <span className="text-gray-600">{plan.period}</span>
//                   </div>
//                   <p className="my-3 text-gray-600">{plan.description}</p>
//                   <hr />
//                 </div>
//                 <div className="space-y-4">
//                   <ul className="space-y-3">
//                     {plan.features.map((feature, featureIndex) => (
//                       <li key={featureIndex} className="flex items-center">
//                         <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
//                         <span className="text-gray-700">{feature}</span>
//                       </li>
//                     ))}
//                   </ul>
//                   <button
//                     className={`w-full mt-8 ${plan.popular ? "bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-2 rounded-lg" : "bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-lg"}`}
//                     size="lg"
//                   >
//                     Start Free Trial
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//     </section>
//   );
// };

// export default SubscriptionOptions;

"use client";

import { Check, Star, Trophy } from "lucide-react";
import HeaderBtn from "./ui/headerBtn";
import { Link } from "react-router-dom";

// Features Section Component (inline)
function SubscriptionOptions({ features }) {
  return (
    <div className="mt-20 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-4">
          Every Plan Includes Full System Access
        </h2>
        <p className="text-md md:text-lg text-gray-600">
          No feature restrictions. Pay only based on your student capacity.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
          <div className="text-center">
            <div className="text-emerald-800 font-semibold mb-2">
              🚀 No Hidden Limits or Restrictions
            </div>
            <div className="text-sm text-emerald-700">
              Access every feature from day one, regardless of which plan you
              choose. Scale your subscription based only on student enrollment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Component() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small schools and academies",
      price: "150,000",
      students: "Up to 100",
      studentCount: "100",
      popular: false,
      pricePerStudent: "1500",
    },
    {
      name: "Professional",
      description: "Ideal for growing educational institutions",
      price: "250,000",
      students: "Up to 250",
      studentCount: "250",
      popular: true,
      pricePerStudent: "1000",
    },
    {
      name: "Enterprise",
      description: "Comprehensive solution for large institutions",
      price: "375,000",
      students: "Up to 500",
      studentCount: "500",
      popular: false,
      pricePerStudent: "750",
    },
  ];

  // Single feature list that applies to all plans
  const allFeatures = [
    "Complete student information management",
    "Comprehensive grade & assessment management",
    "Parent & student communication portal",
    "Staff management",
    "Timetable & class scheduling",
    "Fee management & invoicing",
    "Transport & hostel management",
    "Exam management & downloadable report cards",
    "Custom reports & analytics dashboard",
    "Mobile app for all users (In development)",
    "SMS & email notifications",
    "Multi-campus support",
    "24/7 priority support",
    "Data backup & security",
    "Advanced Analytics",
    "White-label Branding",
    "API Access & Integrations",
    "WhatsApp Integrations",
    "Dedicated Accounts Managements",
    "Bulk Data Import/Export",
  ];

  return (
    <div className="min-h-screen px-14 py-6 my-20 space-y-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-8">
          <p className="inline-flex">
            <HeaderBtn>Pricing</HeaderBtn>
          </p>
          <h5 className="text-xl font-bold text-blue-900 md:text-4xl">
            Flexible Plans to Grow with Your <br /> School either Public or
            Private
          </h5>
          <p className="text-gray-700 text-md md:text-lg">
            Check out our pricing options and choose the best
            <br /> plan depending on your school's needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid space-y-8 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative transition-all duration-300 hover:shadow-2xl rounded-2xl p-6 ${
                plan.popular
                  ? "border-2 border-emerald-500 shadow-xl scale-105"
                  : "border border-gray-200 hover:border-emerald-300"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 flex items-center gap-1 text-sm md:text-md rounded-full shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </span>
                </div>
              )}

              <header className="text-center pb-8">
                <h3 className="text-sm md:text-xl font-semibold text-gray-700">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mt-2">{plan.description}</p>

                {/* Student Capacity - Main Differentiator */}
                <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="text-3xl font-bold text-emerald-700">
                    {plan.students}
                  </div>
                  <div className="text-sm text-emerald-600 font-medium">
                    Students
                  </div>
                </div>

                {/* Pricing */}
                <div className="mt-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-lg md:text-4xl font-bold text-gray-900">
                      MK{plan.price}
                    </span>
                    <span className="text-gray-600 ml-2">/term</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    Billed termly
                  </div>
                </div>
              </header>

              <div className="px-6">
                {/* Student Capacity Highlight */}
                <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-emerald-700 mb-1">
                      {plan.studentCount}
                    </div>
                    <div className="text-sm text-emerald-600 font-medium mb-2">
                      Students Maximum
                    </div>
                    <div className="text-xs text-gray-600">
                      MK{plan.pricePerStudent} per student per term
                    </div>
                  </div>
                </div>

                {/* Full Feature Access Badge */}
                <div className="mb-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-center">
                  <div className="text-sm font-semibold text-slate-700 mb-1">
                    🎯 Complete System Access
                  </div>
                  <div className="text-xs text-slate-600">
                    All features included in every plan
                  </div>
                </div>

                {/* Sample of key features */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700 mb-3">
                    Key Features Include:
                  </div>
                  {allFeatures.slice(0, 6).map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600 text-xs">{feature}</span>
                    </div>
                  ))}
                  <div className="text-xs text-gray-500 italic pt-2">
                    + {allFeatures.length - 6} more features included
                  </div>
                </div>
              </div>

              <section className="px-6 pt-6">
                <Link to={`/register`}>
                  <button
                    className={`w-full py-3 text-base font-semibold transition-all duration-200 rounded-lg ${
                      plan.popular
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl"
                        : "bg-white hover:bg-emerald-50 text-emerald-600 border-2 border-emerald-600 hover:border-emerald-700"
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.popular ? "Start Free Trial" : "Get Started"}
                  </button>
                </Link>
              </section>
            </div>
          ))}
        </div>

        {/* Full Features List */}
        <SubscriptionOptions features={allFeatures} />

        {/* Additional Info */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            All plans include a One(1)-term free trial. No credit card required.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>Data migration support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500" />
              <span>99.9% uptime guarantee</span>
            </div>
          </div>
        </div>

        {/* Enterprise Contact */}
        <div className="text-center">
        <div className="mt-10 max-w-4xl mx-auto inline-flex p-[3px] rounded-2xl bg-gradient-to-r from-blue-600 via-purple-500 to-green-400">
          <div className="flex flex-col md:flex-row items-center justify-center text-left gap-0">
            <div className="text-white p-3 md:p-8 rounded-lg">
              <Trophy size={40} />
            </div>
            <div className="bg-white/80 rounded-2xl px-2 py-4 md:px-4 md:py-2">
              <h5 className="text-md font-bold text-blue-900 md:text-lg">
                Need More Than 500 Students or add features?
              </h5>
              <p className="text-gray-600 text-sm md:text-md">
                Contact our sales team for custom pricing on higher student
                capacities and added features. With added features and full
                system access, tailored to your institution's size and
                requirements. <br />
                <Link to={"/contact"} className="text-blue-600 font-bold">
                  Get Custom Quote
                </Link>{" "}
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
