import React, { useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import FormButton from "../../components/input/formButton";
import api from "../../services/apiServices";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PlanOptions = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const [expiryTime, setExpiryTime] = useState(0);

  const fetchData = async () => {
    const res = await api.getSubscription();
    const data = res.data.plan;
    setPlans(data);
  };

  const fetchStatus = async () => {
    try {
      const res = await api.checkSubscriptionStatus();
      const strata = res.data.status || "";
      setSubscriptionStatus(strata.status);
      setExpiryTime(strata.expiry);

      if (strata.status === "pending" && strata.expiry) {
        const timeRemaining = Math.max(
          0,
          Math.floor((new Date(strata.expiry).getTime() - Date.now()) / 1000)
        );
        setTimeLeft(timeRemaining);
      }
    } catch (error) {
      console.error("Failed to fetch subscription status:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Countdown timer for pending status
  useEffect(() => {
    if (subscriptionStatus === "pending" && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [subscriptionStatus, timeLeft]);

  // Update subscription status to Suspended
  useEffect(() => {
    // Calculate remaining time in milliseconds
    const calculateRemainingTime = () => {
      const now = new Date();
      const expiryDate = new Date(expiryTime);
      return Math.max(expiryDate - now, 0);
    };

    const updateTime = () => {
      const timeLeft = calculateRemainingTime();

      // If the countdown ends, automatically suspend the subscription
      if (timeLeft <= 0 && subscriptionStatus === "pending") {
        updateStatusToSuspended();
      }
    };

    const interval = setInterval(updateTime, 1000); // Update every second
    updateTime(); // Run initially to set the correct time

    return () => clearInterval(interval); // Cleanup on unmount
  }, [expiryTime, subscriptionStatus]);

  const updateStatusToSuspended = async () => {
    try {
      const res = await api.updateSubscriptionStatus({ status: "suspended" });
      if (res.data.success === true) {
        toast.error("Your Payment was suspended");
      }
    } catch (error) {
      console.error("Failed to update subscription status:", error);
    }
  };

  // Format time in seconds to days, hours, minutes, and seconds
  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (60 * 60 * 24));
    const hours = Math.floor((seconds / (60 * 60)) % 24);
    const minutes = Math.floor((seconds / 60) % 60);
    const secs = Math.floor(seconds % 60);
    return { days, hours, minutes, seconds: secs };
  };

  const formattedTime = formatTime(timeLeft);

  const handleID = (plan) => {
    navigate(`/invoicing/${plan}`);
  };

  const formatPrice = (price) => {
    if (price >= 1000000) {
      return (price / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // Format as '1M', '2.5M', etc.
    } else if (price >= 1000) {
      return (price / 1000).toFixed(1).replace(/\.0$/, "") + "K"; // Format as '50K', '350K', etc.
    }
    return price.toString(); // Return the original price for smaller values
  };

  return (
    <>
      <Toaster />
      {subscriptionStatus === "pending" ? (
        <div className="countdown-outer">
          <h5 className="text-center">PAYMENT CONFIRMATION</h5>
          <p className="text-center">
            Please contact the System Administrator to activate your account < br/>
            to be able to access the Beta Version features and help the <br /> 
            System be molded to your preferences by clicking {" "}
            <Link to="/contact" style={{ color: "red" }}>
              Here
            </Link>
          </p>
          <div className="countdown-container">
            <div className="countdown">
              {timeLeft > 0 ? (
                <>
                  <div className="countdown-item">
                    <span className="countdown-number">
                      {formattedTime.days}
                    </span>
                    <span className="countdown-label">Days</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-number">
                      {formattedTime.hours}
                    </span>
                    <span className="countdown-label">Hours</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-number">
                      {formattedTime.minutes}
                    </span>
                    <span className="countdown-label">Minutes</span>
                  </div>
                  <div className="countdown-item">
                    <span className="countdown-number">
                      {formattedTime.seconds}
                    </span>
                    <span className="countdown-label">Seconds</span>
                  </div>
                </>
              ) : (
                <h1 className="expired-message">Expired!</h1>
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      <section className="subscriptions">
        <h2>Pricing</h2>
        <h5>Our pricing options</h5>
        <p>
          Check out our pricing options and choose the best
          <br /> plan depending on your school's needs.
        </p>

        <div className="plan-cards">
          {plans.map((plan, index) => (
            <div key={index} className="plan-card">
              <h3>{plan.name}</h3>
              <p className="price">{formatPrice(plan.price)}</p>
              <p className="periodic">per term</p>
              <p className="feat">
                {Array.isArray(plan.features)
                  ? plan.features.join(", ")
                  : plan.features}
              </p>
              {subscriptionStatus === "pending" ? (
                ""
              ) : (
                <FormButton
                  label={"Get Started"}
                  id={"tyepButton"}
                  onClick={() => handleID(plan.name)}
                />
              )}
            </div>
          ))}
        </div>
        <div className="success-wrapper">
          <div className="success-card">
            <div className="trophy">
              <Trophy size={40} className="trophy" />
            </div>
            <div className="onboard">
              <h5>customization service that set you up for success</h5>
              <p>
                Let our team customize the system to your needs and meet the
                requirements of your school. <br /> Therefore you have to talk
                to the Administrator for help by clicking here{" "}
                <Link to={"/contact"}>Contact US</Link>{" "}
              </p>
              <h6>this service's price is feature based.</h6>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlanOptions;
