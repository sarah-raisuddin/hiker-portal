// src/About.js
import React, { useState } from "react";
import productLogo from "../images/trekCheck-logo-white.png"
import companyLogo from "../images/wanderSafe-logo-white.png";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiEndpoint = "http://localhost:3000/hiker_portal/login";
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
      } else {
        // Handle errors
        console.log("Login failed", response.statusText);
      }
    } catch (error) {
      console.error("Error during login:", error);
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
          onChange={setEmail}/>
        <InputText 
          label="Password" 
          placeholder="type your password"
          value={password}
          onChange={setPassword} />
        <div className="forgot-password-link">
          <p>
            Forgot password? <a>Click here for account recovery</a>
          </p>
        </div>
        <SubmissionButton handleSubmit={handleSubmit}/>
      </div>
    </div>
  );
}

export default Login;
