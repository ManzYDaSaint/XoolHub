import React from "react";
import { Check, X } from "lucide-react";

const subscriptionPlans = [
  {
    name: "Basic",
    features: [true, false, false, false, true, true, true, true, false, false, true, false, false, false, false],
  },
  {
    name: "Pro",
    features: [true, false, true, false, true, true, true, true, true, false, true, false, true, false, false],
  },
  {
    name: "Enterprise",
    features: [true, true, true, false, true, true, true, true, true, true, true, true, true, false, false],
  },
  {
    name: "Custom",
    features: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
  },
];

const featuresList = [
  "Access to basic features",
  "Priority Support",
  "Advanced Analytics",
  "Custom Integrations",
  "Student Management",
  "Teacher Management",
  "Results Management",
  "Examinations Management",
  "File Export and Import",
  "Parents Portal",
  "Fees Management",
  "Academic Settings",
  "Timetable",
  "Dedicated account manager",
  "API Intergration"
];

const SubscriptionPlans = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen plans">
      <div className="text-center">

      <h2>SUBSCRIPTIONS</h2>
      <h5>Our subscriptions plans</h5>
      <p>Check out our subscription plans and their features and choose the best<br /> plan that suits your school.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4 text-left font-semibold text-gray-700">Features</th>
              {subscriptionPlans.map((plan) => (
                <th
                  key={plan.name}
                  className="p-4 font-semibold text-gray-700 text-center"
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {featuresList.map((feature, featureIndex) => (
              <tr
                key={feature}
                className={
                  featureIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                }
              >
                <td className="p-4 border-t border-gray-300 text-gray-700">
                  {feature}
                </td>
                {subscriptionPlans.map((plan, planIndex) => (
                  <td
                    key={`${featureIndex}-${planIndex}`}
                    className="p-4 border-t border-gray-300 text-center"
                  >
                    {plan.features[featureIndex] ? (
                      <Check className="text-green-500 inline-block" />
                    ) : (
                      <X className="text-red-500 inline-block" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
