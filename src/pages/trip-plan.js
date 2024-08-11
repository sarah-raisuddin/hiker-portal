// src/About.js
import React, { useState, useEffect } from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";
import PageHeader from "../base-components/page-header";
import InputDateTime from "../base-components/input-datetime";
import Dropdown from "../base-components/input-dropdown";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "../base-components/back-to-dashboard";
import { validateDateRange, validatePhoneNumberFormat } from "../util";
import InputErrorMessage from "../base-components/input-error-message";

function PlanTrip() {
  // user info
  const user_id = localStorage.getItem("userId");
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [trail_id, setTrailID] = useState("");
  const [entry_point, setEntryPoint] = useState("");
  const [exit_point, setExitPoint] = useState("");
  const [emergency_contact_name, setContactName] = useState("");
  const [emergency_contact_number, setContactNumber] = useState("");
  const [rfid_tag_uid, setRfidTagID] = useState("");
  const [trailOptions, setTrailOptions] = useState([]);
  const [checkpointOptions, setCheckpointOptions] = useState([]);

  // error checking
  const [hasEmptyField, setHasEmptyField] = useState(false);
  const [hasInvalidDates, setHasInvalidDates] = useState(false);
  const [hasInvalidPhoneNumber, setHasInvalidPhoneNumber] = useState(false);

  const isUserLoggedIn = localStorage.getItem("isUserLoggedIn");
  const navigateTo = useNavigate();
  useEffect(() => {
    if (isUserLoggedIn === "false") {
      navigateTo("/login");
    }
  }, [isUserLoggedIn, navigateTo]);

  const handleAddNewPlan = () => {
    navigateTo("/trip-plan");
  };

  const getTrailOptions = async () => {
    const apiEndPoint =
      "https://local-test-deployment-capstone-2024.azurewebsites.net//sar_dashboard/trails";
    try {
      const response = await fetch(apiEndPoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get trail options successful", data);

        setTrailOptions(data.trails);
      } else {
        console.log("Error getting trail options", response.status);
      }
    } catch (error) {
      console.log("Error getting trail options", error);
    }
  };

  const getTrailCheckpoints = async () => {
    console.log(trail_id);
    const apiEndPoint = `https://local-test-deployment-capstone-2024.azurewebsites.net//sar_dashboard/trailInfo/${trail_id}`;
    try {
      const response = await fetch(apiEndPoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get checkpoint options successful", data);

        setCheckpointOptions(data.checkpoints);
      } else {
        console.log("Error getting checkpoint options", response.status);
      }
    } catch (error) {
      console.log("Error getting checkpoint options", error);
    }
  };

  useEffect(() => {
    getTrailOptions();
  }, []);

  useEffect(() => {
    getTrailCheckpoints();
  }, [trail_id]);

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
          submitTripPlan();
        }
      }
    }
  };

  const submitTripPlan = async () => {
    const apiEndpoint =
      "https://local-test-deployment-capstone-2024.azurewebsites.net//hiker_portal/trip_plans";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id,
          start_date,
          end_date,
          trail_id,
          entry_point,
          exit_point,
          emergency_contact_name,
          emergency_contact_number,
          rfid_tag_uid,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Trip plan creation successful", data);
        const tripPlanId = data.id;

        localStorage.setItem("tripPlanIdToView", tripPlanId);
        navigateTo("/trip-summary");
      } else {
        // Handle errors
        console.log("Trip plan creation failed", response.statusText);
      }
    } catch (error) {
      console.error("Error during trip plan creation:", error);
    }
  };

  return (
    <div className="trip-plan">
      <PageHeader text={"Create a Trip Plan"} />
      <BackToDashboard />
      <div className="trip-plan-container">
        <div className="trip-plan-body">
          <Dropdown
            label="Trail Name:"
            placeholder="Select the Trail"
            options={trailOptions}
            onSelect={setTrailID}
          />
          <div className="two-col-inputs">
            <Dropdown
              label="Start Point:"
              placeholder="Select Start Point"
              options={checkpointOptions}
              onSelect={setEntryPoint}
            />
            <Dropdown
              label="End Point:"
              placeholder="Select End Point"
              options={checkpointOptions}
              onSelect={setExitPoint}
            />
          </div>
          <div className="two-col-inputs">
            <InputDateTime
              label="Start Date:"
              placeholder="Type Start Date"
              value={start_date}
              onChange={setStartDate}
            />
            <InputDateTime
              label="End Date:"
              placeholder="Type End Date"
              value={end_date}
              onChange={setEndDate}
            />
          </div>
          <InputText
            label="Emergency Contact Name:"
            placeholder="Type Emergency Contact Name"
            value={emergency_contact_name}
            onChange={setContactName}
          />
          <div>
            <InputText
              label="Emergency Contact Phone Number:"
              placeholder="Type Phone Number"
              value={emergency_contact_number}
              onChange={setContactNumber}
            />
          </div>
          <InputText
            label="Tag Identifier:"
            placeholder="Type Tag Identifier"
            value={rfid_tag_uid}
            onChange={setRfidTagID}
          />
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
          <SubmissionButton handleSubmit={validateTripPlan} />
        </div>
      </div>
    </div>
  );
}

export default PlanTrip;
