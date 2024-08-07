import React from "react";
import SubmissionButton from "./button";
import { useNavigate } from "react-router-dom";

const PopUpMessage = ({title, message, link}) => {
  const navigateTo = useNavigate();

  const directToPage = () => {
    navigateTo(link);
  }

  return (
    <div className="pop-up-underlay">
      <div className="pop-up-box">
        <h1>{title}</h1>
        <p>{message}</p>
        <SubmissionButton handleSubmit={directToPage}/>
      </div> 
    </div>

  )
}

export default PopUpMessage;