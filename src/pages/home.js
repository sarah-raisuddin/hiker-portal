import React from "react";
import descriptionText from "../data/system-description"
import systemDiagram from "../images/trekCheckDiagram.png"
import trekCheckLogo from "../images/trekCheck-logo-white.png"
import AboutMe from "../base-components/about-me";
import teamAboutMeData from "../data/about-me-data";

function Home() {
    return (
        <div className="home">
        <img className="home-logo" src={trekCheckLogo}></img>
        <div className="home-body">
            <div className="system-overview">
                <h1>Safer Trails, One Checkpoint At A Time</h1>
                <p className="description">{descriptionText.introBlurb}</p>
                <p className="description">{descriptionText.systemBlurb}</p>
                <img className="system-diagram" src={systemDiagram}></img>
            </div>
            <div className="team-overview">
                <h1>Meet the Team</h1>
                {teamAboutMeData.map((aboutMe, index) => (
                    <AboutMe key={index} name={aboutMe.name} role={aboutMe.role} description={aboutMe.description} headshot={aboutMe.headshot} />
                ))}
            </div>
        </div>
        </div>
    );
}

export default Home;