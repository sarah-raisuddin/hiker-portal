import React, { useState, useRef, useEffect } from "react";

// Sources used: https://react.dev/reference/react-dom/components/textarea
function LongInputText({ label, placeholder, value, onChange }) {
  const textareaRef = useRef(null);

  // Adjust height of text box dynamically
  const adjustHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  useEffect(() => {
    adjustHeight();
  }, [value]);

  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <div className="input-box">
      <label>{label}</label>
      <textarea
        ref={textareaRef}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        // initial row height is one
        rows={1}
        style={{
          resize: "none",
        }}
      />
    </div>
  );
}

export default LongInputText;
