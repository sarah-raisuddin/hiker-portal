import React from "react";
import DisplayText from "../base-components/display-text";
import PageHeader from "../base-components/page-header";
import DisplayDateTime from "../base-components/display-datetime";
import SubmissionButton from "../base-components/button";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "../base-components/back-to-dashboard";
import { archiveTripPlan } from "../api";

function TripSummary() {
  // user info
  const tripPlan = JSON.parse(localStorage.getItem("tripPlanToView"));
  console.log("this is the trip plan:", tripPlan);

  // navigation
  const navigateTo = useNavigate();

  const handleSubmit = () => {
    navigateTo("/trips");
  };

  const isPlanArchived = tripPlan.archived;

  const archivePlan = async () => {
    try {
      const result = await archiveTripPlan({ id: tripPlan.id });
      console.log("Trip plan archived:", result);
    } catch (error) {
      console.error("Error archiving trip plan:", error);
    }
  };

  return (
    <div className="trip-summary">
      <PageHeader text={"Trip Summary"} />
      <BackToDashboard />
      <div className="plan-trip-container">
        <div className={`plan-trip-body ${isPlanArchived ? "archived" : ""}`}>
          <div className="plan-trip-archive">
            <button disabled={isPlanArchived} onClick={archivePlan}>
              {isPlanArchived ? "Archived Trip" : "Archive Trip"}
            </button>
          </div>
          <DisplayText label="Trail Name:" value={tripPlan.trail_name} />
          <div className="two-col-inputs">
            <DisplayText label="Start Point:" value={tripPlan.entry_point} />
            <DisplayText label="End Point:" value={tripPlan.exit_point} />
          </div>
          <div className="two-col-inputs">
            <DisplayDateTime label="Start Date:" value={tripPlan.start_date} />
            <DisplayDateTime label="End Date:" value={tripPlan.end_date} />
          </div>
          <DisplayText
            label="Emergency Contact Name:"
            value={tripPlan.emergency_contact_name}
          />
          <div>
            <DisplayText
              label="Emergency Contact Phone Number:"
              value={tripPlan.emergency_contact_number}
            />
            {/* <DisplayText
              label="Emergency Contact Email (optional):"
              value={tripPlan.emergency_contact_email} 
            /> */}
          </div>
          <DisplayText label="Tag Identifier:" value={tripPlan.rfid_tag_uid} />
          {/* <SubmissionButton handleSubmit={handleSubmit} /> */}
        </div>
      </div>
    </div>
  );
}

export default TripSummary;
