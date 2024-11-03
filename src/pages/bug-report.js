import React, { useState, useEffect } from "react";
import PageHeader from "../base-components/page-header";
import bugReportText from "../data/bug-report-data";
import SubmissionButton from "../base-components/button";
import LongInputText from "../base-components/input-text-long";
import issueIcon from "../images/issue-icon.png";
import { useLocation } from "react-router-dom";
import PopUpMessage from "../base-components/pop-up-message";

function BugReport() {
  const [isIssueSubmitted, setIsIssueSubmitted] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);

  const location = useLocation();

  // button state
  const isButtonDisabled = issueDescription.trim() === "";

  // reset update status upon re-navigating back to this page
  useEffect(() => {
    setErrorStatus(false);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiEndpoint = `http://localhost:3000/hiker_portal/bug`;

    const issueDetails = {
      submittedDate: new Date().toISOString(),
      bugDescription: issueDescription,
    };

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(issueDetails),
      });

      if (response.ok) {
        setIsIssueSubmitted(true);
        setErrorStatus(false);
      } else {
        console.log("Bug report failed", response.statusText);
        setErrorStatus(true);
      }
    } catch (error) {
      console.error("Error submitting bug report:", error);
      setErrorStatus(true);
    }
  };

  return (
    <div className="bug-report">
      <PageHeader text={"Report An Issue"} />
      {errorStatus && (
        <PopUpMessage
          title="Submission Failed"
          message="Please try again."
          link="/bug-report"
        />
      )}
      <div
        className={
          errorStatus ? "blur bug-report-container" : "bug-report-container"
        }
      >
        <div className="bug-report-container">
          {!isIssueSubmitted && (
            <div className="bug-report-body">
              <div className="bug-report-header">
                <img className="issue-icon" src={issueIcon}></img>
                <p>{bugReportText.pageDescription}</p>
              </div>
              <div className="bug-report-text">
                <h2>{bugReportText.stepsToReportTitle}</h2>
                <p>{bugReportText.stepsToReport1}</p>
                <p>{bugReportText.stepsToReport2}</p>
              </div>
              <LongInputText
                placeholder="Type your issue here"
                value={issueDescription}
                onChange={setIssueDescription}
              />
              <SubmissionButton
                text="Submit"
                handleSubmit={handleSubmit}
                inactive={isButtonDisabled}
              />
            </div>
          )}
          {isIssueSubmitted && (
            <div className="bug-report-body">
              <div className="bug-report-text">
                <h2>{bugReportText.thankYouMessage1}</h2>
                <p>{bugReportText.thankYouMessage2}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BugReport;
