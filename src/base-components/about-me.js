import React from "react";

function AboutMe({name, role, description, headshot}) {
  return (
    <div className="about-me">
      <img className="about-me-photo" img src={headshot} />
      <div className="about-me-body">
        <h2>{name}</h2>
        <h3>{role}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default AboutMe;