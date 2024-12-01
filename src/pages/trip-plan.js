// src/About.js
import React, { useState, useEffect } from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/inputs/input-text";
import PageHeader from "../base-components/page-header";
import InputDateTime from "../base-components/inputs/input-datetime";
import Dropdown from "../base-components/inputs/input-dropdown";
import { useNavigate } from "react-router-dom";
import BackToDashboard from "../base-components/back-to-dashboard";
import {
  validateDateRange,
  validatePhoneNumberFormat,
  validateDates,
  checkOverlappingTrips,
} from "../util";
import InputErrorMessage from "../base-components/inputs/input-error-message";
import LongInputText from "../base-components/inputs/input-text-long";
import { isUserLoggedIn } from "../util";

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

  const [overlappingDates, setOverlappingDates] = useState(false);
  const [tripPlans, setTripPlans] = useState(null);

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
    const apiEndPoint =
      "https://trekcheck-server.azurewebsites.net/sar_dashboard/trails";
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
    const apiEndPoint = `https://trekcheck-server.azurewebsites.net/sar_dashboard/trailInfo/${tripPlan.trailId}`;
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

  const getTripPlans = async () => {
    const apiEndpoint = `https://trekcheck-server.azurewebsites.net/hiker_portal/trip_plans`;
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
        console.log("Get trip plans sucessful", data);
        setTripPlans(data.trails);
      } else {
        console.log("Failed to get trip plans", response.status);
      }
    } catch (error) {
      console.log("Error during get trip plans", error);
    }
  };

  useEffect(() => {
    getTrailOptions();
    getTripPlans();
  }, []);

  useEffect(() => {
    getTrailCheckpoints();
  }, [tripPlan.trailId]);

  // Helper Functions
  const hasEmptyFields = (tripPlan) => {
    const requiredFields = [
      "trailId",
      "startPoint",
      "endPoint",
      "startDate",
      "endDate",
      "emergencyContactName",
      "emergencyContactNumber",
    ];
    return requiredFields.some((field) => tripPlan[field] === "");
  };

  const isValidDateRange = (startDate, endDate) => {
    return validateDateRange(startDate, endDate) && validateDates(endDate);
  };

  const isValidPhoneNumber = (phoneNumber) => {
    return validatePhoneNumberFormat(phoneNumber);
  };

  const validateTripPlan = () => {
    if (hasEmptyFields(tripPlan)) {
      setHasEmptyField(true);
      return;
    }

    setHasEmptyField(false);

    if (!isValidDateRange(tripPlan.startDate, tripPlan.endDate)) {
      setHasInvalidDates(true);
      return;
    }

    setHasInvalidDates(false);

    if (!isValidPhoneNumber(tripPlan.emergencyContactNumber)) {
      setHasInvalidPhoneNumber(true);
      return;
    }
    if (checkOverlappingTrips(tripPlans, tripPlan)) {
      setOverlappingDates(true);
      return;
    }

    setHasInvalidPhoneNumber(false);
    submitTripPlan();
  };

  // TODO-KT: add additonal notes to server endpoint
  const submitTripPlan = async () => {
    const apiEndpoint =
      "https://trekcheck-server.azurewebsites.net/hiker_portal/trip_plans";
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
            <InputErrorMessage message={"Invalid date range."} />
          )}
          {hasInvalidPhoneNumber && (
            <InputErrorMessage
              message={"Invalid phone number. Please try again."}
            />
          )}
          {overlappingDates && (
            <InputErrorMessage
              message={
                "Trip plan for this trail within these dates already exists"
              }
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
