import React, { useState } from "react";
import "./App.css";
import helpIcon from "./question.png";
import themeIcon from "./darkmode.png";

export default function TopNav(props) {
  return (
    <div className="topnav">
      <h1 className="title">One of These Things</h1>
      <div className="navicons">
        <button type="button" id="theme-button" onClick={props.toggleTheme}>
          <img src={themeIcon}></img>
        </button>
        <button type="button" id="help-button" onClick={props.showModal}>
          <img src={helpIcon}></img>
        </button>
      </div>
    </div>
  );
}
