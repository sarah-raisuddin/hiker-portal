// src/About.js
import React from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";
import PageHeader from "../base-components/page-header";
import InputDateTime from "../base-components/input-datetime";

function PlanTrip() {
  return (
    <div className="plan-trip">
      <PageHeader text={"Create a Trip Plan"} />
      <div className="plan-trip-container">
        <div className="plan-trip-body">
          <div className="two-col-inputs">
            <InputText label="Start Date:" placeholder="Type Start Date" />
            <InputText label="End Date:" placeholder="Type End Date" />
          </div>
          <div className="two-col-inputs">
            <InputDateTime label="Entry Point:" placeholder="Type Start Date" />
            <InputDateTime label="End Date:" placeholder="Type End Date" />
          </div>

          <InputText
            label="Emergency Contact Name:"
            placeholder="Type Emergency Contact Name"
          />
          <div>
            <InputText
              label="Emergency Contact Phone Number:"
              placeholder="Type Phone Number:"
            />
            <InputText
              label="Emergency Contact Email (optional):"
              placeholder="Type Email"
            />
          </div>
          <InputText
            label="Tag Identifier:"
            placeholder="Type Tag Identifier"
          />

          <SubmissionButton />
        </div>
      </div>
    </div>
  );
}

export default PlanTrip;
