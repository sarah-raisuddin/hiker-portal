import React, { useState, useEffect } from "react";
import SubmissionButton from "../base-components/button";
import InputText from "../base-components/inputs/input-text";
import PageHeader from "../base-components/page-header";
import { fetchProgress, fetchTrail, fetchUserInfo } from "../api";
import { formatDate } from "../util";
import { useLocation } from "react-router-dom";
import toggleArrow from "../images/toggle-arrow.png";
import InputErrorMessage from "../base-components/inputs/input-error-message";
import apiBase from "../requests/base";
import LoadingSpinner from "../base-components/loading-spinner";

const TripProgress = () => {
  const [activeCheckpoint, setActiveCheckpoint] = useState(null);
  const [trailData, setTrailData] = useState(null);
  const [progressData, setProgressData] = useState({});
  const [emergency_contact_email, setEmail] = useState("");

  const location = useLocation();
  const [width, setWidth] = useState(window.innerWidth);

  const submitEmail = async (tripPlanId) => {
    const apiEndpoint = `http://localhost:3000/hiker_portal/add_emergency_contact/${tripPlanId}`;
    try {
      const response = await fetch(apiEndpoint, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Correctly specify content type
        },
        body: JSON.stringify({
          emergency_contact_email, // Properly stringify the object
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
      } else {
        console.error("Failed to submit email, status:", response.status);
      }
    } catch (error) {
      console.error("Error during email submission:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const uid = queryParams.get("uid");

      if (uid) {
        const progressResult = await fetchProgress({ uid });

        const result = await fetchTrail({
          trailId: progressResult.tripPlan.trail_id,
        });

        console.log(progressResult);
        setProgressData(progressResult);
        setTrailData(result);
      }
    };

    fetchData();

    // refresh every one minutes
    const intervalId = setInterval(fetchData, 1 * 30 * 1000);

    return () => clearInterval(intervalId);
  }, [location.search]);

  if (!trailData || !progressData) {
    return <LoadingSpinner />;
  }

  const checkpoints = trailData.checkpoints || [];
  const tripPlan = progressData.tripPlan || {};
  const checkpointEntries = progressData.checkpointEntries || [];

  const getCheckpointName = (checkpointId) => {
    return (
      checkpoints.find((checkpoint) => checkpoint.id === checkpointId) || null
    ).name;
  };

  const getProgressEntries = (pole_id) => {
    return checkpointEntries.filter((entry) => entry.pole_id === pole_id);
  };

  const getCheckpointVisited = (checkpointId) => {
    return checkpointEntries.some((entry) => entry.pole_id === checkpointId);
  };

  const TripProgressViewDesktop = ({ checkpoints }) => {
    return (
      <div className="trip-progress-view">
        <span className="progress-line" />
        {checkpoints.map((checkpoint, index) => (
          <React.Fragment key={index}>
            <ProgressCircle
              progress={getCheckpointVisited(checkpoint.pole_id)}
              label={checkpoint.name}
              active={activeCheckpoint === checkpoint}
              onClick={() => setActiveCheckpoint(checkpoint)}
            />
          </React.Fragment>
        ))}
      </div>
    );
  };

  const TripProgressViewMobile = ({ checkpoints }) => {
    return (
      <div class="trip-progress-mobile">
        {checkpoints.map((checkpoint, index) => (
          <div class="checkpoint">
            <div class="checkpoint-item">
              <ProgressCircleMobile
                progress={getCheckpointVisited(checkpoint.pole_id)}
                label={checkpoint.name}
                active={activeCheckpoint === checkpoint}
                onClick={() => setActiveCheckpoint(checkpoint)}
              />
            </div>
            {activeCheckpoint === checkpoint ? <CheckinTableMobile /> : ""}
          </div>
        ))}
      </div>
    );
  };

  const OverviewTable = ({ tripPlan }) => {
    return (
      <div className="trip-progress-overview">
        <div className="col">
          <FormattedKeyValue
            keyText={"Trail Name"}
            valueText={trailData.trail.name}
          />
        </div>
        <div className="col">
          <FormattedKeyValue
            keyText={"Start Date"}
            valueText={formatDate(tripPlan.start_date).date}
          />
          <FormattedKeyValue
            keyText={"Entry Point"}
            valueText={getCheckpointName(tripPlan.entry_point)}
          />
        </div>
        <div className="col">
          <FormattedKeyValue
            keyText={"Expected End Date"}
            valueText={formatDate(tripPlan.end_date).date}
          />
          <FormattedKeyValue
            keyText={"Exit Point"}
            valueText={getCheckpointName(tripPlan.exit_point)}
          />
        </div>
        <FormattedKeyValue
          keyText={"Additional Notes"}
          valueText={tripPlan.additional_notes}
        />
      </div>
    );
  };

  const FormattedKeyValue = ({ keyText, valueText }) => {
    return (
      <p>
        <b>{keyText}: </b> {valueText}
      </p>
    );
  };

  const ProgressCircle = ({ progress, label, active, onClick }) => {
    return (
      <div className="circle-container" onClick={onClick}>
        <p className="circle-label">{label}</p>
        <div className={`circle ${progress ? "filled" : "empty"}`} />
        {active && <div className="triangle" />}
      </div>
    );
  };

  const ProgressCircleMobile = ({ progress, label, active, onClick }) => {
    return (
      <>
        <div className="circle-container" onClick={onClick}>
          <div className={`circle ${progress ? "filled" : "empty"}`} />
          {active && <div className="triangle" />}
        </div>
        <p className="circle-label">{label}</p>
        <img
          src={toggleArrow}
          onClick={onClick}
          style={{
            transform: active ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        />
      </>
    );
  };

  const CheckinDetails = () => {
    return (
      <div className="checkin-details">
        <p className="checkin-details title">{checkinDetailsTitle}</p>
        <p className="checkin-details subtitle">Recent check-ins:</p>
        <CheckinTable />
      </div>
    );
  };

  const checkinDetailsTitle = activeCheckpoint
    ? `${activeCheckpoint.name} (${activeCheckpoint.latitude}, ${activeCheckpoint.longitude})`
    : "";

  const checkinDetailsTitleMobile = activeCheckpoint ? (
    <p>
      <strong>
        <u>Coordinates:</u>
      </strong>{" "}
      ({activeCheckpoint.latitude.slice(0, 6)},{" "}
      {activeCheckpoint.longitude.slice(0, 6)})
    </p>
  ) : (
    ""
  );

  const CheckinTable = () => {
    const data = getProgressEntries(activeCheckpoint.pole_id) || [];
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{formatDate(row.time).date}</td>
              <td>{formatDate(row.time).time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const CheckinTableMobile = () => {
    const data = getProgressEntries(activeCheckpoint.pole_id) || [];
    return (
      <div class="checkin-details-mobile">
        <p className="title">{checkinDetailsTitleMobile}</p>
        {data.length === 0 ? (
          <p>No data to show</p>
        ) : (
          <li>
            {data.map((row) => (
              <ul>
                {formatDate(row.time).date}, {formatDate(row.time).time}
              </ul>
            ))}
          </li>
        )}
      </div>
    );
  };

  return (
    <div className="trip-progress">
      <PageHeader text={`${tripPlan.first_name}'s Progress`} />

      <OverviewTable tripPlan={tripPlan} />
      {trailData.trail.id === 13 && (
        <InputErrorMessage
          message={
            "Checkpoint Status Alert: The Left Bridge checkpoint is currently experiencing a temporary disruption and may not be broadcasting hiker progress. "
          }
        />
      )}
      <h2>Click on a checkpoint for more info</h2>
      {width > 640 ? (
        <>
          <TripProgressViewDesktop checkpoints={checkpoints} />
          {activeCheckpoint && <CheckinDetails />}
        </>
      ) : (
        <>
          <TripProgressViewMobile checkpoints={checkpoints} />
        </>
      )}
      <div className="trip-progress-container">
        <div className="trip-progress-body"></div>
        <div className="trip-progress-footer">
          <div>
            <label>Sign up for email alerts</label>
            {/* <input style={{ width: "100%" }} type="text" onChange={() => setEmail(this.value)}/> */}
            <InputText
              placeholder={"email"}
              value={emergency_contact_email}
              onChange={setEmail}
            />
          </div>
          <SubmissionButton
            text={"Submit Email"}
            handleSubmit={() => submitEmail(tripPlan.id)}
          />
        </div>
      </div>
    </div>
  );
};

export default TripProgress;
