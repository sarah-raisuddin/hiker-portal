// src/About.js
import React from "react";
import productLogo from "../images/trekCheck-logo-white.png"
import companyLogo from "../images/wanderSafe-logo-white.png";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";

function Login() {
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
