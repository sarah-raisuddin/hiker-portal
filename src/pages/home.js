import React, { lazy, Suspense } from "react";
import descriptionText from "../data/system-description";
import systemDiagram from "../images/trekCheckDiagram.png";
import trekCheckLogo from "../images/logos/trekCheck-logo-white.png";
import AboutMe from "../base-components/about-me";
import teamAboutMeData from "../data/about-me-data";
import SubmissionButton from "../base-components/button";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigateTo = useNavigate();

  const navToTutorials = () => {
    navigateTo("/tutorials");
  };

  return (
    <div className="home">
      <img className="home-logo" src={trekCheckLogo}></img>
      <div className="home-body">
        <div className="system-overview">
          <h1>Safer Trails, One Checkpoint At A Time</h1>
          <p className="description">{descriptionText.introBlurb}</p>
          <p className="description">{descriptionText.systemBlurb}</p>
          <img className="system-diagram" src={systemDiagram}></img>
          <h1>Curious to know more?</h1>
          <p className="description">
            Whether you are gearing up for your next adventure or simply curious
            about how our platform works, we have tutorials that will guide you
            every step of the way. Learn how to create trip plans, navigate the
            Hiker Portal, and se the checkpoint system to keep your emergency
            contact updated. Click the button below to start getting the most of
            your journey!
          </p>
          <SubmissionButton
            text={"View Tutorials"}
            handleSubmit={navToTutorials}
          />
        </div>
        <div className="team-overview">
          <h1>Meet the Team</h1>
          {teamAboutMeData.map((aboutMe, index) => (
            <AboutMe
              key={index}
              name={aboutMe.name}
              role={aboutMe.role}
              description={aboutMe.description}
              headshot={aboutMe.headshot}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
