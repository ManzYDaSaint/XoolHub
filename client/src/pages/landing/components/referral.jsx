"use client";

import { useState } from "react";
import {
  Share2,
  Gift,
  Users,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Star,
  TrendingUp,
  Award,
  Zap,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Navbar from "./navbar";
import Footer from "./footer";
import HeaderBtn from "./ui/headerBtn";

export default function ReferralPage() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqData = [
    {
      question: "How does the referral program work?",
      answer:
        "Share your unique referral code with friends. When they sign up and make their first purchase, you both earn rewards!",
    },
    {
      question: "When do I receive my rewards?",
      answer:
        "Rewards are credited to your account within 24-48 hours after your referral completes their qualifying action.",
    },
    {
      question: "Is there a limit to how many people I can refer?",
      answer:
        "No! You can refer as many people as you'd like. The more you refer, the more you earn.",
    },
    {
      question:
        "What happens if my referral doesn't complete the required action?",
      answer:
        "Both you and your referral need to complete the qualifying actions to receive rewards. Incomplete referrals won't earn rewards.",
    },
    {
      question: "Can I refer someone who already has an account?",
      answer:
        "Referral rewards are only available for new users who haven't previously registered on our platform.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto mt-16">
              <span
                variant="secondary"
                className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100 inline-flex items-center justify-center px-6 py-2 rounded-full text-sm font-medium"
              >
                <Gift className="w-4 h-4 mr-2" />
                Referral Program
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
                Share the Love,{" "}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Earn Rewards
                </span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Invite your friends and family to join our platform. When they
                sign up and make their first purchase, you both get rewarded
                with exclusive benefits and cash bonuses.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    50
                  </div>
                  <div className="text-slate-600">Rewards</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    16
                  </div>
                  <div className="text-slate-600">Happy referrers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-2">
                    5 Schools
                  </div>
                  <div className="text-slate-600">System Customization</div>
                </div>
              </div>

              <button
                onClick={() => {
                  "/register";
                }}
                size="lg"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
              >
                Start Referring Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="inline-flex">
                <HeaderBtn> How It Works</HeaderBtn>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto mt-4">
                Getting started with our referral program is simple. Follow
                these easy steps to start earning rewards.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  1. Share Your Code
                </h3>
                <p className="text-slate-600">
                  Copy your unique referral code and share it with friends via
                  email, social media, or messaging apps.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  2. Friend Signs Up
                </h3>
                <p className="text-slate-600">
                  Your friend when creating an account, should activate the
                  refferal code and makes their first purchase within a day.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  3. You Both Earn
                </h3>
                <p className="text-slate-600">
                  Once your friend completes their first purchase, you both
                  receive your rewards automatically.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Rewards Section */}
        <section id="rewards" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="inline-flex">
                <HeaderBtn>Reward Tiers</HeaderBtn>
              </h2>
              <p className="text-slate-600 max-w-2xl mx-auto mt-4">
                The more you refer, the more you earn. Unlock higher tiers and
                exclusive benefits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative overflow-hidden border-2 border-slate-200 bg-slate-50/50 rounded-lg hover:shadow-lg transition-shadow py-8 px-4">
                <div className="text-center pb-2">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-slate-600" />
                  </div>
                  <h5 className="text-xl font-semibold">Bronze</h5>
                  <p className="text-slate-600">1-3 referrals</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-4">
                    10% Discount
                  </div>
                  <p className="text-slate-600 mb-6">
                    You will get 10% discount on your next purchase
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden border-2 border-blue-200 bg-slate-50/50 rounded-lg hover:shadow-lg transition-shadow py-8 px-4">
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
                <div className="text-center pb-2 pt-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <h5 className="text-xl font-semibold">Silver</h5>
                  <p className="text-slate-600">4-6 referrals</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-4">
                    15% Referral Bonus
                  </div>
                  <p className="text-slate-600 mb-6">
                    You will get 15% of the total amount the referral purchases
                  </p>
                </div>
              </div>

              <div className="relative overflow-hidden border-2 border-slate-200 bg-slate-50/50 rounded-lg hover:shadow-lg transition-shadow py-8 px-4">
                <div className="text-center pb-2">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h5 className="text-xl font-semibold">Gold</h5>
                  <p className="text-slate-600">7+ referrals</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-4">
                    Lifetime Discount & Bonus
                  </div>
                  <p className="text-slate-600 mb-6">
                    You will get 10% Discount on every purchase and 15% Referral
                    Bonus
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Your Progress Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="inline-flex mb-4">
                <HeaderBtn>Referrals Progress</HeaderBtn>
              </h2>
              <p className="text-slate-600">
                Track referral success and earnings
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div>
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    12
                  </div>
                  <div className="text-sm text-slate-600">Total Referrals</div>
                </div>
              </div>

              <div>
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    8
                  </div>
                  <div className="text-sm text-slate-600">Successful</div>
                </div>
              </div>

              <div>
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    MK820,000
                  </div>
                  <div className="text-sm text-slate-600">Total Earned</div>
                </div>
              </div>

              <div>
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    Silver
                  </div>
                  <div className="text-sm text-slate-600">Hot Tier</div>
                </div>
              </div>
            </div>

            {/* <div>
            <div>
              <h5 className="flex items-center justify-between">
                Progress to Gold Tier
                <span variant="secondary">4 more referrals needed</span>
              </h5>
            </div>
            <div>
              <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
                <div
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full"
                  style={{ width: "65%" }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>12 referrals</span>
                <span>16 referrals (Gold)</span>
              </div>
            </div>
          </div> */}
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="inline-flex mb-4">
                <HeaderBtn>Frequently Asked Questions</HeaderBtn>
              </h2>
              <p className="text-slate-600">
                Everything you need to know about our referral program
              </p>
            </div>

            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="overflow-hidden">
                  <div
                    className="cursor-pointer px-4 py-3 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="text-md">{faq.question}</h5>
                      {openFaq === index ? (
                        <ChevronUp className="w-5 h-5 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-500" />
                      )}
                    </div>
                  </div>
                  {openFaq === index && (
                    <div className="p-4 bg-gray-50 text-gray-600">
                        {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
