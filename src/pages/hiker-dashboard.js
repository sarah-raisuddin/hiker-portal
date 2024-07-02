// src/About.js
import React from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";
import PageHeader from "../base-components/page-header";
import InputDateTime from "../base-components/input-datetime";
import TripCard from "../base-components/trip-card";

function HikerDashboard() {
  return (
    <div className="hiker-dashboard">
      <PageHeader text={"John's Trip Plans"} />
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
