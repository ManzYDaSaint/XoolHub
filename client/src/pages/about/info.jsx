import React from "react";
import { Users, Globe, Layers, Shield, Zap, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import HeaderBtn from "../landing/components/ui/headerBtn";

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen plans aboutUS">
      {/* Hero */}
      <section className="relative pt-36 px-6 md:px-10">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 text-white shadow-xl ring-1 ring-black/10">
          <div className="px-8 py-12 md:px-12 md:py-16">
            <h5 className="inline-flex">
              <HeaderBtn>ABOUT XOOLHUB</HeaderBtn>
            </h5>
            <h1 className="mt-4 text-3xl md:text-5xl font-semibold leading-tight">
              Powering modern schools with a unified, human-centered platform
            </h1>
            <p className="mt-3 text-white/90 text-sm md:text-base max-w-3xl">
              XoolHub helps multi-school groups and single institutions streamline operations,
              elevate communication, and make data-informed decisions—so your team can focus on
              what matters most: great teaching and student success.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link to="/register" className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-gray-900 shadow-sm hover:bg-gray-100 transition">
                Start your pilot
              </Link>
              <Link to="/pricing" className="inline-flex items-center justify-center rounded-lg bg-white/10 px-5 py-3 text-white ring-1 ring-white/30 hover:bg-white/15 transition">
                View plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section className="container mx-auto px-6 md:px-10 mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Collaborative by design</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Connect administrators, teachers, parents, and students with tools that make engagement effortless.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Built to scale</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Manage multiple campuses and regions on one platform with consistent standards and controls.
          </p>
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5 text-center">
          <div className="mx-auto mb-4 w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Flexible and adaptable</h3>
          <p className="mt-2 text-gray-600 text-sm">
            Tailor workflows and permissions to your school’s context without sacrificing simplicity.
          </p>
        </div>
      </section>

      {/* Trust & stats */}
      <section className="mt-12 px-6 md:px-10">
        <div className="mx-auto max-w-6xl rounded-2xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-black/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-green-50 p-2 text-green-600">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Privacy-first</p>
                <p className="text-sm text-gray-600">Secure data practices and role-based access out of the box.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-yellow-50 p-2 text-yellow-600">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Fast to onboard</p>
                <p className="text-sm text-gray-600">White‑glove setup and guided adoption for your staff.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 rounded-lg bg-indigo-50 p-2 text-indigo-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Proven outcomes</p>
                <p className="text-sm text-gray-600">Operational clarity, better communication, and happier communities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="text-center px-6 md:px-10 pb-16 pt-16">
        <div className="mx-auto max-w-3xl">
          <h5 className="inline-flex pb-3">
            <HeaderBtn>OUR MISSION</HeaderBtn>
          </h5>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            We empower schools with intuitive technology that simplifies operations, unites communities,
            and surfaces insights—so educators can do their best work and students can thrive.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Link to="/contact" className="rounded-lg border border-gray-300 bg-white px-5 py-3 text-gray-800 shadow-sm hover:bg-gray-50 transition">
              Talk to our team
            </Link>
            <Link to="/register" className="rounded-lg bg-indigo-600 px-5 py-3 text-white shadow-md hover:bg-indigo-700 transition">
              Join the pilot
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
