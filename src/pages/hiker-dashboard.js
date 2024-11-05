import React, { useEffect, useState } from "react";
import SubmissionButton from "../base-components/button";
import PageHeader from "../base-components/page-header";
import TripCard from "../base-components/trip-card";
import plus from "../images/button-plus.png";
import { useNavigate } from "react-router-dom";
import toggleArrow from "../images/toggle-arrow.png";
import { isUserLoggedIn } from "../util";

function HikerDashboard() {
  // user details
  const [firstName, setFirstName] = useState("");
  const [tripPlans, setTripPlans] = useState([]);
  const [showArchived, setShowArchived] = useState(false);

  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigateTo("/login");
    }
  }, [navigateTo]);

  const handleAddNewPlan = () => {
    navigateTo("/trip-plan");
  };

  const getTripPlans = async () => {
    const apiEndpoint = `http://localhost:3000/hiker_portal/trip_plans`;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get trip plans sucessful", data);
        setTripPlans(data.trails);
      } else {
        console.log("Failed to get trip plans", response.status);
      }
    } catch (error) {
      console.log("Error during get trip plans", error);
    }
  };

  const getFirstName = async () => {
    const apiEndpoint = `http://localhost:3000/hiker_portal/accountDetails`;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get account info sucessful", data);
        setFirstName(data.first_name);
      } else {
        console.log("Failed to get trip plans", response.status);
      }
    } catch (error) {
      console.log("Error during get trip plans", error);
    }
  };

  useEffect(() => {
    getFirstName();
    getTripPlans();
  }, []);

  return (
    <div className="hiker-dashboard">
      <PageHeader text={`${firstName}'s Dashboard`} />
      <div className="hiker-dashboard-divider">
        <div className="hiker-dashboard-divider-two-col">
          <h2>Trip Plans</h2>
          <SubmissionButton
            text="Add Trip Plan"
            handleSubmit={handleAddNewPlan}
            specialIcon={plus}
          ></SubmissionButton>
        </div>
        <hr></hr>
      </div>
      <div className="hiker-dashboard-container">
        {tripPlans
          .filter((trailPlan) => !trailPlan.archived)
          .map((trail, index) => (
            <TripCard key={index} trailPlan={trail}></TripCard>
          ))}
      </div>
      {/* archived plans */}
      <div className="hiker-dashboard-divider archived">
        <div className="hiker-dashboard-divider-two-col">
          <h2>View Archived Plans</h2>
          <div
            className="toggle"
            onClick={() => setShowArchived(!showArchived)}
          >
            <img
              src={toggleArrow}
              style={{ transform: showArchived ? "rotate(180deg)" : "none" }}
            />
          </div>
        </div>
        <hr></hr>
      </div>
      {showArchived && (
        <div className="hiker-dashboard-container">
          {tripPlans
            .filter((trailPlan) => trailPlan.archived)
            .map((trail, index) => (
              <TripCard key={index} trailPlan={trail}></TripCard>
            ))}
        </div>
      )}
    </div>
  );
}

export default HikerDashboard;
