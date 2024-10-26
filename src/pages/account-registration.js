// src/About.js
import React, { useState, useEffect } from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";
import PageHeader from "../base-components/page-header";
import PopUpMessage from "../base-components/pop-up-message";
import { useLocation } from "react-router-dom";
import InputErrorMessage from "../base-components/input-error-message";
import InputPassword from "../base-components/input-password";
import { validateEmailFormat } from "../util";

function AccountRegistration() {
  // user info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // error handling
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [hasEmptyField, setHasEmptyField] = useState(false);
  const [emailInputError, setEmailInputError] = useState(false);

  const location = useLocation();

  // reset update status upon re-navigating back to this page
  useEffect(() => {
    setRegistrationStatus("");
  }, [location]);

  const registerUserAccount = async () => {
    const apiEndpoint = "http://localhost:3000/hiker_portal/register";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email, firstName, lastName }),
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
        registerUserAccount();
      } else {
        setEmailInputError(true);
      }
    }
  };

  return (
    <div className="account-registration">
      <PageHeader text={"Register for an Account"} />
      {registrationStatus === "success" && (
        <PopUpMessage
          title="Registration successful!"
          message="Please return to the login page to access your account."
          link="/login"
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
          )}
          <SubmissionButton handleSubmit={validateUserAccountInfo} />
        </div>
      </div>
    </div>
  );
}

export default AccountRegistration;
