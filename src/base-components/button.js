// src/InputComponent.js
import React, { useState } from "react";
import arrow from "../images/button-arrow.png";

function SubmissionButton({ handleSubmit, text}) {
  return (
    <div className="button-container">
      <button className="button" onClick={handleSubmit}>
        <img src={arrow} />
        {text}
      </button>
    </div>
  );
}

export default SubmissionButton;
