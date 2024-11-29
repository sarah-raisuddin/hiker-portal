import React, { lazy, Suspense } from "react";
import PageHeader from "../base-components/page-header";
import dummyVideo from "../videos/tutorial.mp4";
import LoadingSpinner from "../base-components/loading-spinner";

const DisplayVideo = lazy(() =>
  import("../base-components/displays/display-video")
);

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
          <Suspense fallback={<LoadingSpinner />}>
            <DisplayVideo src={dummyVideo} />
          </Suspense>
          <h3>Navigating the Hiker Portal</h3>
          <Suspense fallback={<LoadingSpinner />}>
            <DisplayVideo src={dummyVideo} />
          </Suspense>
          <h3>Creating a Trip Plan</h3>
          <Suspense fallback={<LoadingSpinner />}>
            <DisplayVideo src={dummyVideo} />
          </Suspense>
          <h3>Monitoring Progress</h3>
          <Suspense fallback={<LoadingSpinner />}>
            <DisplayVideo src={dummyVideo} />
          </Suspense>
          <h2>Trail Checkpoints</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <DisplayVideo src={dummyVideo} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
