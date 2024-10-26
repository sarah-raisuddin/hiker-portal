import React, { useRef, useEffect } from "react";

function DisplayLongText({ label, value, onClick }) {
  return (
    <div onClick={onClick} className="input-box">
      <label>{label}</label>
      <textarea
        value={value}
        readOnly
        style={{
          resize: "none",
          height: "auto",
        }}
      />
    </div>
  );
}

export default DisplayLongText;
