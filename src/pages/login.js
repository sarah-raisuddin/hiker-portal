// src/About.js
import React from "react";
import logo from "../images/logo.png";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";

function Login() {
  return (
    <div className="login">
      <div>
        <h1>
          <i>TrekCheck</i>
        </h1>
        <div className="login-subtitle">
          <h2>by</h2>
          <img className="login-logo" src={logo}></img>
        </div>
      </div>
      <div className="login-body">
        <InputText label="Email" placeholder="type your email" />
        <InputText label="Password" placeholder="type your password" />
        <div className="forgot-password-link">
          <p>
            Forgot password? <a>Click here for account recovery</a>
          </p>
        </div>
        <SubmissionButton />
      </div>
    </div>
  );
}

export default Login;
