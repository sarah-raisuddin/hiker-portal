import React, { useState } from "react";
import PageHeader from "../base-components/page-header";
import bugReportText from "../data/bug-report-data";
import SubmissionButton from "../base-components/button";
import LongInputText from "../base-components/input-text-long";
import issueIcon from "../images/issue-icon.png";

function BugReport() {
  const [isIssueSubmitted, setIsIssueSubmitted] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO-KT: server request here to submit issue

    setIsIssueSubmitted(true);
  };

  return (
    <div className="bug-report">
      <PageHeader text={"Report An Issue"} />
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
            <SubmissionButton text="Submit" handleSubmit={handleSubmit} />
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
  );
}

export default BugReport;
