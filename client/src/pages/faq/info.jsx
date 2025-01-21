import React, { useState } from "react";
import { Link } from "react-router-dom";

const faqData = [
  {
    question: "What is the Multi-School Management System?",
    answer:
      "The Multi-School Management System is a platform designed to help schools streamline their administrative and academic operations, allowing seamless management of multiple schools under one system.",
  },
  {
    question: "Is my data secure on this platform?",
    answer:
      "Yes, we use advanced encryption and security protocols to ensure that your data is safe and protected at all times.",
  },
  {
    question: "What are the pricing plans?",
    answer:
      "We offer flexible pricing plans tailored to schools of different sizes and requirements. Visit our Pricing page for detailed information.",
  },
  {
    question: "How do I get support?",
    answer:
      "You can reach our support team 24/7 through email, chat, or phone. We are here to assist you with any issues or inquiries.",
  },
  {
    question: "Can parents access the platform?",
    answer:
      "Yes, parents have their own dedicated portal to monitor their child's progress, communicate with teachers, and stay updated on school events.",
  },
];

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 mt-12">
      <div className="max-w-6xl mx-auto plans mt-5">
        <div className="text-center">

<h2>FAQ</h2>
<h5>Frequently Asked Questions</h5>
<p>Check out our frequently asked questions that might help you get answers to most of the <br /> questions which most people have already been answered.</p>
</div>

        <section>
          <div className="max-w-4xl mx-auto">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="mb-4 border border-gray-300 rounded-lg overflow-hidden shadow-sm"
          >
            <button
              className="w-full p-4 text-left bg-white flex justify-between items-center focus:outline-none"
              onClick={() => toggleFAQ(index)}
            >
              <span className="text-lg font-medium text-gray-700">{faq.question}</span>
              <span className="text-gray-500">{activeIndex === index ? "-" : "+"}</span>
            </button>
            {activeIndex === index && (
              <div className="p-4 bg-gray-50 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
        </section>

        <section className="mt-12 text-center p-5">
          <h2 className="text-3xl text-gray-800 mb-4">Need More Help?</h2>
          <p className="text-gray-600 mb-6">
            If you have additional questions or need assistance, <br />feel free to contact our support team.
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mb-5">
            <Link to={'/contact'} className="text-decoration-none text-white">Contact Support</Link>
          </button>
        </section>
      </div>
    </div>
  );
};

export default FAQPage;
