import React, { useEffect, useState } from "react";
import PageHeader from "../base-components/page-header";
import DisplayText from "../base-components/display-text";
import SubmissionButton from "../base-components/button";
import save from "../images/button-save.png";
import cancel from "../images/button-close.png";
import { useNavigate } from "react-router-dom";
import InputText from "../base-components/input-text";
import Dropdown from "../base-components/input-dropdown";
import InputDateTime from "../base-components/input-datetime";
import { formatDateFromDatabase } from "../util";
import { validateDateRange, validatePhoneNumberFormat } from "../util";
import InputErrorMessage from "../base-components/input-error-message";

function EditTrip() {
  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
  const navigateTo = useNavigate();
  useEffect(() => {
    if (isUserLoggedIn === "false") {
      navigateTo("/login");
    }
  }, [isUserLoggedIn, navigateTo]);

  //user info
  const tripPlanId = localStorage.getItem("tripPlanIdToView");
  const userId = localStorage.getItem("userId");

  // trip plan info
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [trail_id, setTrailID] = useState("");
  const [trail_name, setTrailName] = useState("");
  const [entry_point, setEntryPoint] = useState("");
  const [exit_point, setExitPoint] = useState("");
  const [emergency_contact_name, setContactName] = useState("");
  const [emergency_contact_number, setContactNumber] = useState("");
  const [rfid_tag_uid, setRfidTagID] = useState("");
  const [startPointName, setStartPointName] = useState("");
  const [endPointName, setEndPointName] = useState("");

  const [checkpointOptions, setCheckpointOptions] = useState([]);

  // error checking
  const [hasEmptyField, setHasEmptyField] = useState(false);
  const [hasInvalidDates, setHasInvalidDates] = useState(false);
  const [hasInvalidPhoneNumber, setHasInvalidPhoneNumber] = useState(false);

  const handleCancel = () => {
    navigateTo("/trip-summary");
  };

  const getTripPlan = async () => {
    const apiEndpoint = `https://local-test-deployment-capstone-2024.azurewebsites.net//hiker_portal/trip_plans?user_id=${userId}`;
    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get trip plan sucessful", data);
        const tripPlanToView = data.trails.find(
          (trail) => trail.id === Number(tripPlanId)
        );

        // TODO-KT: this is very messy, should clean up
        setStartDate(tripPlanToView.start_date);
        setEndDate(tripPlanToView.end_date);
        setTrailID(tripPlanToView.trail_id);
        setEntryPoint(tripPlanToView.entry_point);
        setExitPoint(tripPlanToView.exit_point);
        setRfidTagID(tripPlanToView.rfid_tag_uid);
        setTrailName(tripPlanToView.trail_name);
        setContactName(tripPlanToView.emergency_contact_name);
        setContactNumber(tripPlanToView.emergency_contact_number);
      } else {
        console.log("Failed to get trip plan", response.status);
      }
    } catch (error) {
      console.log("Error during get trip plan", error);
    }
  };

  const getCheckpointNames = async () => {
    const apiEndPoint = `https://local-test-deployment-capstone-2024.azurewebsites.net/sar_dashboard/trailInfo/${trail_id}`;
    try {
      const response = await fetch(apiEndPoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get checkpoint names successful", data);

        const entryCheckpoint = data.checkpoints.find(
          (checkpoint) => checkpoint.id === Number(entry_point)
        );
        const exitCheckpoint = data.checkpoints.find(
          (checkpoint) => checkpoint.id === Number(exit_point)
        );

        setCheckpointOptions(data.checkpoints);

        setStartPointName(entryCheckpoint.name);
        setEndPointName(exitCheckpoint.name);
      } else {
        console.log("Error getting checkpoint names", response.status);
      }
    } catch (error) {
      console.log("Error getting checkpoint names", error);
    }
  };

  const handleSave = async () => {
    console.log(userId);
    console.log(tripPlanId);
    const apiEndPoint = `https://local-test-deployment-capstone-2024.azurewebsites.net/hiker_portal/trip_plan/${userId}/${tripPlanId}`;
    try {
      const response = await fetch(apiEndPoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          entry_point: entry_point,
          exit_point: exit_point,
          start_date: start_date,
          end_date: end_date,
          emergency_contact_name: emergency_contact_name,
          emergency_contact_number: emergency_contact_number,
          rfid_tag_uid: rfid_tag_uid,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Update trip plan sucessful", data);
        navigateTo("/trip-summary");
      } else {
        console.log("Failed to update trip plan", response.status);
      }
    } catch (error) {
      console.log("Error during update trip plan", error);
    }
  };

  const validateTripPlan = () => {
    if (
      trail_id === "" ||
      entry_point === "" ||
      exit_point === "" ||
      start_date === "" ||
      end_date === "" ||
      emergency_contact_name === "" ||
      emergency_contact_number === "" ||
      rfid_tag_uid === ""
    ) {
      setHasEmptyField(true);
    } else {
      setHasEmptyField(false);
      const isDateRangeValid = validateDateRange(start_date, end_date);
      if (!isDateRangeValid) {
        setHasInvalidDates(true);
      } else {
        setHasInvalidDates(false);
        const isPhoneNumberValid = validatePhoneNumberFormat(
          emergency_contact_number
        );

        if (!isPhoneNumberValid) {
          setHasInvalidPhoneNumber(true);
        } else {
          setHasInvalidPhoneNumber(false);
          handleSave();
        }
      }
    }
  };

  useEffect(() => {
    getTripPlan();
    getCheckpointNames();
  }, [trail_id]);

  const handleEditTripPlan = () => {
    navigateTo("/trip-edit");
  };

  return (
    <div className="trip-edit">
      <PageHeader text={"Edit Trip Plan"} />
      <div className="trip-edit-container">
        <div className="trip-edit-body">
          <div className="controls">
            <div className="controls-save">
              <SubmissionButton
                text="Save"
                handleSubmit={validateTripPlan}
                specialIcon={save}
              ></SubmissionButton>
            </div>
            <div className="controls-cancel">
              <SubmissionButton
                text="Cancel"
                handleSubmit={handleCancel}
                specialIcon={cancel}
              ></SubmissionButton>
            </div>
          </div>
          {hasEmptyField && (
            <InputErrorMessage
              message={
                "Trip plan information cannot be blank. Please try again."
              }
            />
          )}
          {hasInvalidDates && (
            <InputErrorMessage
              message={
                "The start date cannot be after the end date. Please try again."
              }
            />
          )}
          {hasInvalidPhoneNumber && (
            <InputErrorMessage
              message={"Invalid phone number. Please try again."}
            />
          )}
          <DisplayText label="Trail Name:" value={trail_name} />
          <div className="two-col-inputs">
            <Dropdown
              label="Start Point:"
              options={checkpointOptions}
              onSelect={setEntryPoint}
              initialOptionValue={entry_point}
            />
            <Dropdown
              label="End Point:"
              options={checkpointOptions}
              onSelect={setExitPoint}
              initialOptionValue={exit_point}
            />
          </div>
          <div className="two-col-inputs">
            <InputDateTime
              label="Start Date:"
              value={formatDateFromDatabase(start_date)}
              onChange={setStartDate}
            />
            <InputDateTime
              label="End Date:"
              value={formatDateFromDatabase(end_date)}
              onChange={setEndDate}
            />
          </div>
          <InputText
            label="Emergency Contact Name:"
            value={emergency_contact_name}
            onChange={setContactName}
          />
          <div>
            <InputText
              label="Emergency Contact Phone Number:"
              value={emergency_contact_number}
              onChange={setContactNumber}
            />
          </div>
          <InputText
            label="Tag Identifier:"
            value={rfid_tag_uid}
            onChange={setRfidTagID}
          />
        </div>
      </div>
    </div>
  );
}

export default EditTrip;
