import React, { useState } from "react";

function InputText({ label, placeholder, buttonText, onSubmit }) {
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
      <input type="text" placeholder={placeholder} />
    </div>
  );
}

export default InputText;
