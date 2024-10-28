import React from "react";

function Checkbox({ label, isChecked, handleCheck }) {
  return (
    <label className="checkbox-container">
      <input type="checkbox" checked={isChecked} onChange={handleCheck} />
      <p>{label}</p>
    </label>
  );
}

export default Checkbox;
