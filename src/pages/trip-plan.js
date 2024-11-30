// src/About.js
import React, { useState, useEffect } from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/inputs/input-text";
import PageHeader from "../base-components/page-header";
import InputDateTime from "../base-components/inputs/input-datetime";
import Dropdown from "../base-components/inputs/input-dropdown";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "../base-components/back-to-dashboard";
import { validateDateRange, validatePhoneNumberFormat } from "../util";
import InputErrorMessage from "../base-components/inputs/input-error-message";
import LongInputText from "../base-components/inputs/input-text-long";
import { isUserLoggedIn } from "../util";
import apiBase from "../requests/base";

function PlanTrip() {
  // select options
  const [trailOptions, setTrailOptions] = useState([]);
  const [checkpointOptions, setCheckpointOptions] = useState([]);

  const [tripPlan, setTripPlan] = useState({
    trailId: "",
    startPoint: "",
    endPoint: "",
    startDate: "",
    endDate: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    additionalNotes: "",
  });

  // error checking
  const [hasEmptyField, setHasEmptyField] = useState(false);
  const [hasInvalidDates, setHasInvalidDates] = useState(false);
  const [hasInvalidPhoneNumber, setHasInvalidPhoneNumber] = useState(false);

  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isUserLoggedIn()) {
      navigateTo("/login");
    }
  }, [navigateTo]);

  // button state
  const isButtonDisabled =
    tripPlan.startDate.trim() === "" ||
    tripPlan.endDate.trim() === "" ||
    tripPlan.trailId.trim() === "" ||
    tripPlan.startPoint === "" ||
    tripPlan.exitPoint === "" ||
    tripPlan.emergencyContactName.trim() === "" ||
    tripPlan.emergencyContactNumber.trim() === "";

  const getTrailOptions = async () => {
    const apiEndPoint = `${apiBase}/sar_dashboard/trails`;
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
    console.log(tripPlan.trailId);
    const apiEndPoint = `${apiBase}/sar_dashboard/trailInfo/${tripPlan.trailId}`;
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
  }, [tripPlan.trailId]);

  const validateTripPlan = () => {
    if (
      tripPlan.trailId === "" ||
      tripPlan.startPoint === "" ||
      tripPlan.endPoint === "" ||
      tripPlan.startDate === "" ||
      tripPlan.endDate === "" ||
      tripPlan.emergencyContactName === "" ||
      tripPlan.emergencyContactNumber === ""
    ) {
      setHasEmptyField(true);
    } else {
      setHasEmptyField(false);
      const isDateRangeValid = validateDateRange(
        tripPlan.startDate,
        tripPlan.endDate
      );
      if (!isDateRangeValid) {
        setHasInvalidDates(true);
      } else {
        setHasInvalidDates(false);
        const isPhoneNumberValid = validatePhoneNumberFormat(
          tripPlan.emergencyContactNumber
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

  // TODO-KT: add additonal notes to server endpoint
  const submitTripPlan = async () => {
    const apiEndpoint = `${apiBase}/hiker_portal/trip_plans`;
    const token = localStorage.getItem("token");
    console.log("trip plan to submit: ", tripPlan);
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          start_date: tripPlan.startDate,
          end_date: tripPlan.endDate,
          trail_id: tripPlan.trailId,
          entry_point: tripPlan.startPoint,
          exit_point: tripPlan.endPoint,
          emergency_contact_name: tripPlan.emergencyContactName,
          emergency_contact_number: tripPlan.emergencyContactNumber,
          additional_notes: tripPlan.additionalNotes,
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

  const handleInputChange = (field) => (value) => {
    setTripPlan((prev) => ({
      ...prev,
      [field]: value,
    }));
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
            onSelect={(selectedId) => {
              handleInputChange("trailId")(selectedId);
            }}
          />
          <div className="two-col-inputs">
            <Dropdown
              label="Start Point:"
              placeholder="Select Start Point"
              options={checkpointOptions}
              onSelect={(selectedId) => {
                handleInputChange("startPoint")(selectedId);
              }}
            />
            <Dropdown
              label="End Point:"
              placeholder="Select End Point"
              options={checkpointOptions}
              onSelect={(selectedId) => {
                handleInputChange("endPoint")(selectedId);
              }}
            />
          </div>
          <div className="two-col-inputs">
            <InputDateTime
              label="Start Date:"
              placeholder="Type Start Date"
              value={tripPlan.startDate}
              onChange={handleInputChange("startDate")}
            />
            <InputDateTime
              label="End Date:"
              placeholder="Type End Date"
              value={tripPlan.endDate}
              onChange={handleInputChange("endDate")}
            />
          </div>
          <InputText
            label="Emergency Contact Name:"
            placeholder="Type Emergency Contact Name"
            value={tripPlan.emergencyContactName}
            onChange={handleInputChange("emergencyContactName")}
          />
          <div>
            <InputText
              label="Emergency Contact Phone Number:"
              placeholder="Type Phone Number"
              value={tripPlan.emergencyContactNumber}
              onChange={handleInputChange("emergencyContactNumber")}
            />
          </div>
          <LongInputText
            label="Additional Notes:"
            placeholder="Type Additional Notes"
            value={tripPlan.additionalNotes}
            onChange={handleInputChange("additionalNotes")}
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
          <SubmissionButton
            handleSubmit={validateTripPlan}
            inactive={isButtonDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default PlanTrip;
