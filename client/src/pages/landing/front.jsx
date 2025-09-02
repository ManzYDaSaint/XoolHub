// src/App.js
import { Link } from "react-router-dom";
import {
  AlarmClockPlus,
  ArrowRight,
  BadgeDollarSign,
  BriefcaseBusiness,
  CheckCircle,
  Video,
} from "lucide-react";
import landBG from "./assets/landBG.png";
import CustomBtn from "./components/ui/button";
import Schools from "./components/clients";
import Navbar from "./components/navbar";
import HeaderBtn from "./components/ui/headerBtn";
import FeatureSection from "./components/feature";
import Testimonials from "./components/testimony";
import SubscriptionOptions from "./components/subscription";
import Footer from "./components/footer";
import PilotBanner from "./components/banner";

function Landing() {
  return (
    <div className="min-h-screen w-full">
      <PilotBanner />
      {/* Navigation Bar */}
      <Navbar />
      {/* Navigation Bar */}

      {/* Header Page */}
      <div className="p-6">
        <header className="mt-16 pt-16 text-center space-y-8 bg-gradient-to-r from-blue-100 to-green-100 relative rounded-lg">
          <p className="flex flex-col md:flex-row md:inline-flex items-center space-x-2 text-sm md:bg-white/40 md:backdrop-blur-md md:border-2 md:border-white/90 rounded-full px-2 py-1 text-center">
            <span className="flex md:w-auto rounded-full bg-gradient-to-r from-blue-700 to-purple-700 px-6 py-1 md:py-0.5 text-xs mr-2 text-white">
              Pilot
              <ArrowRight className="h-4 w-4 md:hidden" />
            </span>
            We've released this version for testing and feedback!{" "}
            <ArrowRight className="h-4 w-4 hidden md:inline" />
          </p>
          <h1 className="text-2xl font-bold text-blue-900 md:text-5xl">
            Your Ultimate{" "}
            <span className="bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
              Multi-School
            </span>{" "}
            <br />
            Management Solution.
          </h1>
          <p className="text-sm md:text-md">
            Focus on your school's success by teaching and providing education
            and <br />
            let us handle the system and provide the right tools you need
            without the hassle.
          </p>
          <div className="flex flex-row md:flex-row items-center justify-center gap-4 pb-10">
            <Link to={"/register"}>
              <CustomBtn>Start Your Free Trial</CustomBtn>
            </Link>
            <HeaderBtn>
              <Video className="h-4 w-4 md:h-6 md:w-6" />
              <span className="md:inline">Watch Demo</span>
            </HeaderBtn>
          </div>
          {/* Image with fading white below */}
          <div className="relative w-full flex justify-center">
            <img
              src={landBG}
              alt="landbg"
              className="rounded-xl flex-shrink-0"
            />
            <div
              className="absolute left-0 right-0 bottom-0 h-80 rounded-b-lg pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #fff 100%)",
              }}
            />
          </div>
        </header>
      </div>
      {/* Header Page */}

      {/* Trustees */}
      <div id="Trustees">
        <Schools />
      </div>
      {/* Trustees */}

      {/* Why US */}
      <div className="text-center py-20 bg-gradient-to-r from-blue-100 to-green-100 px-8">
        <p className="inline-flex">
          <HeaderBtn>Why Choose US</HeaderBtn>
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-4 mt-12">
          <div className="flex flex-col items-center text-center px-8 py-4 space-y-2">
            <BadgeDollarSign className="text-green-600" size={50} />
            <h5 className="bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent text-md md:text-lg font-semibold">
              Cost Efficiency
            </h5>
            <p className="text-gray-700 font-medium">
              Reduces operational costs by eliminating the need for in-house IT
              staff, hardware upgrades and paper-based processes.
            </p>
          </div>
          <div className="flex flex-col items-center text-center px-8 py-4 space-y-2">
            <AlarmClockPlus className="text-green-600" size={50} />
            <h5 className="bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent text-md md:text-lg font-semibold">
              Time Savings
            </h5>
            <p className="text-gray-700 font-medium">
              Most of our Automation features help free up staff time for core
              educational tasks
            </p>
          </div>
          <div className="flex flex-col items-center text-center px-8 py-4 space-y-2">
            <BriefcaseBusiness className="text-green-600" size={50} />
            <h5 className="bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent text-md md:text-lg font-semibold">
              Ease Administration
            </h5>
            <p className="text-gray-700 font-medium">
              Reduces administrative workload by automating tasks and
              streamlining processes
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div id="features">
        <FeatureSection />
      </div>
      {/* Features */}

      {/* Testimonials */}
      <div id="Testimonials">
        <Testimonials />
      </div>
      {/* Testimonials */}

      {/* Pricing */}
      <div id="pricing">
        <SubscriptionOptions />
      </div>
      {/* Pricing */}

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-100 to-green-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
              Transform the Way You <br /> Manage Schools
            </h2>
            <p className="text-md md:text-lg text-blue-900  font-semibold mb-8">
              Experience seamless administration, real-time insights, and <br />{" "}
              effortless collaboration—all in one platform.
            </p>

            <div className="flex flex-row sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to={"/register"}>
                <CustomBtn>Try For Free</CustomBtn>
              </Link>
              <HeaderBtn>See XoolHub In Action</HeaderBtn>
            </div>

            <div className="flex flex-col text-sm md:text-md sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-blue-900">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                One-Term free trial
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 mr-2" />
                Setup in under 24 hours
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* CTA */}

      {/* Footer */}
      <Footer />
      {/* Footer */}
    </div>
  );
}

export default Landing;
