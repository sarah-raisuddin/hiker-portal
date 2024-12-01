import React, { useEffect, useState } from "react";
import DisplayText from "../base-components/displays/display-text";
import PageHeader from "../base-components/page-header";
import SubmissionButton from "../base-components/button";
import BackToDashboard from "../base-components/back-to-dashboard";
import InputText from "../base-components/inputs/input-text";
import PopUpMessage from "../base-components/pop-ups/pop-up-message";
import { useNavigate, useLocation } from "react-router-dom";
import InputErrorMessage from "../base-components/inputs/input-error-message";
import { isUserLoggedIn } from "../util";
import apiBase from "../requests/base";
import PopUpOption from "../base-components/pop-ups/pop-up-option";
import cancelIcon from "../images/buttons/button-close.png";

function EditAccount() {
  // user info
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  const [existingTagId, setExistingTagId] = useState("");
  const [tagId, setTagId] = useState("");

  const [isTagLinked, setIsTagLinked] = useState(false);
  const [tagDuplicateError, setHasDuplicateTagError] = useState(false);

  const [deleteAcc, setDeleteAcc] = useState(false);

  // error handling
  const [hasEmptyField, setHasEmptyField] = useState(false);

  const location = useLocation();
  const navigateTo = useNavigate();

  useEffect(() => {
    setUpdateStatus("");
  }, [location]);

  useEffect(() => {
    checkIfTagIsAlreadyLinked();
  }, [tagId]);

  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigateTo("/login");
    }
  }, [navigateTo]);

  useEffect(() => {
    getUserAccountInfo();
  }, []);

  // button state
  const isButtonDisabled =
    email.trim() === "" || firstName.trim() === "" || lastName.trim() === "";

  // reset update status upon re-navigating back to this page

  const getUserAccountInfo = async () => {
    const apiEndpoint = `${apiBase}/hiker_portal/accountDetails`;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get user account info sucessful", data);
        setEmail(data.email);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setTagId(data.tag_id);
        setExistingTagId(data.tag_id);
      } else {
        console.log("Failed to get user account info", response.status);
      }
    } catch (error) {
      console.log("Error during get user account info", error);
    }
  };

  const validateUserAccountInfo = () => {
    if (firstName === "" || lastName === "") {
      setHasEmptyField(true);
    } else {
      setHasEmptyField(false);
      if (isTagLinked && existingTagId !== tagId) {
        setHasDuplicateTagError(true);
      } else {
        setHasDuplicateTagError(false);
        updateUserAccountInfo();
      }
    }
  };

  const checkIfTagIsAlreadyLinked = async () => {
    const apiEndpoint = `${apiBase}/hiker_portal/check-tag`;
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rfid_tag_uid: tagId }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsTagLinked(data.isLinked);
      } else {
        console.log("Failed to get tag link status", response.statusText);
      }
    } catch (error) {
      console.error("Error checking tag link status: ", error);
    }
  };

  const updateUserAccountInfo = async () => {
    const apiEndpoint = `${apiBase}/hiker_portal/updateAccount`;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          tag_id: tagId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Update user account info sucessful", data);
        setUpdateStatus("success");
      } else {
        console.log("Failed to update user account info", response.status);
        setUpdateStatus("failure");
      }
    } catch (error) {
      console.log("Error during update user account info", error);
      setUpdateStatus("failure");
    }
  };

  const deleteUserAccount = async () => {
    const apiEndpoint = `${apiBase}/hiker_portal/deleteAccount`;
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(apiEndpoint, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.removeItem("token");
        navigateTo("/login");
      } else {
        console.log("Failed to delete account", response.status);
      }
    } catch (error) {
      console.log("Error during update user account info", error);
    }
  };

  const handleCancelDelete = () => {
    setDeleteAcc(false);
  };

  return (
    <div className="edit-account">
      <PageHeader text={"Edit Account"} />
      <BackToDashboard />
      {deleteAcc && (
        <PopUpOption
          title="Delete Account Data"
          message={"This action cannot be undone"}
          button2Label={"Delete Data"}
          button1Label={"Cancel"}
          onButton2Click={() => deleteUserAccount(email)}
          onButton1Click={handleCancelDelete}
          specialIcon1={cancelIcon}
        />
      )}

      {updateStatus === "success" && (
        <PopUpMessage
          title="Account information has been updated sucessfully!"
          message="Return to your dashboard."
          link="/trips"
        />
      )}
      {updateStatus === "failure" && (
        <PopUpMessage
          title="Account information update failed!"
          message="Please try again."
          link="/edit-account"
        />
      )}
      <div
        className={
          updateStatus || deleteAcc
            ? "blur edit-account-container"
            : "edit-account-container"
        }
      >
        <div className="edit-account-body">
          <div className="edit-account-delete">
            <SubmissionButton
              text="Delete Account"
              handleSubmit={() => setDeleteAcc(true)}
              specialIcon={cancelIcon}
            ></SubmissionButton>
          </div>
          <DisplayText label="Email:" value={email} />
          <div className="two-col-inputs">
            <InputText
              label="First Name"
              value={firstName}
              onChange={setFirstName}
            />
            <InputText
              label="Last Name"
              value={lastName}
              onChange={setLastName}
            />
          </div>
          <InputText label="Tag ID" value={tagId} onChange={setTagId} />
          {hasEmptyField && (
            <InputErrorMessage
              message={"Account information cannot be blank. Please try again."}
            />
          )}
          {tagDuplicateError && (
            <InputErrorMessage
              message={
                "The tag provided is already linked to another account. Please enter an unlinked tag."
              }
            />
          )}
          <SubmissionButton
            handleSubmit={validateUserAccountInfo}
            inactive={isButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default EditAccount;
