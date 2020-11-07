import React from "react";
import "../styles/RequestLoader.css";

function RequestLoader() {
  return (
    <div className="lds-ring request-loader center">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default RequestLoader;
