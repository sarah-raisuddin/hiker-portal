import React, { useState, useEffect } from "react";
import DisplayText from "../base-components/displays/display-text";
import PageHeader from "../base-components/page-header";
import SubmissionButton from "../base-components/button";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "../base-components/back-to-dashboard";
import { archiveTripPlan } from "../api";
import { formatDate } from "../util";
import edit from "../images/buttons/button-edit.png";
import archive from "../images/buttons/button-archive.png";
import info from "../images/icons/info.png";
import DisplayLongText from "../base-components/displays/display-text-long";
import { isUserLoggedIn } from "../util";
import apiBase from "../requests/base";

function TripSummary() {
  //user info
  const tripPlanId = localStorage.getItem("tripPlanIdToView");

  const webDomain = `${apiBase}/`;
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigateTo("/login");
    }
  }, [navigateTo]);

  const [tripPlan, setTripPlan] = useState({
    trailId: "",
    trailName: "",
    startPoint: "",
    startPointName: "",
    endPoint: "",
    endPointName: "",
    startDate: "",
    endDate: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    additionalNotes: "",
    progressLink: "",
    archived: "",
  });

  // TODO-KT: get additional notes text
  const getTripPlan = async () => {
    const apiEndpoint = `${apiBase}/hiker_portal/trip_plan/${tripPlanId}`;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get trip plan sucessful", data);

        // TODO-KT: add additional notes field
        setTripPlan({
          trailId: data.trail.trail_id,
          trailName: data.trail.trail_name,
          startPoint: data.trail.entry_point,
          startPointName: data.startPointName,
          endPoint: data.trail.exit_point,
          endPointName: data.endPointName,
          startDate: data.trail.start_date,
          endDate: data.trail.end_date,
          emergencyContactName: data.trail.emergency_contact_name,
          emergencyContactNumber: data.trail.emergency_contact_number,
          additionalNotes: data.trail.additional_notes,
          progressLink: data.trail.progress_tracking_link,
          archived: data.trail.archived,
        });
      } else {
        console.log("Failed to get trip plan", response.status);
      }
    } catch (error) {
      console.log("Error during get trip plan", error);
    }
  };

  const archivePlan = async () => {
    try {
      const result = await archiveTripPlan({ id: tripPlanId });
      console.log("Trip plan archived:", result);
      navigateTo("/trips");
    } catch (error) {
      console.error("Error archiving trip plan:", error);
    }
  };

  useEffect(() => {
    getTripPlan();
  }, [tripPlan.trailId]);

  const handleEditTripPlan = () => {
    navigateTo("/trip-edit");
  };

  return (
    <div className="trip-summary">
      <PageHeader text={"Trip Summary"} />
      <BackToDashboard />
      <div className="trip-summary-container">
        <div
          className={`trip-summary-body ${tripPlan.archived ? "archived" : ""}`}
        >
          <div className="controls">
            <div className="controls-archive">
              <button
                disabled={tripPlan.archived}
                onClick={archivePlan}
                className={tripPlan.archived ? "inactive" : ""}
              >
                {tripPlan.archived ? "Archived Trip" : "Archive Trip"}
                <img src={archive} />
              </button>
            </div>
            <div className="controls-edit">
              <SubmissionButton
                text="Edit Trip Plan"
                handleSubmit={handleEditTripPlan}
                specialIcon={edit}
                inactive={tripPlan.archived}
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
            // value={`${webDomain}/trip-progress?uids=${tripPlan.progressLink}`}
            value={`hikerportal.trekcheck/trip-progress?uids=${tripPlan.progressLink}`}
            onClick={() =>
              navigateTo(`/trip-progress?uid=${tripPlan.progressLink}`)
            }
          />
          <hr></hr>
          <DisplayText label="Trail Name:" value={tripPlan.trailName} />
          <div className="two-col-inputs">
            <DisplayText label="Start Point:" value={tripPlan.startPointName} />
            <DisplayText label="End Point:" value={tripPlan.endPointName} />
          </div>
          <div className="two-col-inputs">
            <DisplayText
              label="Start Date:"
              value={formatDate(tripPlan.startDate).date}
            />
            <DisplayText
              label="End Date:"
              value={formatDate(tripPlan.endDate).date}
            />
          </div>
          <DisplayText
            label="Emergency Contact Name:"
            value={tripPlan.emergencyContactName}
          />
          <div>
            <DisplayText
              label="Emergency Contact Phone Number:"
              value={tripPlan.emergencyContactNumber}
            />
          </div>
          <DisplayLongText
            label="Additional Notes:"
            value={tripPlan.additionalNotes}
          />
        </div>
      </div>
    </div>
  );
}

export default TripSummary;
