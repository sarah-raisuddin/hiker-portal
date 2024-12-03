import React, { lazy, Suspense } from "react";
import PageHeader from "../base-components/page-header";
import creatAccountVideo from "../videos/createAccount-tut.mov";
import createTripPlanVideo from "../videos/creatingTripPlan-tut.mov";
import checkpointsVideo from "../videos/checkpoint-tut.mp4";
import viewProgressVideo from "../videos/viewProgress-tut.mov";
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
            The Hiker Portal helps you plan trips, track your progress, and keep
            your emergency contact updated on your progress through our digital
            checkpoint system. The tutorials provided below provide a general
            overview for how to best utilize our system to stay safe on your
            next adventure!
          </p>
          <h3>1. Registering An Account</h3>
          <Suspense fallback={<LoadingSpinner />}>
            <DisplayVideo src={creatAccountVideo} />
          </Suspense>
          <h3>2. Creating a Trip Plan</h3>
          <Suspense fallback={<LoadingSpinner />}>
            <DisplayVideo src={createTripPlanVideo} />
          </Suspense>
          <h2>3. Using the Trail Checkpoints</h2>
          <Suspense fallback={<LoadingSpinner />}>
            <DisplayVideo src={checkpointsVideo} />
          </Suspense>
          <h3>4. Monitoring Progress</h3>
          <Suspense fallback={<LoadingSpinner />}>
            <DisplayVideo src={viewProgressVideo} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Tutorial;
