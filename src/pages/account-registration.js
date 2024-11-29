// src/About.js
import React, { useState, useEffect } from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/inputs/input-text";
import PageHeader from "../base-components/page-header";
import PopUpMessage from "../base-components/pop-ups/pop-up-message";
import PopUpOption from "../base-components/pop-ups/pop-up-option";
import { useLocation } from "react-router-dom";
import InputErrorMessage from "../base-components/inputs/input-error-message";
import InputPassword from "../base-components/inputs/input-password";
import { validateEmailFormat } from "../util";

function AccountRegistration() {
  // user info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tagId, setTagId] = useState("");

  // error handling
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [hasEmptyField, setHasEmptyField] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);
  const [isTagLinked, setIsTagLinked] = useState(false);
  const [tagDuplicate, setHasDuplicateTag] = useState(false);
  const [isEmailLinked, setIsEmailLinked] = useState(false);
  const [emailDuplicatError, setEmailDuplicateError] = useState(false);

  const location = useLocation();

  // button state
  const isButtonDisabled =
    email.trim() === "" ||
    password.trim() === "" ||
    firstName.trim() === "" ||
    lastName.trim() === "" ||
    tagId.trim() === "";

  // reset update status upon re-navigating back to this page
  useEffect(() => {
    setRegistrationStatus("");
  }, [location]);

  useEffect(() => {
    checkIfTagIsAlreadyLinked();
  }, [tagId]);

  useEffect(() => {
    checkifEmailIsAlreadyLinked();
  }, [email]);

  const checkifEmailIsAlreadyLinked = async () => {
    const apiEndpoint =
      "https://trekcheck-server.azurewebsites.net/hiker_portal/check-email";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsEmailLinked(data.isEmailLinked);
      } else {
        console.log("Failed to check email link status", response.statusText);
      }
    } catch (error) {
      console.error("Error checking email link status:", error);
    }
  };

  const registerUserAccount = async () => {
    const apiEndpoint =
      "https://trekcheck-server.azurewebsites.net/hiker_portal/register";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email, firstName, lastName, tagId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Account registration successful", data);
        setRegistrationStatus("success");
      } else {
        // Handle errors
        console.log("Account registration failed", response.statusText);
        setRegistrationStatus("failure");
      }
    } catch (error) {
      console.error("Error during account registration:", error);
      setRegistrationStatus("failure");
    }
  };

  const validateUserAccountInfo = () => {
    if (
      email === "" ||
      password === "" ||
      firstName === "" ||
      lastName === ""
    ) {
      setHasEmptyField(true);
    } else {
      setHasEmptyField(false);
      const isEmailValid = validateEmailFormat(email);
      if (isEmailValid) {
        setEmailInputError(false);
        if (isEmailLinked) {
          setEmailDuplicateError(true);
        } else {
          setEmailDuplicateError(false);
          if (isTagLinked) {
            setHasDuplicateTag(true);
          } else {
            setHasDuplicateTag(false);
            registerUserAccount();
          }
        }
      } else {
        setEmailInputError(true);
      }
    }
  };

  const checkIfTagIsAlreadyLinked = async () => {
    const apiEndpoint =
      "https://trekcheck-server.azurewebsites.net/hiker_portal/check-tag";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rfid_tag_uid: tagId }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsTagLinked(data.isLinked);
      } else {
        console.log("Failed to get tag link status", response.statusText);
      }
    } catch (error) {
      console.error("Error checking tag link status: ", error);
    }
  };

  return (
    <div className="account-registration">
      <PageHeader text={"Register for an Account"} />
      {registrationStatus === "success" && (
        <PopUpOption
          title="Registration successful!"
          message="You can return to the login page to access your account, or learn how to navigate the HikerPortal by watching one of our tutorials."
          link1="/login"
          link1Label="Login"
          link2="/tutorials"
          link2label="Tutorials"
        />
      )}
      {registrationStatus === "failure" && (
        <PopUpMessage
          title="Registration failed!"
          message="Please try again."
          link="/account-registration"
        />
      )}
      <div
        className={
          registrationStatus
            ? "blur account-registration-container"
            : "account-registration-container"
        }
      >
        <div className="account-registration-body">
          <InputText
            label="Email:"
            placeholder="Type your email"
            value={email}
            onChange={setEmail}
          />
          <InputPassword
            label="Password:"
            placeholder="Type your password"
            value={password}
            onChange={setPassword}
          />
          <div className="two-col-inputs">
            <InputText
              label="First Name"
              placeholder="Type your First Name"
              value={firstName}
              onChange={setFirstName}
            />
            <InputText
              label="Last Name"
              placeholder="Type your Last Name"
              value={lastName}
              onChange={setLastName}
            />
            <InputText
              label="Tag ID"
              placeholder="Type your tag ID"
              value={tagId}
              onChange={setTagId}
            />
          </div>
          {hasEmptyField && (
            <InputErrorMessage
              message={"Account information cannot be blank. Please try again."}
            />
          )}
          {emailInputError && (
            <InputErrorMessage
              message={"Invalid email address. Please try again."}
            />
          )}{" "}
          {tagDuplicate && (
            <InputErrorMessage
              message={
                "The tag provided is already linked to another account. Please enter an unlinked tag."
              }
            />
          )}
          {emailDuplicatError && (
            <InputErrorMessage
              message={
                "The email you provided is already in use. Please enter another email."
              }
            />
          )}
          <SubmissionButton
            handleSubmit={validateUserAccountInfo}
            text="Register"
            inactive={isButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default AccountRegistration;
