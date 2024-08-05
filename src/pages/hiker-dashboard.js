// src/About.js
import React from "react";
import SubmissionButton from "../base-components/button";
import PageHeader from "../base-components/page-header";
import TripCard from "../base-components/trip-card";
import plus from "../images/button-plus.png";
import { useNavigate } from "react-router-dom";

function HikerDashboard() {
  
  const navigateTo = useNavigate();

  const handleAddNewPlan = () => {
    navigateTo("/trip-plan")
  };
  
  return (
    <div className="hiker-dashboard">
      <PageHeader text={"John's Dashboard"} />
      <div className="hiker-dashboard-divider">
        <div className="hiker-dashboard-divider-two-col">
          <h2>Trip Plans</h2>
          <SubmissionButton text="Add Trip Plan" handleSubmit={handleAddNewPlan} specialIcon={plus}></SubmissionButton>
        </div>
        <hr></hr>
      </div>
      <div className="hiker-dashboard-container">
        <TripCard />
        <TripCard />
        <TripCard />
        <TripCard />
      </div>
    </div>
  );
}

export default HikerDashboard;
