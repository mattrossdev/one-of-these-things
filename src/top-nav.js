import React, { useState } from "react";
import "./App.css";
import helpIcon from "./question.png";

export default function TopNav(props) {
  return (
    <div className="topnav">
      <h1 className="title">One of These Things</h1>
      <button type="button" id="help-button" onClick={props.showModal}>
        <img src={helpIcon}></img>
      </button>
    </div>
  );
}
