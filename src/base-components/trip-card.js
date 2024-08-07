import React, { useState } from "react";
import SubmissionButton from "./button";
import { useNavigate } from "react-router-dom";

function TripCard({ label, placeholder, buttonText }) {
  const [inputValue, setInputValue] = useState("");

  const navigateTo = useNavigate();

  const handleSubmit = () => {
    navigateTo("/plan-trip");
  };

  return (
    <div className="trip-card-container">
      <div className="trip-card">
        <p className="trip-name">Juan De Fuca</p>
        <p className="trip-date">June 25, 2024 - June 30, 2024</p>
        <SubmissionButton handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
}

export default TripCard;
