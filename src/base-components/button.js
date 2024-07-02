// src/InputComponent.js
import React, { useState } from "react";
import arrow from "../images/button-arrow.png";

function SubmissionButton() {
  return (
    <div className="button-container">
      <button className="button">
        <img src={arrow} />
      </button>
    </div>
  );
}

export default SubmissionButton;
