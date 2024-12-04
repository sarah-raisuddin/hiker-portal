import React from "react";
import PageHeader from "../base-components/page-header";
import BackToDashboard from "../base-components/back-to-dashboard";
import { isUserLoggedIn } from "../util";
import info from "../images/icons/info.png";
import { useNavigate } from "react-router-dom";
import SubmissionButton from "../base-components/button";

function KnowBefore() {
  const preTripList = [
    "Verify that all information in your Trip Plan is correct and up to date",
    "Share your unique progress monitoring link with your ememrgency contact",
    "Ensure that your emergency contact can view your personalized progress monitoring page",
    "Locate your tag and ensure it is correctly linked to your account",
    "Identify the location of each checkpoint along the trail",
  ];
  const duringTripList = [
    "Store your tag in an easily accessible location",
    "Keep a look out for checkpoints along the trail, it is important that you tap at each checkpoint you encounter to keep your emergency contact up to date! Signs and stickers will be placed on existing trail infrastructure to guide you towards checkpoints",
    "When you arrive at a checkpoint, tap the red box on the checkpoint with your tag once, and wait for a green light to flash",
    "If you encounter a checkpoint that does not light up or flashes red after tapping, try tapping a few more times. If the checkpoint is still flashing red or is unresponsive continue on the trail and tap at the next available checkpoint.",
  ];
  const postTripList = [
    "Alert your emergency contact that you have completed the trail",
    "If you encountered a checkpoint that was unresponsive or continously flashed red when you tapped your tag, please let us know by submitting an issue report on our Report an Issue page.",
  ];

  const navigateTo = useNavigate();

  const navToMaps = () => {
    navigateTo("/maps");
  };

  const navToIssueReport = () => {
    navigateTo("/bug-report");
  };

  const isLoggedIn = isUserLoggedIn();

  return (
    <div className="know-before">
      <PageHeader text="Know Before You Go..." />
      {isLoggedIn && <BackToDashboard />}
      <div className="know-before-container">
        <div className="know-before-body">
          <div className="know-before-reminders">
            <img src={info} />
            <p>
              The outdoors can be very dangerous, and many lives have been lost
              by not preparing appropriately. TrekCheck is not a replacement for
              preparedness in the outdoors, and should not be your only safety
              measure.
              <br></br> <br></br>Although Search and Rescue (SAR) teams have
              access to hiker location data, SAR is not actively monitoring a
              hikers progress. Progress monitoring is the responsibility of each
              hiker's emergency contact.
            </p>
          </div>
          <hr></hr>
          <h2>Before your Trek:</h2>
          <ol>
            {preTripList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
          <SubmissionButton
            text={"View Checkpoint Maps"}
            handleSubmit={navToMaps}
          />
          <h2>During your Trek:</h2>
          <ol>
            {duringTripList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
          <h2>After your Trek:</h2>
          <ol>
            {postTripList.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
          <SubmissionButton
            text={"Submit an Issue"}
            handleSubmit={navToIssueReport}
          />
        </div>
      </div>
    </div>
  );
}

export default KnowBefore;
