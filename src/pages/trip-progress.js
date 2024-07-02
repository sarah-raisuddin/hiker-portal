// src/About.js
import React from "react";
import SubmissionButton from "../base-components/button";
import PageHeader from "../base-components/page-header";

function TripProgress() {
  return (
    <div className="trip-progress">
      <PageHeader text={"John's Progress"} />
      <div className="trip-progress-summary">
        <span>
          <p>
            <b>Trail Name: </b>
            Juan De Fuca
          </p>
        </span>
        <span>
          <p>
            <b>Start Date: </b>
            June 25 2024
          </p>
        </span>
        <span>
          <p>
            <b>End Date: </b>
            June 30 2024
          </p>
        </span>
        <span>
          <p>
            <b>Additional Notes: </b>
            "Starting the trail at Botanical Beach and ending the trail at China
            Beach"
          </p>
        </span>
      </div>
      <div className="trip-progress-container">
        <div className="trip-progress-body"></div>
        <div className="trip-progress-footer">
          <div>
            <label>Sign up for email alerts</label>
            <input type="text" />
          </div>
          <SubmissionButton />
        </div>
      </div>
    </div>
  );
}

export default TripProgress;
