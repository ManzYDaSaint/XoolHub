import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../landing/components/navbar";
import Footer from "../landing/components/footer";
import Input from "../../components/input/input";
import { Mail, School, Phone } from "lucide-react";
import FormButton from "../../components/input/formButton";
import api from "../../services/apiServices";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import HeaderBtn from "../landing/components/ui/headerBtn";

const Invoicing = () => {
  const navigate = useNavigate();
  const { plan } = useParams();
  const [isYearly, setIsYearly] = useState(false);
  const [school, setSchool] = useState([]);
  const [Price, setPrice] = useState(0);
  const [Subscription, setSubscription] = useState("");

  const fetchSubs = async (plan) => {
    try {
      const res = await api.gotsubs(plan);
      const price = parseFloat(res.data?.price) || 0;
      const subscription = res.data?.name;
      setPrice(price);
      setSubscription(subscription);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
    }
  };

  useEffect(() => {
    fetchSubs(plan);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [plan]);

  const handleToggle = () => {
    setIsYearly((prev) => !prev);
  };

  const displayedPrice = isYearly ? (Price * 3).toFixed(2) : Price.toFixed(2);

  const Discount = isYearly
    ? (0.1 * displayedPrice).toFixed(2)
    : (0).toFixed(2);
  const sub = (displayedPrice - Discount).toFixed(2);

  const fetchData = async () => {
    try {
      const res = await api.getSchool();
      const data = res.data.details;
      setSchool(data);
    } catch (error) {
      console.error("Error fetching school info:", error);
    }
  };

  useEffect(() => {
    fetchData(); // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        subscriptionName: Subscription,
        grandTotal: sub,
        billingCycle: isYearly ? "Yearly" : "Termly",
      };

      const response = await api.addBilling(payload);
      if (response.data.success === true) {
        toast.success(response.data.message);
        navigate("/pricing");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting invoice:", error);
    }
  };

  return (
    <>
      <Navbar />
      <Toaster />
      <div className="p-6 text-center">
        <h2 className="mt-24 text-center inline-flex">
          <HeaderBtn>CHECK-OUT</HeaderBtn>
        </h2>
        <p className="text-gray-700 text-md md:text-lg mt-6">
          This page check-outs the subscription plan you have selected and you
          can <br />
          also choose whether termly or per academic year.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-8 my-2 w-full">
        <div className="space-y-3 p-4 h-auto">
          <h5 className="text-gray-600 font-medium border-b-2 border-gray-300 mb-2 pb-3">
            Account Information
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              School Name:
            </label>
            <Input
              type="text"
              placeholder="mail@example.com"
              value={school.name}
              autoComplete={"off"}
              icon={School}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email:
            </label>
            <Input
              type="text"
              placeholder="mail@example.com"
              value={school.email}
              autoComplete={"off"}
              icon={Mail}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Contact:
            </label>
            <Input
              type="text"
              placeholder="mail@example.com"
              value={school.contact}
              autoComplete={"off"}
              icon={Phone}
            />
          </div>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <h5 className="text-gray-600 font-medium border-b-2 border-gray-300 mb-2 pb-3">
                Subscription
              </h5>
              <div className="">
                <h3 className="text-gray-700 font-semibold text-lg">
                  {Subscription} Plan
                </h3>
                <p className="text-gray-700 font-semibold text-2xl">
                  MK{Price.toFixed(2)}{" "}
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center py-4">
              <span className="text-gray-600">Termly</span>
              <div
                className={`mx-3 w-14 h-6 flex items-center rounded-full cursor-pointer transition-colors ${
                  isYearly ? "bg-blue-600" : "bg-gray-300"
                }`}
                onClick={handleToggle}
              >
                <div
                  className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform ${
                    isYearly ? "translate-x-9" : "translate-x-0"
                  }`}
                ></div>
              </div>
              <span className="text-gray-600">
                Yearly <span className="disco">{"(10%)"}</span>
              </span>
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-4 space-y-3">
              <h5 className="text-gray-700 font-semibold border-b-2 border-gray-300 pb-2">
                Order Summary
              </h5>
              <h3 className="bg-blue-600 px-4 py-2 inline-flex text-white rounded-lg">
                {isYearly ? "Yearly" : "Termly"}
              </h3>
              <div className="text-md text-gray-600">
                <div className="grid grid-cols-2 gap-4">
                  <p>Price:</p>
                  <p>
                    <input type="text" value={`MK${displayedPrice}`} readOnly />
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <p>Discount:</p>
                  <p>
                    <input type="text" value={`MK${Discount}`} readOnly />
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <p>Sub Total:</p>
                  <p>
                    <input type="text" value={`MK${sub}`} readOnly />
                  </p>
                </div>
              </div>
            </div>
            <div className="border-2 border-gray-300 rounded-lg p-4 mt-3 mb-2">
              <p className="">Grand Total:</p>
              <p>
                <input
                  type="text"
                  name="total"
                  value={`MK${sub}`}
                  className="sep-total"
                  readOnly
                />
              </p>
            </div>
            <FormButton label={"Pay Now"} type={"submit"} icon={"cart"} />
          </form>
        </div>
        {/* <div className="payment-method-container">
              <h3 className="text-xl font-medium text-gray-700 mb-2 mt-4">
                Choose Payment Method
              </h3>
              <div className="space-y-2 mb-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Credit Card"
                    checked={paymentMethod === "Credit Card"}
                    onChange={handlePaymentMethodChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">Credit Card</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cheque"
                    checked={paymentMethod === "Cheque"}
                    onChange={handlePaymentMethodChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">Cheque</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Cash"
                    checked={paymentMethod === "Cash"}
                    onChange={handlePaymentMethodChange}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-700">Cash</span>
                </label>
              </div>
            </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Invoicing;
