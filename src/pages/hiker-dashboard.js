import React, {useEffect, useState }from "react";
import SubmissionButton from "../base-components/button";
import PageHeader from "../base-components/page-header";
import TripCard from "../base-components/trip-card";
import plus from "../images/button-plus.png";
import { useNavigate } from "react-router-dom";
import formatDate from "../util";

function HikerDashboard() {
  // user detauls
  const firstName = localStorage.getItem("firstName");
  const userId = localStorage.getItem("userId");
  const [tripPlans, setTripPlans] = useState([]);

  // navigation
  const navigateTo = useNavigate();

  const handleAddNewPlan = () => {
    navigateTo("/trip-plan")
  };

  const getTripPlans = async () => {
    const apiEndpoint = `http://localhost:3000/hiker_portal/trip_plans?user_id=${userId}`;
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get trip plans sucessful", data);
        setTripPlans(data.trails);
      }

      else {
        console.log("Failed to get trip plans", response.status);
      }
    }
    catch (error) {
      console.log("Error during get trip plans", error);
    }
  };

  useEffect(() => {
    getTripPlans();
  }, []);
  
  return (
    <div className="hiker-dashboard">
      <PageHeader text={`${firstName}'s Dashboard`} />
      <div className="hiker-dashboard-divider">
        <div className="hiker-dashboard-divider-two-col">
          <h2>Trip Plans</h2>
          <SubmissionButton text="Add Trip Plan" handleSubmit={handleAddNewPlan} specialIcon={plus}></SubmissionButton>
        </div>
        <hr></hr>
      </div>
      <div className="hiker-dashboard-container">
        {tripPlans.map((trail, index) => (
          <TripCard 
          key={index} 
          trailName={trail.trail_name} 
          startDate={formatDate(trail.start_date).date}
          endDate={formatDate(trail.end_date).date}>
          </TripCard>
        ))}
      </div>
    </div>
  );
}

export default HikerDashboard;
