import React from "react";
import SubmissionButton from "../button";
import { useNavigate } from "react-router-dom";

const PopUpOption = ({
  title,
  message,
  link1,
  link1Label,
  link2,
  link2label,
}) => {
  const navigateTo = useNavigate();

  const directToPage = (link) => {
    console.log("pls");
    navigateTo(link);
  };

  return (
    <div className="pop-up-underlay">
      <div className="pop-up-box">
        <h1>{title}</h1>
        <p>{message}</p>
        <div className="pop-up-options">
          <SubmissionButton
            handleSubmit={directToPage(link1)}
            text={link1Label}
          />
          <SubmissionButton
            handleSubmit={directToPage(link2)}
            text={link2label}
          />
        </div>
      </div>
    </div>
  );
};

export default PopUpOption;
