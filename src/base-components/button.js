// src/InputComponent.js
import React, { useState } from "react";
import arrow from "../images/buttons/button-arrow.png";

function SubmissionButton({ handleSubmit, text, specialIcon, inactive }) {
  const buttonImage = specialIcon || arrow;

  return (
    <div className="button-container">
      <button
        className={`button ${inactive ? "inactive" : ""}`}
        onClick={handleSubmit}
        disabled={inactive}
      >
        <p>{text}</p>
        <img src={buttonImage} />
      </button>
    </div>
  );
}

export default SubmissionButton;
