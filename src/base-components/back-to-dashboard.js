import React from "react";
import backArrow from "../images/back-arrow-green.png"
import { useNavigate } from "react-router-dom";

function BackToDashboard() {

  const navigateTo = useNavigate();

  const handleSubmit = () => {
    navigateTo("/trips")
  }

  return (
    <div className="back-to-dashboard-container">
      <button className="back-to-dashboard" onClick={handleSubmit}>
        <img className="back-arrow" src={backArrow} />
        <p>Back To Dashboard</p>
      </button>
    </div>
  );
}

export default BackToDashboard;