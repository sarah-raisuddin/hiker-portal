import React from "react";
import PageHeader from "../base-components/page-header";
import JuanDeFucaMap from "../images/maps/juandefuca-map.png";
import WestCoastTrailMap1 from "../images/maps/westcoast1-map.png";
import WestCoastTrailMap2 from "../images/maps/westcoast2-map.png";
import GoldenEarsSummitMap from "../images/maps/goldenearssummit-map.png";

function Maps() {
  return (
    <div className="maps">
      <PageHeader text="Trail Checkpoint Maps" />
      <div className="maps-container">
        <div className="maps-body">
          <h2>Juan De Fuca Trail</h2>
          <img src={JuanDeFucaMap} />
          <h2>West Coast Trail</h2>
          <img src={WestCoastTrailMap1} /> <br></br>
          <img src={WestCoastTrailMap2} />
          <h2>Golden Ears Summit Trail</h2>
          <img src={GoldenEarsSummitMap} />
        </div>
      </div>
    </div>
  );
}

export default Maps;
