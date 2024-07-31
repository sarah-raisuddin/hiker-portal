// src/About.js
import React, {useState} from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";
import PageHeader from "../base-components/page-header";

function AccountRegistration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiEndpoint = "http://localhost:3000/hiker_portal/register";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email, firstName, lastName, phoneNumber, address }),
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
    <div className="account-registration">
      <PageHeader text={"Finish Setting Up Your Account..."} />
      <div className="account-registration-container">
        <div className="account-registration-body">
          <InputText
            label="Email:"
            placeholder="Type your email"
            value={email}
            onChange={setEmail}/>
          <InputText
            label="Password:"
            placeholder="Type your password"
            value={password}
            onChange={setPassword}/>
          <div className="two-col-inputs">
          <InputText 
            label="First Name" 
            placeholder="Type your First Name"
            value={firstName}
            onChange={setFirstName}/>
          <InputText 
            label="Last Name" 
            placeholder="Type your Last Name"
            value={lastName}
            onChange={setLastName}/>
          </div>
          <InputText
            label="Phone Number (optional):"
            placeholder="Type your Phone Number"
            value={phoneNumber}
            onChange={setPhoneNumber}/>
          <InputText
            label="Address (optional):"
            placeholder="Type your Address"
            value={address}
            onChange={setAddress}/>
          <SubmissionButton handleSubmit={handleSubmit}/>
        </div>
      </div>
    </div>
  );
}

export default AccountRegistration;
