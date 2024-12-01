import React, { useState } from "react";
import helpIcon from "../../images/icons/help-icon.png";
import closeHelpIcon from "../../images/icons/minimize-icon.png";
import InputInfoMessage from "./input-info-message";

function InputHelpText({
  label,
  placeholder,
  value,
  onChange,
  helpDescription,
}) {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  const [isHelpShown, setIsHelpShown] = useState(false);

  const handleToggle = () => {
    setIsHelpShown(!isHelpShown);
  };

  return (
    <div className="input-box help">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <img
        className="help-icon"
        src={isHelpShown ? closeHelpIcon : helpIcon}
        onClick={handleToggle}
      />
      {isHelpShown && <InputInfoMessage message={helpDescription} />}
    </div>
  );
}

export default InputHelpText;
