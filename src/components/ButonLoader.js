import React from "react";
import "../styles/ButtonLoader.css";

function ButtonLoader() {
  return (
    <div className="lds-ring btn-loader">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default ButtonLoader;
