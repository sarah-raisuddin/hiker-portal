import React, { useState } from "react";

function InputDateTime({ label, placeholder, value, onChange }) {

  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="input-box">
      <label>{label}</label>
      <input 
        type="datetime-local"
        value={value}
        placeholder={placeholder} 
        onChange={handleInputChange} />
    </div>
  );
}

export default InputDateTime;
