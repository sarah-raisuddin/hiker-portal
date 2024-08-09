import React, { useState } from "react";
import SubmissionButton from "./button";
import { useNavigate } from "react-router-dom";

function TripCard({ trailName, startDate, endDate }) {
  const [inputValue, setInputValue] = useState("");

  const navigateTo = useNavigate();

  const handleSubmit = () => {
    navigateTo("/trip-summary");
  };

  return (
    <div className="trip-card-container">
      <div className="trip-card">
        <p className="trip-name">{trailName}</p>
        <p className="trip-date">{startDate} - {endDate}</p>
        <SubmissionButton handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
}

export default TripCard;
