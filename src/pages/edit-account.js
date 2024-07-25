import React from "react";
import DisplayText from "../base-components/display-text";
import PageHeader from "../base-components/page-header";
import SubmissionButton from "../base-components/button";
import accountData from "../data/account-dummyData";

function EditAccount() {
    return (
        <div className="edit-account">
            <PageHeader text={"Edit Account"} />
            <div className="account-registration-container">
                <div className="account-registration-body">
                <DisplayText
                    label="Email:"
                    placeholder={accountData.email}
                />
                <DisplayText
                    label="Password:"
                    placeholder={accountData.password}
                />
                <div className="two-col-inputs">
                    <DisplayText label="First Name" placeholder={accountData.firstName} />
                    <DisplayText label="Last Name" placeholder={accountData.lastName} />
                </div>
                <DisplayText
                    label="Phone Number (optional):"
                    placeholder={accountData.phoneNumber}
                />
                <DisplayText
                    label="Address (optional):"
                    placeholder={accountData.address}
                />
                <SubmissionButton />
                </div>
            </div>
        </div>
    );
}

export default EditAccount;