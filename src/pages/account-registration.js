// src/About.js
import React, {useState, useEffect} from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";
import PageHeader from "../base-components/page-header";
import PopUpMessage from "../base-components/pop-up-message";
import { useLocation } from "react-router-dom";

function AccountRegistration() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [isRegistrationSucessful, setRegistrationStatus] = useState("");

  const location = useLocation();

  useEffect(() => {
    setRegistrationStatus("");
  }, [location]);

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
  
  return (
    <div className="account-registration">
      <PageHeader text={"Register for an Account"} />
      {isRegistrationSucessful === "success" && (
      <PopUpMessage 
        title="Registration successful!"
        message="Please return to the login page to access your account."
        link="/login"/>
      )}
      {isRegistrationSucessful === "failure" && (
      <PopUpMessage 
        title="Registration failed!"
        message="Please try again."
        link="/account-registration"/>
      )
      }
      <div className={isRegistrationSucessful ? "blur account-registration-container" : "account-registration-container"}>
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