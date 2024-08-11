import React from "react";

function DisplayText({ label, value, onClick }) {
  return (
    <div onClick={onClick} className="input-box">
      <label>{label}</label>
      <input type="text" value={value} readOnly />
    </div>
  );
}

export default DisplayText;
