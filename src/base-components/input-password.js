import React, { useState } from "react";

function InputPassword({ label, placeholder, value, onChange }) {

  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="input-box">
      <label>{label}</label>
      <input 
        type="password"
        value={value}
        placeholder={placeholder} 
        onChange={handleInputChange} />
    </div>
  );
}

export default InputPassword;
