import React, { useEffect, useState } from "react";

const Dropdown = ({ label, options, onSelect, placeholder, initialOptionValue="" }) => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (event) => {
    console.log("this is the selected option value ", event.target.value);
    setSelectedOption(event.target.value);
    onSelect(event.target.value);
  };

  useEffect(() => {
    if(initialOptionValue) {
      setSelectedOption(initialOptionValue);
    }
  }, [initialOptionValue])

  return (
    <div className="input-dropdown input-box">
      <label>{label}</label>
      <select id="dropdown" value={selectedOption} onChange={handleChange}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;