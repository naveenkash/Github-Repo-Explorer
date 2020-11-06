import React from "react";
import "../styles/Button.css";

function Button({ loading, text }) {
  return (
    <button className="btn">
      {loading ? (
        <div className="lds-ring center">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        text
      )}
    </button>
  );
}

export default Button;
