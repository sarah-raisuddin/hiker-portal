import React from "react";

function AboutMe({name, role, description, headshot}) {
  return (
    <div className="about-me">
      <img className="about-me-photo" img src={headshot} />
      <div className="about-me-body">
        <h3>{name}</h3>
        <h4>{role}</h4>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default AboutMe;