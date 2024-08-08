import React, { useState } from "react";
import errorIcon from "../images/error-icon.png"

function InputErrorMessage({message}) {

  return (
    <div className="input-error-message">
      <img className="error-icon" src={errorIcon}></img>
      <p>{message}</p>
    </div>
  );
}

export default InputErrorMessage;