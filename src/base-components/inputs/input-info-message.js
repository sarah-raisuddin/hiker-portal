import React from "react";
import infoIcon from "../../images/icons/info.png";

function InputInfoMessage({ message }) {
  return (
    <div className="input-info-message">
      <img src={infoIcon} />
      <p>{message}</p>
    </div>
  );
}

export default InputInfoMessage;
