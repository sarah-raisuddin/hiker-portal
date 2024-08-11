import React, { useEffect, useState } from "react";
import PageHeader from "../base-components/page-header";
import DisplayText from "../base-components/display-text";
import SubmissionButton from "../base-components/button";
import save from "../images/button-save.png";
import cancel from "../images/button-close.png"
import { useNavigate } from "react-router-dom";
import InputText from "../base-components/input-text";
import Dropdown from "../base-components/input-dropdown";
import InputDateTime from "../base-components/input-datetime";
import {formatDateFromDatabase} from "../util";

function EditTrip() {

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

  const [checkpointOptions, setCheckpointOptions] = useState([]);

  // navigation
  const navigateTo = useNavigate();

  const handleCancel = () => {
    navigateTo("/trip-summary");
  }

  const getTripPlan = async () => {
    const apiEndPoint = `http://localhost:3000/hiker_portal/trip_plan/${userId}/${tripPlanId}`;
    try {
      const response = await fetch(apiEndPoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }, 
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Get trip plan successful", data);
        // TODO-KT: this is very messy, should clean up
        setStartDate(data.trail.start_date);
        setEndDate(data.trail.end_date);
        setTrailID(data.trail.trail_id);
        setEntryPoint(data.trail.entry_point);
        setExitPoint(data.trail.exit_point);
        setRfidTagID(data.trail.rfid_tag_uid);
        setTrailName(data.trail.trail_name);
        setContactName(data.trail.emergency_contact_name);
        setContactNumber(data.trail.emergency_contact_number);
      }
      else {
        console.log("Error getting checkpoint names", response.status);
      }
    }
    catch (error) {
      console.log("Error getting checkpoint names", error);
    }
  }

  const getTrailCheckpoints = async() => {
    console.log(trail_id);
    const apiEndPoint = `http://localhost:3000/sar_dashboard/trailInfo/${trail_id}`;
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
      }
      else {
        console.log("Error getting checkpoint options", response.status);
      }
    }
    catch (error) {
      console.log("Error getting checkpoint options", error);
    }
  };

  const handleSave = async () => {

    const apiEndPoint = `http://localhost:3000/hiker_portal/trip_plan/${userId}/${tripPlanId}`;
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
          rfid_tag_uid: rfid_tag_uid})
      });
    
      if (response.ok) {
        const data = await response.json();
        console.log("Update trip plan sucessful", data);
        navigateTo("/trip-summary");
      }
      else {
        console.log("Failed to update trip plan", response.status);
      }
    }
    catch (error) {
      console.log("Error during update trip plan", error);
    }
  };


  useEffect(() => {
    getTripPlan();
  }, []);

  useEffect(() => {
    getTrailCheckpoints();
  }, [trail_id])

  return (
    <div className="trip-edit">
      <PageHeader text={"Edit Trip Plan"} />
       <div className="trip-edit-container">
         <div className="trip-edit-body">
            <div className="controls">
              <div className="controls-save">
                <SubmissionButton text="Save" handleSubmit={handleSave} specialIcon={save}></SubmissionButton>
              </div>
              <div className="controls-cancel">
                <SubmissionButton text="Cancel" handleSubmit={handleCancel} specialIcon={cancel}></SubmissionButton>
              </div>
            </div>
          <DisplayText
            label="Trail Name:"
            value={trail_name} />
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
              initialOptionValue={exit_point} />
          </div>
          <div className="two-col-inputs">
            <InputDateTime 
              label="Start Date:" 
              value={formatDateFromDatabase(start_date)} 
              onChange={setStartDate}/>
            <InputDateTime 
              label="End Date:" 
              value={formatDateFromDatabase(end_date)} 
              onChange={setEndDate}/>
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
            {/* <DisplayText
              label="Emergency Contact Email (optional):"
              value={tripPlan.emergency_contact_email} 
            /> */}
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