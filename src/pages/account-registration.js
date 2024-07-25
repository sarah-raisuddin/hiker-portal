// src/About.js
import React from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";
import PageHeader from "../base-components/page-header";

function AccountRegistration() {
  return (
    <div className="account-registration">
      <PageHeader text={"Finish Setting Up Your Account..."} />
      <div className="account-registration-container">
        <div className="account-registration-body">
          <InputText
            label="Email:"
            placeholder="Type your email"
          />
          <InputText
            label="Password:"
            placeholder="Type your password"
          />
          <div className="two-col-inputs">
            <InputText label="First Name" placeholder="Type your first name" />
            <InputText label="Last Name" placeholder="Type your last name" />
          </div>
          <InputText
            label="Phone Number (optional):"
            placeholder="Type your phone number"
          />
          <InputText
            label="Address (optional):"
            placeholder="Type your address"
          /> 
          <SubmissionButton />
        </div>
      </div>
    </div>
  );
}

export default AccountRegistration;
