import React, { useState } from "react";
import SubmissionButton from "../button";
import InputText from "../inputs/input-text";
import close from "../../images/buttons/button-close.png";

const PopUpPassword = ({ closePopup }) => {
  const [msg, setMsg] = useState(false);
  const [email, setEmail] = useState("");
  const onSubmit = () => {
    //
  };

  return (
    <div className="pop-up-underlay">
      <div className="pop-up-box">
        <h1>Password Recovery</h1>
        {msg ? (
          <p>
            You will recieve an email with instructions to reset your password
          </p>
        ) : (
          <>
            <p>Enter your email below to reset your password</p>
            <InputText placeholder={"email"} onChange={setEmail} />
            <div className="pop-up-options">
              <SubmissionButton
                text={"Cancel"}
                specialIcon={close}
                handleSubmit={() => closePopup(false)}
              />
              <SubmissionButton
                text={"Submit"}
                handleSubmit={() => {
                  setMsg(true);
                }}
              />
            </div>
          </>
        )}
        {msg && (
          <div className="pop-up-options">
            <SubmissionButton
              text={"Close"}
              specialIcon={close}
              handleSubmit={() => closePopup(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PopUpPassword;
