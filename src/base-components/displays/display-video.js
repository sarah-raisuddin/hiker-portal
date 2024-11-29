import React from "react";

function DisplayVideo({ src, displayImage }) {
  const controls = true;
  const width = "100%";

  return (
    <div className="video-container">
      <video
        width={width}
        controls={controls}
        poster={displayImage}
        src={src}
        type="video/mp4"
      />
    </div>
  );
}

export default DisplayVideo;
