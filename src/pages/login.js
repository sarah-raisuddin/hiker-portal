// src/About.js
import React, { useState } from "react";
import productLogo from "../images/trekCheck-logo-white.png";
import companyLogo from "../images/wanderSafe-logo-white.png";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";
import InputErrorMessage from "../base-components/input-error-message";
import { Link, useNavigate } from "react-router-dom";
import InputPassword from "../base-components/input-password";

function Login({ handleUserLogIn }) {
  // login info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error handling
  const [emailInputError, setEmailInputError] = useState(false);
  const [unsuccessfulLogin, setUnsuccessfulLogin] = useState(false);

  // navigation
  const navigateTo = useNavigate();

  const validateEmailFormat = (email) => {
    // RegEx expression from: https://mailtrap.io/blog/validate-emails-in-react/
    const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    const isEmailValid = emailRegEx.test(email);
    return isEmailValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmailFormat(email);
    if (!isEmailValid) {
      setEmailInputError(true);
      console.log("email is invalid");
    } else {
      setEmailInputError(false);
    }

    const apiEndpoint =
      "https://local-test-deployment-capstone-2024.azurewebsites.net//hiker_portal/login";
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
        handleUserLogIn();
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("firstName", data.firstName);

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
      <div>
        <img className="login-productLogo" src={productLogo}></img>
        <div className="login-subtitle">
          <h2>by</h2>
          <img className="login-companyLogo" src={companyLogo}></img>
        </div>
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
        {/* TODO-beta: add accont recovery functionality       
        <div className="forgot-password-link">
          <p>
            Forgot password? <a>Click here for account recovery</a>
          </p>
        </div>
        */}
        <div className="account-registration-link">
          <p>
            Don't have an account?{" "}
            <Link to="/account-registration">Click here to sign up</Link>
          </p>
        </div>
        <SubmissionButton handleSubmit={handleSubmit} />
      </div>
    </div>
  );
}

export default Login;
