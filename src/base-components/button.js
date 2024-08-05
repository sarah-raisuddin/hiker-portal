// src/InputComponent.js
import React, { useState } from "react";
import arrow from "../images/button-arrow.png";

function SubmissionButton({ handleSubmit, text, specialIcon}) {

  const buttonImage = specialIcon || arrow;
  
  return (
    <div className="button-container">
      <button className="button" onClick={handleSubmit}>
        <p>{text}</p>
        <img src={buttonImage} />
      </button>
    </div>
  );
}

export default SubmissionButton;
