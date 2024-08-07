import React from "react";

function DisplayText({ label, placeholder, value}) {

  return (
    <div className="input-box">
      <label>{label}</label>
      <input type="text" placeholder={placeholder} 
             value={value}/>
    </div>
  );
}

export default DisplayText;
