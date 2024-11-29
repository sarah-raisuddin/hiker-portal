import React from "react";

function DisplayDateTime({ label, value }) {
  return (
    <div className="input-box">
      <label>{label}</label>
      <input type="datetime-local" value={value} />
    </div>
  );
}

export default DisplayDateTime;
