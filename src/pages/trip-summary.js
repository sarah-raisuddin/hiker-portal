import React, {useState, useEffect} from "react";
import DisplayText from "../base-components/display-text";
import PageHeader from "../base-components/page-header";
import SubmissionButton from "../base-components/button";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "../base-components/back-to-dashboard";
import {formatDate} from "../util";

function TripSummary() {
  //user info
  const tripPlanId = localStorage.getItem("tripPlanIdToView");
  const userId = localStorage.getItem("userId");

  // trip plan info
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [trail_id, setTrailID] = useState("");
  const [trail_name, setTrailName] = useState("");
  const [entry_point, setEntryPoint] = useState("");
  const [exit_point, setExitPoint] = useState("");
  const [emergency_contact_name, setContactName] = useState("");
  const [emergency_contact_number, setContactNumber] = useState("");
  const [emergency_contact_email, setContactEmail] = useState("");
  const [rfid_tag_uid, setRfidTagID] = useState("");
  const [startPointName, setStartPointName] = useState("");
  const [endPointName, setEndPointName] = useState("");
  const [uniqueTrackingLink, setUniqueTrackingLink] = useState("");

  //navigation
  const navigateTo = useNavigate();

  const handleSubmit = () => {
    navigateTo("/trips");
  }

  const getTripPlan = async () => {
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
        console.log("Get trip plan sucessful", data);
        const tripPlanToView = data.trails.find(trail => trail.id === Number(tripPlanId));

        // TODO-KT: this is very messy, should clean up
        setStartDate(tripPlanToView.start_date);
        setEndDate(tripPlanToView.end_date);
        setTrailID(tripPlanToView.trail_id);
        setEntryPoint(tripPlanToView.entry_point);
        setExitPoint(tripPlanToView.exit_point);
        setRfidTagID(tripPlanToView.rfid_tag_uid);
        setTrailName(tripPlanToView.trail_name);
        setContactName(tripPlanToView.emergency_contact_name);
        setContactNumber(tripPlanToView.emergency_contact_number);
        setUniqueTrackingLink(tripPlanToView.progress_tracking_link);
      }

      else {
        console.log("Failed to get trip plan", response.status);
      }
    }
    catch (error) {
      console.log("Error during get trip plan", error);
    }
  };

  const getCheckpointNames = async () => {
    const apiEndPoint = `http://localhost:3000/sar_dashboard/trailInfo/${trail_id}`;
    try {
      const response = await fetch(apiEndPoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }, 
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get checkpoint names successful", data);

        const entryCheckpoint = data.checkpoints.find(checkpoint => checkpoint.id === Number(entry_point));
        const exitCheckpoint = data.checkpoints.find(checkpoint => checkpoint.id === Number(exit_point));

        setStartPointName(entryCheckpoint.name);
        setEndPointName(exitCheckpoint.name);
      }
      else {
        console.log("Error getting checkpoint names", response.status);
      }
    }
    catch (error) {
      console.log("Error getting checkpoint names", error);
    }
  }

  useEffect(() => {
    getTripPlan();
  }, []);

  useEffect(() => {
    getCheckpointNames();
  }, [trail_id, entry_point, exit_point]);

  return (
     <div className="trip-summary">
       <PageHeader text={"Trip Summary"} />
       <BackToDashboard/>
       <div className="plan-trip-container">
         <div className="plan-trip-body">
            <DisplayText 
              label="Progress Tracking Link:"
              value={uniqueTrackingLink}
            />
           <DisplayText
             label="Trail Name:"
             value={trail_name} />
           <div className="two-col-inputs">
             <DisplayText 
               label="Start Point:"
               value={startPointName} />
             <DisplayText 
               label="End Point:" 
               value={endPointName} />
           </div>
           <div className="two-col-inputs">
             <DisplayText 
               label="Start Date:" 
               value={formatDate(start_date).date} />
             <DisplayText 
               label="End Date:" 
               value={formatDate(end_date).date} />
           </div>
           <DisplayText
             label="Emergency Contact Name:"
             value={emergency_contact_name}
           />
           <div>
             <DisplayText
               label="Emergency Contact Phone Number:"
               value={emergency_contact_number} 
             />
             {/* <DisplayText
               label="Emergency Contact Email (optional):"
               value={tripPlan.emergency_contact_email} 
             /> */}
           </div>
           <DisplayText
             label="Tag Identifier:"
             value={rfid_tag_uid}
           />
           <SubmissionButton handleSubmit={handleSubmit}/>
         </div>
       </div>
     </div>
  );
}

export default TripSummary;