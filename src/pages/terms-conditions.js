import React from "react";
import PageHeader from "../base-components/page-header";
import SubmissionButton from "../base-components/button";
import termsText from "../data/terms-data.js";
import { useNavigate } from "react-router-dom";

function TermsAndConditions() {
    const navigateTo = useNavigate();

    const handleSubmit = () => {
        navigateTo("/trips")
    };

    return (
        <div className="terms-conditions">
            <PageHeader text={"Terms and Conditions for Use"} />
            <div className="terms-conditions-container">
                <div className="terms-conditions-body">
                    <div className="terms-text">
                        <h2>{termsText.termsHeading}</h2>
                        <p>{termsText.termsDescription}</p>
                        <h2>{termsText.friendlyReminderHeading}</h2>
                        <p>{termsText.friendlyReminder1}</p>
                        <p>{termsText.friendlyReminder2}</p>
                    </div>
                    <SubmissionButton handleSubmit={handleSubmit}/>
                </div>
            </div>

        </div>
        
    );
}

export default TermsAndConditions;