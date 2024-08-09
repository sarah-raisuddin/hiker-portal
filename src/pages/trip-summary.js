import React from "react";
import DisplayText from "../base-components/display-text";
import PageHeader from "../base-components/page-header";
import DisplayDateTime from "../base-components/display-datetime";
import SubmissionButton from "../base-components/button";
import tripData from "../data/trip-dummyData";
import { useNavigate } from "react-router-dom";

function TripSummary() {
  
  // navigation
  const navigateTo = useNavigate();

  const handleSubmit = () => {
    navigateTo("/trips");
  }
  
  return (
    <div className="trip-summary">
      <PageHeader text={"Trip Summary"} />
      <div className="plan-trip-container">
        <div className="plan-trip-body">
          <div className="two-col-inputs">
            <DisplayText label="Start Point:" value={tripData.startPoint} />
            <DisplayText label="End Point:" value={tripData.endPoint} />
          </div>
          <div className="two-col-inputs">
            <DisplayDateTime label="Start Date:" value={tripData.startDate} />
            <DisplayDateTime label="End Date:" value={tripData.endDate} />
          </div>

          <DisplayText
            label="Emergency Contact Name:"
            value={tripData.emergencyContactName}
          />
          <div>
            <DisplayText
              label="Emergency Contact Phone Number:"
              value={tripData.emergencyContactPhone} 
            />
            <DisplayText
              label="Emergency Contact Email (optional):"
              value={tripData.emergencyContactEmail} 
            />
          </div>
          <DisplayText
            label="Tag Identifier:"
            value={tripData.tagIdentifier}
          />
          <SubmissionButton handleSubmit={handleSubmit}/>
        </div>
      </div>
    </div>
  );
}

export default TripSummary;