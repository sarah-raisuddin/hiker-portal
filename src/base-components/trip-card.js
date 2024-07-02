import React, { useState } from "react";
import SubmissionButton from "./button";

function TripCard({ label, placeholder, buttonText, onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <div className="trip-card-container">
      <div className="trip-card">
        <p className="trip-name">Juan De Fuca</p>
        <p className="trip-date">June 25, 2024 - June 30, 2024</p>
        <SubmissionButton />
      </div>
    </div>
  );
}

export default TripCard;
