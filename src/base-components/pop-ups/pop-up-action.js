import React from "react";
import SubmissionButton from "../button";

const PopUpAction = ({ title, message, link, btnLabel, handleSubmit }) => {
  return (
    <div className="pop-up-underlay">
      <div className="pop-up-box">
        <h1>{title}</h1>
        <p>{message}</p>
        <SubmissionButton handleSubmit={handleSubmit} text={btnLabel} />
      </div>
    </div>
  );
};

export default PopUpAction;
