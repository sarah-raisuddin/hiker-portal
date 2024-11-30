import React from "react";
import SubmissionButton from "../button";

const PopUpOption = ({
  title,
  message,
  button1Label,
  button2Label,
  onButton1Click,
  onButton2Click,
  specialIcon1,
  specialIcon2,
}) => {
  return (
    <div className="pop-up-underlay">
      <div className="pop-up-box">
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="pop-up-options">
          <SubmissionButton
            handleSubmit={onButton1Click}
            text={button1Label}
            specialIcon={specialIcon1}
          />
          <SubmissionButton
            handleSubmit={onButton2Click}
            text={button2Label}
            specialIcon={specialIcon2}
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpOption;
