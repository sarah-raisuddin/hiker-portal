import React, { useState } from "react";
import SubmissionButton from "./button";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../util";

function TripCard({ trailPlan }) {
  const navigateTo = useNavigate();
  const trailName = trailPlan.trail_name;
  const startDate = formatDate(trailPlan.start_date).date;
  const endDate = formatDate(trailPlan.end_date).date;

  const handleSubmit = () => {
    localStorage.setItem("tripPlanIdToView", trailPlan.id);
    console.log("trip plan from trip-card: ", trailPlan);
    navigateTo("/trip-summary");
  };

  return (
    <div className="trip-card-container">
      <div className={`trip-card ${trailPlan.archived ? "archived" : ""}`}>
        <p className="trip-name">{trailName}</p>
        <p className="trip-date">
          {startDate} - {endDate}
        </p>

        <SubmissionButton
          handleSubmit={handleSubmit}
          inactive={trailPlan.archived}
          text="View Plan"
        />
      </div>
    </div>
  );
}

export default TripCard;
