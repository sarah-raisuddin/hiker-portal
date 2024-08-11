import React, { useState } from "react";
import SubmissionButton from "../base-components/button";
import PageHeader from "../base-components/page-header";
import { fetchProgress, fetchTrail } from "../api";
import { useEffect } from "react";
import { formatDate } from "../util";
import { useLocation } from "react-router-dom";

const TripProgress = () => {
  const [activeCheckpoint, setActiveCheckpoint] = useState(null);
  const [trailData, setTrailData] = useState(null);
  const [progressData, setProgressData] = useState({});

  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(location.search);
      const uid = queryParams.get("uid");

      if (uid) {
        const progressResult = await fetchProgress({ uid });
        const result = await fetchTrail({
          trailId: progressResult.tripPlan.trail_id,
        });
        setProgressData(progressResult);
        setTrailData(result);
      }
    };
    fetchData();
  }, [location.search]);

  console.log(trailData);
  console.log(progressData);
  if (!trailData || !progressData) {
    return <div>Loading...</div>;
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

  const TripProgressView = ({ checkpoints }) => {
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

  return (
    <div className="trip-progress">
      <PageHeader text={`${tripPlan.emergency_contact_name}'s Progress`} />
      <OverviewTable tripPlan={tripPlan} />
      <h2>Click on a checkpoint for more info</h2>
      <TripProgressView checkpoints={checkpoints} />
      {activeCheckpoint && <CheckinDetails />}
      <div className="trip-progress-container">
        <div className="trip-progress-body"></div>
        <div className="trip-progress-footer">
          <div>
            <label>Sign up for email alerts</label>
            <input type="text" />
          </div>
          <SubmissionButton />
        </div>
      </div>
    </div>
  );
};

export default TripProgress;
