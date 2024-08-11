import React, { useState, useEffect } from "react";
import DisplayText from "../base-components/display-text";
import PageHeader from "../base-components/page-header";
import SubmissionButton from "../base-components/button";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "../base-components/back-to-dashboard";
import { archiveTripPlan } from "../api";
import { formatDate } from "../util";
import edit from "../images/button-edit.png";
import archive from "../images/button-archive.png";
import info from "../images/info.png";

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
  const [rfid_tag_uid, setRfidTagID] = useState("");
  const [startPointName, setStartPointName] = useState("");
  const [endPointName, setEndPointName] = useState("");
  const [uniqueTrackingLink, setUniqueTrackingLink] = useState("");
  //const [tripPlan, setTripPlan] = useState(null);
  const [isPlanArchived, setIsPlanArchived] = useState(false);

  //navigation
  const navigateTo = useNavigate();

  const getTripPlan = async () => {
    const apiEndpoint = `https://local-test-deployment-capstone-2024.azurewebsites.net//hiker_portal/trip_plans?user_id=${userId}`;
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
        const tripPlanToView = data.trails.find(
          (trail) => trail.id === Number(tripPlanId)
        );

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
        setIsPlanArchived(tripPlanToView.archived);
      } else {
        console.log("Failed to get trip plan", response.status);
      }
    } catch (error) {
      console.log("Error during get trip plan", error);
    }
  };

  const getCheckpointNames = async () => {
    const apiEndPoint = `https://local-test-deployment-capstone-2024.azurewebsites.net/sar_dashboard/trailInfo/${trail_id}`;
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

        const entryCheckpoint = data.checkpoints.find(
          (checkpoint) => checkpoint.id === Number(entry_point)
        );
        const exitCheckpoint = data.checkpoints.find(
          (checkpoint) => checkpoint.id === Number(exit_point)
        );

        setStartPointName(entryCheckpoint.name);
        setEndPointName(exitCheckpoint.name);
      } else {
        console.log("Error getting checkpoint names", response.status);
      }
    } catch (error) {
      console.log("Error getting checkpoint names", error);
    }
  };

  const archivePlan = async () => {
    try {
      const result = await archiveTripPlan({ id: tripPlanId });
      console.log("Trip plan archived:", result);
    } catch (error) {
      console.error("Error archiving trip plan:", error);
    }
  };

  useEffect(() => {
    getTripPlan();
  }, []);

  useEffect(() => {
    getCheckpointNames();
  }, [trail_id, entry_point, exit_point]);

  const handleEditTripPlan = () => {
    navigateTo("/trip-edit");
  };

  return (
    <div className="trip-summary">
      <PageHeader text={"Trip Summary"} />
      <BackToDashboard />
      <div className="trip-summary-container">
        <div
          className={`trip-summary-body ${isPlanArchived ? "archived" : ""}`}
        >
          <div className="controls">
            <div className="controls-archive">
              <button disabled={isPlanArchived} onClick={archivePlan}>
                {isPlanArchived ? "Archived Trip" : "Archive Trip"}
                <img src={archive} />
              </button>
            </div>
            <div className="controls-edit">
              <SubmissionButton
                text="Edit Trip Plan"
                handleSubmit={handleEditTripPlan}
                specialIcon={edit}
              ></SubmissionButton>
            </div>
          </div>
          <div className="link-reminder">
            <img src={info} />
            <p>
              Remember to provide your emergency contact with this link so they
              can monitor your progress. This link is unique to you and will
              update as you tap your tag at each checkpoint.
            </p>
          </div>
          <DisplayText
            label="Progress Tracking Link:"
            value={uniqueTrackingLink}
            onClick={() =>
              navigateTo(`/trip-progress?uid=${uniqueTrackingLink}`)
            }
          />
          <hr></hr>
          <DisplayText label="Trail Name:" value={trail_name} />
          <div className="two-col-inputs">
            <DisplayText label="Start Point:" value={startPointName} />
            <DisplayText label="End Point:" value={endPointName} />
          </div>
          <div className="two-col-inputs">
            <DisplayText
              label="Start Date:"
              value={formatDate(start_date).date}
            />
            <DisplayText label="End Date:" value={formatDate(end_date).date} />
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
          </div>
          <DisplayText label="Tag Identifier:" value={rfid_tag_uid} />
        </div>
      </div>
    </div>
  );
}

export default TripSummary;
