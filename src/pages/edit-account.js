import React, {useEffect, useState} from "react";
import DisplayText from "../base-components/display-text";
import PageHeader from "../base-components/page-header";
import SubmissionButton from "../base-components/button";
import BackToDashboard from "../base-components/back-to-dashboard";
import InputText from "../base-components/input-text";
import PopUpMessage from "../base-components/pop-up-message";
import { useNavigate, useLocation } from "react-router-dom";
import InputErrorMessage from "../base-components/input-error-message";

function EditAccount() {
    // user info
    const userId = localStorage.getItem("userId");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [updateStatus, setUpdateStatus] = useState("");

    // error handling
    const [hasEmptyField, setHasEmptyField] = useState(false);

    const location = useLocation();

    // reset update status upon re-navigating back to this page
    useEffect(() => {
        setUpdateStatus("");
    }, [location]);

    const navigateTo = useNavigate();

    const getUserAccountInfo = async () => {
        const apiEndpoint = `http://localhost:3000/hiker_portal/accountDetails/${userId}`;
        try {
          const response = await fetch(apiEndpoint, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
        
          if (response.ok) {
            const data = await response.json();
            console.log("Get user account info sucessful", data);
            setEmail(data.email);
            setFirstName(data.first_name);
            setLastName(data.last_name);
          }
          else {
            console.log("Failed to get user account info", response.status);
          }
        }
        catch (error) {
          console.log("Error during get user account info", error);
        }
    };

    const validateUserAccountInfo = () => {
        if (firstName === "" || lastName === "") {
            setHasEmptyField(true);
        }
        else {
            setHasEmptyField(false);
            updateUserAccountInfo();
        }
    }

    const updateUserAccountInfo = async () => {
        const apiEndpoint = `http://localhost:3000/hiker_portal/updateAccount/${userId}`;
        try {
          const response = await fetch(apiEndpoint, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({first_name: firstName, last_name: lastName})
          });
        
          if (response.ok) {
            const data = await response.json();
            console.log("Update user account info sucessful", data);
            localStorage.setItem("firstName", firstName);
            setUpdateStatus("success");
          }
          else {
            console.log("Failed to update user account info", response.status);
            setUpdateStatus("failure");
          }
        }
        catch (error) {
          console.log("Error during update user account info", error);
          setUpdateStatus("failure");
        }
    };

    useEffect(() => {
        getUserAccountInfo();
    }, []);

    return (
        <div className="edit-account">
            <PageHeader text={"Edit Account"} />
            <BackToDashboard/>
            {updateStatus === "success" && (
            <PopUpMessage 
                title="Account information has been updated sucessfully!"
                message="Return to your dashboard."
                link="/trips"/>
            )}
            {updateStatus === "failure" && (
            <PopUpMessage 
                title="Account information update failed!"
                message="Please try again."
                link="/edit-account"/>
            )
            }
            <div className={updateStatus ? "blur edit-account-container" : "edit-account-container"}>
                <div className="edit-account-body">
                    <DisplayText
                        label="Email:"
                        value={email}
                    />
                    {/* TODO-beta: Password change and recovery moved to beta */}
                    {/* <DisplayText
                        label="Password:"
                        value={password}
                    /> */}
                    <div className="two-col-inputs">
                        <InputText 
                            label="First Name" 
                            value={firstName}
                            onChange={setFirstName} />
                        <InputText 
                            label="Last Name" 
                            value={lastName} 
                            onChange={setLastName}/>
                    </div>
                    {hasEmptyField && (
                        <InputErrorMessage
                        message={"Account information cannot be blank. Please try again."}
                      />
                    )
                    }
                    <SubmissionButton handleSubmit={validateUserAccountInfo}/>
                </div>
            </div>
        </div>
    );
}

export default EditAccount;