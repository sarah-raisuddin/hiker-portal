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
        <SubmissionButton
          specialIcon={close}
          handleSubmit={() => closePopup(false)}
        />
        {msg ? (
          <p>
            You will recieve an email with instructions to reset your password
          </p>
        ) : (
          <>
            <p>Enter email to recover password</p>
            <InputText placeholder={"email"} onChange={setEmail} />
            <div className="pop-up-options">
              <SubmissionButton
                text={"Submit"}
                handleSubmit={() => {
                  setMsg(true);
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PopUpPassword;
