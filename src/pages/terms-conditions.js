import React, { useState } from "react";
import PageHeader from "../base-components/page-header";
import SubmissionButton from "../base-components/button";
import termsText from "../data/terms-data.js";
import { useNavigate } from "react-router-dom";
import Checkbox from "../base-components/checkbox.js";

function TermsAndConditions() {
  const navigateTo = useNavigate();
  const [isChecked, setIsChecked] = useState(false);

  const handleSubmit = () => {
    navigateTo("/trips");
  };

  const handleCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="terms-conditions">
      <PageHeader text={"Terms and Conditions for Use"} />
      <div className="terms-conditions-container">
        <div className="terms-conditions-body">
          <div className="terms-text">
            <h2>{termsText.termsHeading}</h2>
            <p>{termsText.termsDescription1}</p>
            <p>{termsText.termsDescription2}</p>
            <h2>{termsText.friendlyReminderHeading}</h2>
            <p>{termsText.friendlyReminder1}</p>
            <p>{termsText.friendlyReminder2}</p>
          </div>
          <Checkbox
            label="I have read and agree to the terms and conditions of use"
            isChecked={isChecked}
            handleCheck={handleCheck}
          />
          <SubmissionButton
            text=""
            handleSubmit={handleSubmit}
            inactive={!isChecked}
          />
        </div>
      </div>
    </div>
  );
}

export default TermsAndConditions;
