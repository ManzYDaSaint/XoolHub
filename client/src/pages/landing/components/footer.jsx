import React from "react";
import { Facebook, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setSubscribeData } from "../../../helpers/examination/examSlice.jsx";
import api from "../../../services/apiServices.jsx";
import { toast, Toaster } from "react-hot-toast";
import logo from "../../../logo.png";

const Footer = () => {
  const subscribeData = useSelector((state) => state.exam.subscribeData);
  const dispatch = useDispatch();

  const handleSubmit = async (data) => {
    try {
      const res = await api.addSubscribe(data);
      if (res.data.success === true) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
      dispatch(
        setSubscribeData({
          email: "",
        })
      );
    } catch (error) {
      toast.error("An error occurred. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      setSubscribeData({
        ...subscribeData,
        [name]: value,
      })
    );
    console.log(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(subscribeData);
  };

  return (
    <footer className="bg-gradient-to-tr from-blue-900 via-purple-900 to-blue-900 text-white px-6 py-20">
      <Toaster />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
        {/* Brand & Description */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <img src={logo} alt="logo" className="h-8 md:h-14 w-auto" />
            <span className="text-2xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              XoolHub
            </span>
          </div>
          <p className="text-white/90 max-w-xs">
            Empowering collaboration, learning, and innovation. Join the XoolHub
            community and unlock your potential.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-1 flex-wrap gap-8 justify-between">
          <div>
            <h4 className="font-semibold mb-3 text-lg">Product</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#Features" className="hover:text-cyan-400 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#Pricing" className="hover:text-cyan-400 transition">
                  Pricing
                </a>
              </li>
              <li>
                <Link
                  to="/integrations"
                  className="hover:text-cyan-400 transition"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#Demo" className="hover:text-cyan-400 transition">
                  Demo
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-lg">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/about" className="hover:text-cyan-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/referral"}
                  className="hover:text-cyan-400 transition"
                >
                  Referal Program
                </Link>
              </li>
              <li>
                <Link to={"/blog"} className="hover:text-cyan-400 transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-lg">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link to="/faq" className="hover:text-cyan-400 transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-cyan-400 transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-cyan-400 transition">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter & Social */}
        <div className="flex-1 flex flex-col gap-5">
          <div>
            <h4 className="font-semibold mb-3 text-lg">Stay up to date</h4>
            <form className="flex" onSubmit={onSubmit}>
              <input
                type="email"
                value={subscribeData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="rounded-l-md px-3 py-2 bg-[#1e293b] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                type="submit"
                className="bg-cyan-500 hover:bg-cyan-400 transition text-white px-4 py-2 rounded-r-md font-semibold"
              >
                Subscribe
              </button>
            </form>
          </div>
          <div className="flex gap-4 mt-2">
            <a
              href="https://web.facebook.com/profile.php?id=61567929397021"
              aria-label="Facebook"
              className="hover:text-cyan-400 transition"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://www.youtube.com/channel/UCGv3JywxpoPt7GOj3Xj4ApA"
              aria-label="Youtube"
              className="hover:text-cyan-400 transition"
            >
              <Youtube size={22} />
            </a>
            <a
              href="https://x.com/XoolHubOfficial"
              aria-label="Twitter"
              className="hover:text-cyan-400 transition"
            >
              <Twitter size={22} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-500 mt-10 pt-6 text-center text-white text-sm">
        &copy; {new Date().getFullYear()} XoolHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
