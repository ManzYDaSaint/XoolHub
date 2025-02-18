import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../landing/components/navbar";
import Footer from "../landing/components/footer";
import Auth0 from "../../hooks/auth";
import Input from "../../components/input/input";
import { Mail, School, Phone } from "lucide-react";
import FormButton from "../../components/input/formButton";
import api from "../../services/apiServices";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

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
      if(response.data.success === true) {
        toast.success(response.data.message);
        navigate('/pricing');
      }
      else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.error("Error submitting invoice:", error);
    }
  };


  return (
    <Auth0>
      <>
        <Navbar />
        <div className="invoice-container plans">
          <Toaster />
          <div className="text-center mt-5">
            <h2>CHECK-OUT</h2>
            <p>
              This page check-outs the subscription plan you have selected and
              you can <br />
              also choose whether termly or per academic year.
            </p>
          </div>
          <div className="invoice-content">
            <div className="customer-content pb-5">
              <h5>Account Information</h5>
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
            <form onSubmit={handleSubmit}>
            <div className="checkout-container pb-5">
              <div className="checkout-content">
                <h5>Subscription</h5>
                <div className="checkout-card">
                  <h3>{Subscription} Plan</h3>
                  <p className="fee">MK{Price}</p>
                </div>
              </div>

              <div className="flex justify-center items-center mb-1">
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
                  Yearly <span className="disco">{"10%"}</span>
                </span>
              </div>

              <div className="invoice-card-container">
                <h5>Order Summary</h5>
                <h3>{isYearly ? "Yearly" : "Termly"}</h3>
                <div className="invoice-card">
                  <div className="separator">
                    <p>Price:</p>
                    <p>
                      <input type="text" value={displayedPrice} readOnly />
                    </p>
                  </div>
                  <div className="separator">
                    <p>Discount:</p>
                    <p>
                      <input type="text" value={Discount} readOnly />
                    </p>
                  </div>
                  <div className="separator">
                    <p>Sub Total:</p>
                    <p>
                      <input type="text" value={sub} readOnly />
                    </p>
                  </div>
                </div>
              </div>
              <div className="separator mt-3 p-3">
                <p className="sep-total">Grand Total:</p>
                <p>
                  <input
                    type="text"
                    name="total"
                    value={sub}
                    className="sep-total"
                    readOnly
                  />
                </p>
              </div>
              <FormButton
                label={"Pay Now"}
                id={"tyepButton"}
                type={"submit"}
                icon={"cart"}
              />
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
            </form>
          </div>
          <Footer />
        </div>
      </>
    </Auth0>
  );
};

export default Invoicing;
