import React, { useState } from "react";

function InputDateTime({ label, placeholder, buttonText, onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
  };

  return (
    <div className="input-box">
      <label>{label}</label>
      <input type="datetime-local" placeholder={placeholder} />
    </div>
  );
}

export default InputDateTime;
