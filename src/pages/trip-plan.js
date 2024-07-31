// src/About.js
import React, {useState} from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/input-text";
import PageHeader from "../base-components/page-header";
import InputDateTime from "../base-components/input-datetime";
import Dropdown from "../base-components/input-dropdown";

function PlanTrip() {
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [trail_id, setTrailID] = useState("");
  const [entry_point, setEntryPoint] = useState("");
  const [exit_point, setExitPoint] = useState("");
  const [emergency_contact_name, setContactName] = useState("");
  const [emergency_contact_number, setContactNumber] = useState("");
  const [emergency_contact_email, setContactEmail] = useState("");
  const [rfid_tag_uid, setRfidTagID] = useState("");
  
  // TODO-KT: remove me
  const [user_id, setUserId] = useState("");

  // TODO-KT: hard code some options for now, thinking we should eventually grab this info 
  //          from the database, it would make it more scalable and ensure it is up to date
  //          if trails are added in sar dash
  const trailOptions = ["Juan de Fuca Trail", "Machu Picchu", "West Coast Trail"]

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiEndpoint = "http://localhost:3000/hiker_portal/trip_plans";
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id, start_date, end_date, trail_id, entry_point, exit_point, emergency_contact_name, emergency_contact_number, rfid_tag_uid }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Trip plan creation successful", data);
      } else {
        // Handle errors
        console.log("Trip plan creation failed", response.statusText);
      }
    } catch (error) {
      console.error("Error during trip plan creation:", error);
    }
  };

  return (
    <div className="plan-trip">
      <PageHeader text={"Create a Trip Plan"} />
      <div className="plan-trip-container">
        <div className="plan-trip-body">
        <InputText 
          // TODO-KT: remove me, added here to test api endpoint, need to get user id from server i think
          label="User ID:"
          placeholder="REMOVE ME"
          value={user_id}
          onChange={setUserId}/>
          {/* <Dropdown
            label="Trail Name:"
            placeholder="Select the Trail"
            options={trailOptions}
            onSelect={setTrailID} /> */}
          <InputText 
            label="Trail:"
            placeholder="Type Trail Name"
            value={trail_id}
            onChange={setTrailID} />
          <div className="two-col-inputs">
            <InputText 
              label="Start Point:"
              placeholder="Type Start Point"
              value={entry_point}
              onChange={setEntryPoint}/>
            <InputText 
              label="End Point:" 
              placeholder="Type End Point"
              value={exit_point}
              onChange={setExitPoint} />
          </div>
          <div className="two-col-inputs">
            <InputDateTime 
              label="Start Date:"
              placeholder="Type Start Date"
              value={start_date}
              onChange={setStartDate} />
            <InputDateTime 
              label="End Date:" 
              placeholder="Type End Date" 
              value={end_date}
              onChange={setEndDate} />
          </div>
          <InputText
            label="Emergency Contact Name:"
            placeholder="Type Emergency Contact Name"
            value={emergency_contact_name}
            onChange={setContactName} />
          <div>
            <InputText
              label="Emergency Contact Phone Number:"
              placeholder="Type Phone Number"
              value={emergency_contact_number}
              onChange={setContactNumber} />
            <InputText
              // TODO-KT: need to propogate this field into server code/database, leave blank for now
              label="Emergency Contact Email (optional):"
              placeholder="Type Email"
              value={(emergency_contact_email)}
              onChange={setContactEmail} />
          </div>
          <InputText
            label="Tag Identifier:"
            placeholder="Type Tag Identifier"
            value={rfid_tag_uid}
            onChange={setRfidTagID} />
          <SubmissionButton handleSubmit={handleSubmit}/>
        </div>
      </div>
    </div>
  );
}

export default PlanTrip;
