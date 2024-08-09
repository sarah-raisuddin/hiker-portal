import React from "react";
import DisplayText from "../base-components/display-text";
import PageHeader from "../base-components/page-header";
import SubmissionButton from "../base-components/button";
import accountData from "../data/account-dummyData";
import BackToDashboard from "../base-components/back-to-dashboard";

function EditAccount() {
    return (
        <div className="edit-account">
            <PageHeader text={"Edit Account"} />
            <BackToDashboard/>
            <div className="edit-account-container">
                <div className="edit-account-body">
                    <DisplayText
                        label="Email:"
                        value={accountData.email}
                    />
                    <DisplayText
                        label="Password:"
                        value={accountData.password}
                    />
                    <div className="two-col-inputs">
                        <DisplayText 
                            label="First Name" 
                            value={accountData.firstName} />
                        <DisplayText 
                            label="Last Name" 
                            value={accountData.lastName} />
                    </div>
                    <DisplayText
                        label="Phone Number (optional):"
                        value={accountData.phoneNumber}
                    />
                    <DisplayText
                        label="Address (optional):"
                        value={accountData.address}
                    />
                    <SubmissionButton />
                </div>
            </div>
        </div>
    );
}

export default EditAccount;