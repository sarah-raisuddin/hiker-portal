import React, { useState } from "react";
import openEye from "../../images/icons/eye-open.png";
import closedEye from "../../images/icons/eye-closed.png";

function InputPassword({ label, placeholder, value, onChange }) {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  const handleVisibilityChange = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  const [isPasswordShown, setIsPasswordShown] = useState(false);

  return (
    <div className="input-box password">
      <label>{label}</label>
      <input
        type={isPasswordShown ? "text" : "password"}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <img
        className="visibility-icon"
        src={isPasswordShown ? openEye : closedEye}
        onClick={handleVisibilityChange}
      />
    </div>
  );
}

export default InputPassword;
