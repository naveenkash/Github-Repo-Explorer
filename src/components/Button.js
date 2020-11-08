import React from "react";
import "../styles/Button.css";
import ButtonLoader from "./ButonLoader";

function Button({ loading, text }) {
  return <button className="btn">{loading ? <ButtonLoader /> : text}</button>;
}

export default Button;
