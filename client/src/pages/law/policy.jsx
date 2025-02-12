import React from "react";
import {
  Lock,
  Eye,
  Database,
  Bell,
  Trash2,
  Globe,
  MessageCircle,
} from "lucide-react";
import Navbar from "../landing/components/navbar";
import Footer from "../landing/components/footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Navbar />
      <div className="pricing-page mt-5">
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-12">
          <div
            className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <div className="px-4 py-5 sm:px-6 bg-blue-600 text-white">
              <h1 className="text-3xl font-bold flex items-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <Lock className="mr-2" />
                Privacy Policy
              </h1>
              <p className="mt-1 text-sm">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <Eye className="mr-2" />
                1. Information We Collect
              </h2>
              <p className="mb-4">
                We collect information you provide directly to us, such as when
                you create or modify your account, request services, contact
                customer support, or otherwise communicate with us. This
                information may include:
              </p>
              <ul className="list-disc pl-5 mb-4">
                <li>
                  Name, email address, password, and other account registration
                  information
                </li>
                <li>
                  School information, class schedules, and academic records
                </li>
                <li>Transaction information and payment details</li>
                <li>Communications you send to us</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 flex items-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <Database className="mr-2" />
                2. How We Use Your Information
              </h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-5 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>
                  Send you technical notices, updates, security alerts, and
                  support messages
                </li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Develop new products and services</li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 flex items-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <Bell className="mr-2" />
                3. Information Sharing and Disclosure
              </h2>
              <p className="mb-4">We may share your information as follows:</p>
              <ul className="list-disc pl-5 mb-4">
                <li>
                  With schools and educational institutions you are associated
                  with
                </li>
                <li>
                  With vendors, consultants, and other service providers who
                  need access to such information to carry out work on our
                  behalf
                </li>
                <li>
                  In response to a request for information if we believe
                  disclosure is in accordance with any applicable law,
                  regulation, or legal process
                </li>
                <li>
                  If we believe your actions are inconsistent with our user
                  agreements or policies, or to protect the rights, property,
                  and safety of us or others
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 flex items-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <Trash2 className="mr-2" />
                4. Data Retention and Deletion
              </h2>
              <p className="mb-4">
                We retain your information for as long as your account is active
                or as needed to provide you services. You can request deletion
                of your personal information by contacting us. We may retain
                certain information as required by law or for legitimate
                business purposes.
              </p>

              <h2 className="text-2xl font-semibold mb-4 flex items-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <Globe className="mr-2" />
                5. International Data Transfers
              </h2>
              <p className="mb-4">
                We may transfer your information to countries other than the one
                in which you live. We deploy appropriate safeguards to protect
                your personal information when transferred internationally.
              </p>

              <h2 className="text-2xl font-semibold mb-4 flex items-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <MessageCircle className="mr-2" />
                6. Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, please
                contact us at privacy@schoolmanagementsystem.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
