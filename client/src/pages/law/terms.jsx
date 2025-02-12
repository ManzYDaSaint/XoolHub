import React from "react";
import { Scroll, Book, Users, Shield, Scale } from "lucide-react";
import Navbar from "../landing/components/navbar";
import Footer from "../landing/components/footer";

const TermsOfService = () => {
  return (
    <>
      <Navbar />
      <div className="pricing-page mt-20">
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-20 mb-12">
          <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg overflow-hidden" style={{fontFamily: "'Poppins', san-serif"}}>
            <div className="px-4 py-5 sm:px-6 bg-blue-600 text-white">
              <h1 className="text-3xl font-bold flex items-center" style={{fontFamily: "'Poppins', san-serif"}}>
                <Scroll className="mr-2" />
                Terms of Service
              </h1>
              <p className="mt-1 text-sm">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center" style={{fontFamily: "'Poppins', san-serif"}}>
                <Book className="mr-2" />
                1. Introduction
              </h2>
              <p className="mb-4">
                Welcome to our Multi-School Information Management System. By
                using our service, you agree to these Terms of Service. Please
                read them carefully.
              </p>

              <h2 className="text-2xl font-semibold mb-4 flex items-center" style={{fontFamily: "'Poppins', san-serif"}}>
                <Users className="mr-2" />
                2. User Responsibilities
              </h2>
              <ul className="list-disc pl-5 mb-4">
                <li>
                  You must provide accurate and complete information when
                  creating an account.
                </li>
                <li>
                  You are responsible for maintaining the confidentiality of
                  your account and password.
                </li>
                <li>
                  You agree to notify us immediately of any unauthorized use of
                  your account.
                </li>
                <li>
                  You must not use the service for any illegal or unauthorized
                  purpose.
                </li>
              </ul>

              <h2 className="text-2xl font-semibold mb-4 flex items-center" style={{fontFamily: "'Poppins', san-serif"}}>
                <Shield className="mr-2" />
                3. Data Protection and Privacy
              </h2>
              <p className="mb-4">
                We are committed to protecting your personal data. Our use of
                your personal information is governed by our Privacy Policy,
                which is incorporated into these Terms of Service.
              </p>

              <h2 className="text-2xl font-semibold mb-4 flex items-center" style={{fontFamily: "'Poppins', san-serif"}}>
                <Scale className="mr-2" />
                4. Intellectual Property Rights
              </h2>
              <p className="mb-4">
                The service and its original content, features, and
                functionality are owned by us and are protected by international
                copyright, trademark, patent, trade secret, and other
                intellectual property or proprietary rights laws.
              </p>

              <h2 className="text-2xl font-semibold mb-4" style={{fontFamily: "'Poppins', san-serif"}}>5. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your account and bar access to the
                service immediately, without prior notice or liability, under
                our sole discretion, for any reason whatsoever and without
                limitation, including but not limited to a breach of the Terms.
              </p>

              <h2 className="text-2xl font-semibold mb-4" style={{fontFamily: "'Poppins', san-serif"}}>
                6. Limitation of Liability
              </h2>
              <p className="mb-4">
                In no event shall we be liable for any indirect, incidental,
                special, consequential or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other
                intangible losses, resulting from your access to or use of or
                inability to access or use the service.
              </p>

              <h2 className="text-2xl font-semibold mb-4" style={{fontFamily: "'Poppins', san-serif"}}>
                7. Changes to Terms
              </h2>
              <p className="mb-4">
                We reserve the right to modify or replace these Terms at any
                time. If a revision is material, we will provide at least 30
                days' notice prior to any new terms taking effect.
              </p>

              <h2 className="text-2xl font-semibold mb-4" style={{fontFamily: "'Poppins', san-serif"}}>8. Contact Us</h2>
              <p>
                If you have any questions about these Terms, please contact us
                at terms@schoolmanagementsystem.com.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsOfService;
