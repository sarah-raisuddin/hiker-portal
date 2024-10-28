import React from "react";
import PageHeader from "../base-components/page-header";
import DisplayVideo from "../base-components/display-video";
import dummyVideo from "../videos/tutorial.mp4";

// TODO-KT: put actually tutorial videos here
function Tutorial() {
  return (
    <div className="tutorials">
      <PageHeader text={"Tutorials"} />
      <div className="tutorials-container">
        <div className="tutorials-body">
          <h2>Hiker Portal</h2>
          <p>
            The hiker portal helps you plan trips, track your progress, and keep
            your emergency contact updated on your progress through our digital
            checkpoint system. The tutorials provided below provide a general
            overview for how to best utilize our system to stay safe on your
            next adventure!
          </p>
          <h3>Registering An Account</h3>
          <DisplayVideo src={dummyVideo} />
          <h3>Navigating the Hiker Portal</h3>
          <DisplayVideo src={dummyVideo} />
          <h3>Creating a Trip Plan</h3>
          <DisplayVideo src={dummyVideo} />
          <h3>Monitoring Progress</h3>
          <DisplayVideo src={dummyVideo} />
          <h2>Trail Checkpoints</h2>
          <DisplayVideo src={dummyVideo} />
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
