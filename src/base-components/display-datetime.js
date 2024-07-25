import React from "react";

function DisplayDateTime({ label, placeholder, value}) {

  return (
    <div className="input-box">
      <label>{label}</label>
      <input type="datetime-local" placeholder={placeholder} 
             value={value}/>
    </div>
  );
}

export default DisplayDateTime;
