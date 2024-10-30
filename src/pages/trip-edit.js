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
import LongInputText from "../base-components/input-text-long";

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

  // trip plan info
  const [tripPlan, setTripPlan] = useState({
    trailId: "",
    trailName: "",
    startPoint: "",
    startPointName: "",
    endPoint: "",
    endPointName: "",
    startDate: "",
    endDate: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    additionalNotes: "",
    progressLink: "",
    archived: "",
  });

  const [checkpointOptions, setCheckpointOptions] = useState([]);

  // error checking
  const [hasEmptyField, setHasEmptyField] = useState(false);
  const [hasInvalidDates, setHasInvalidDates] = useState(false);
  const [hasInvalidPhoneNumber, setHasInvalidPhoneNumber] = useState(false);

  // button state
  const isButtonDisabled =
    tripPlan.startDate.trim() === "" ||
    tripPlan.endDate.trim() === "" ||
    tripPlan.trailName.trim() === "" ||
    tripPlan.startPoint === "" ||
    tripPlan.endPoint === "" ||
    tripPlan.emergencyContactName.trim() === "" ||
    tripPlan.emergencyContactNumber.trim() === "";

  const handleCancel = () => {
    navigateTo("/trip-summary");
  };

  // TODO-KT: get additional notes text
  const getTripPlan = async () => {
    const apiEndpoint = `http://localhost:3000/hiker_portal/trip_plan/${tripPlanId}`;
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
        console.log("Get trip plan sucessful", data);

        // TODO-KT: add additional notes field
        setTripPlan({
          trailId: data.trail.trail_id,
          trailName: data.trail.trail_name,
          startPoint: data.trail.entry_point,
          startPointName: data.startPointName,
          endPoint: data.trail.exit_point,
          endPointName: data.endPointName,
          startDate: data.trail.start_date,
          endDate: data.trail.end_date,
          emergencyContactName: data.trail.emergency_contact_name,
          emergencyContactNumber: data.trail.emergency_contact_number,
          additionalNotes: "",
          progressLink: data.trail.progress_tracking_link,
          archived: data.trail.archived,
        });
      } else {
        console.log("Failed to get trip plan", response.status);
      }
    } catch (error) {
      console.log("Error during get trip plan", error);
    }
  };

  const handleSave = async () => {
    console.log(tripPlanId);
    const apiEndPoint = `http://localhost:3000/hiker_portal/trip_plan/${tripPlanId}`;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(apiEndPoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          entry_point: tripPlan.startPoint,
          exit_point: tripPlan.endPoint,
          start_date: tripPlan.startDate,
          end_date: tripPlan.endDate,
          emergency_contact_name: tripPlan.emergencyContactName,
          emergency_contact_number: tripPlan.emergencyContactNumber,
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
          handleSave();
        }
      }
    }
  };

  const getTrailCheckpoints = async () => {
    console.log(tripPlan.trailId);
    const apiEndPoint = `http://localhost:3000/sar_dashboard/trailInfo/${tripPlan.trailId}`;
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
    getTripPlan();
    getTrailCheckpoints();
  }, [tripPlan.trailId]);

  const handleInputChange = (field) => (value) => {
    setTripPlan((prev) => ({
      ...prev,
      [field]: value,
    }));
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
                inactive={isButtonDisabled}
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
          <DisplayText label="Trail Name:" value={tripPlan.trailName} />
          <div className="two-col-inputs">
            <Dropdown
              label="Start Point:"
              options={checkpointOptions}
              onSelect={(selectedId) =>
                handleInputChange("startPoint")(selectedId)
              }
              initialOptionValue={tripPlan.startPoint}
            />
            <Dropdown
              label="End Point:"
              options={checkpointOptions}
              onSelect={(selectedId) =>
                handleInputChange("endPoint")(selectedId)
              }
              initialOptionValue={tripPlan.endPoint}
            />
          </div>
          <div className="two-col-inputs">
            <InputDateTime
              label="Start Date:"
              value={formatDateFromDatabase(tripPlan.startDate)}
              onChange={handleInputChange("startDate")}
            />
            <InputDateTime
              label="End Date:"
              value={formatDateFromDatabase(tripPlan.endDate)}
              onChange={handleInputChange("endDate")}
            />
          </div>
          <InputText
            label="Emergency Contact Name:"
            value={tripPlan.emergencyContactName}
            onChange={handleInputChange("emergencyContactName")}
          />
          <div>
            <InputText
              label="Emergency Contact Phone Number:"
              value={tripPlan.emergencyContactNumber}
              onChange={handleInputChange("emergencyContactNumber")}
            />
          </div>
          <LongInputText
            label="Additional Notes:"
            value={tripPlan.additionalNotes}
            onChange={handleInputChange("additionalNotes")}
          />
        </div>
      </div>
    </div>
  );
}

export default EditTrip;
