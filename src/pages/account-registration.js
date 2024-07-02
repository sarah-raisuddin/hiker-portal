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
          <InputText label="First Name" placeholder="type your first name" />
          <InputText label="Last Name" placeholder="type your last name" />
          <SubmissionButton />
        </div>
      </div>
    </div>
  );
}

export default AccountRegistration;
