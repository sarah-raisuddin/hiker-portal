import React from "react";
import SubmissionButton from "../button";

const PopUpOption = ({
  title,
  message,
  link1Label,
  link2Label,
  onLink1Click,
  onLink2Click,
}) => {
  return (
    <div className="pop-up-underlay">
      <div className="pop-up-box">
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="pop-up-options">
          <SubmissionButton handleSubmit={onLink1Click} text={link1Label} />
          <SubmissionButton handleSubmit={onLink2Click} text={link2Label} />
        </div>
      </div>
    </div>
  );
};

export default PopUpOption;
