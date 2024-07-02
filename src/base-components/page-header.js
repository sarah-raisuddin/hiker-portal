// src/InputComponent.js
import React, { useState } from "react";

function PageHeader({ text }) {
  return (
    <div className="page-header">
      <h1>{text}</h1>
    </div>
  );
}

export default PageHeader;
