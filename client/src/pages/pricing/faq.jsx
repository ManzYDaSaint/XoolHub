import React, { useState } from "react";
import HeaderBtn from "../landing/components/ui/headerBtn";

const faqData = [
  {
    question: "What is included in the Starter plan?",
    answer: "The Starter plan is essential for schools that are just being introduced and have fewer students.",
  },
  {
    question: "Can I upgrade my subscription at any time?",
    answer: "Yes, you can upgrade your subscription at any time from the account settings page.",
  },
  {
    question: "Is there a free trial available?",
    answer: "Yes, we offer a One (1)-term free trial for all subscription plans.",
  },
  {
    question: "Do you provide support for all plans?",
    answer: "Support is included in all plans, but priority support is available for Pro and Enterprise plans.",
  },
  {
    question: "How do I cancel my subscription?",
    answer: "You can cancel your subscription anytime through your account dashboard without any penalties.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen plans mt-5">
      <div className="text-center mt-5 space-y-4">
        <h2 className="inline-flex">
          <HeaderBtn>FAQ</HeaderBtn>
          </h2>
        <h5 className="text-xl font-bold text-blue-900 md:text-4xl">Our Frequently Asked Questions</h5>
        <p className="text-gray-700 text-md md:text-lg">Check out our frequently asked questions that might help you get answers to most of the <br /> questions which most people have already been answered.</p>
    </div>
      <div className="max-w-4xl mx-auto mt-8">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="mb-4 text-md border border-gray-300 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              className="w-full p-4 text-left bg-white flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-md font-medium text-gray-700">{faq.question}</span>
              <span className="text-gray-500">{activeIndex === index ? "-" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-gray-50 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;