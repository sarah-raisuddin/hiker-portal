// src/About.js
import React, { useState } from "react";
import productLogo from "../images/logos/trekCheck-logo-white.png";
import companyLogo from "../images/logos/wanderSafe-logo-white.png";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/inputs/input-text";
import InputErrorMessage from "../base-components/inputs/input-error-message";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../base-components/inputs/input-password";
import { validateEmailFormat } from "../util";
import PopUpPassword from "../base-components/pop-ups/pop-up-pwd";
import apiBase from "../requests/base";

function Login() {
  // login info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  // error handling
  const [emailInputError, setEmailInputError] = useState(false);
  const [unsuccessfulLogin, setUnsuccessfulLogin] = useState(false);

  // navigation
  const navigateTo = useNavigate();

  // button state
  const isButtonDisabled = email.trim() === "" || password.trim() === "";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmailFormat(email);
    if (!isEmailValid) {
      setEmailInputError(true);
      console.log("email is invalid");
    } else {
      setEmailInputError(false);
    }

    const apiEndpoint = `${apiBase}/hiker_portal/login`;
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);

        // set login state variable to true, store important login info in local storage
        setUnsuccessfulLogin(false);
        localStorage.setItem("token", data.token);

        // direct user to terms and conditions
        navigateTo("/terms-conditions");
      } else {
        // Handle errors
        console.log("Login failed", response.statusText);
        setUnsuccessfulLogin(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setUnsuccessfulLogin(true);
    }
  };

  return (
    <div className="login">
      {forgotPassword && <PopUpPassword closePopup={setForgotPassword} />}
      <div
        className={forgotPassword ? "blur login-container" : "login-container"}
      >
        <img className="login-productLogo" src={productLogo}></img>
        <div className="login-subtitle">
          <h2>by</h2>
          <img className="login-companyLogo" src={companyLogo}></img>
        </div>
        <div className="login-body">
          <InputText
            label="Email"
            placeholder="type your email"
            value={email}
            onChange={setEmail}
          />
          <InputPassword
            label="Password"
            placeholder="type your password"
            value={password}
            onChange={setPassword}
          />
          {emailInputError && (
            <InputErrorMessage
              message={"Invalid email address. Please try again."}
            />
          )}
          {unsuccessfulLogin && !emailInputError && (
            <InputErrorMessage
              message={"Incorrect email or password. Please try again."}
            />
          )}
          <div className="account-registration-link">
            <p>
              Don't have an account?{" "}
              <Link to="/account-registration">Click here to sign up</Link>
            </p>
          </div>
          <div class="forgot-pwd account-registration-link">
            <p>
              <a onClick={() => setForgotPassword(true)}>Forgot Password?</a>
            </p>
          </div>
          <SubmissionButton
            text="Login"
            handleSubmit={handleSubmit}
            inactive={isButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
