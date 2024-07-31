import React, { useState } from "react";

const Dropdown = ({ label, options, onSelect, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    onSelect(event.target.value);
  };

  return (
    <div className="input-dropdown input-box">
      <label>{label}</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;