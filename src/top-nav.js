import React, { useState } from "react";
import "./App.css";
import themeLight from "./darkmodelight.png";
import themeDark from "./darkmodedark.png";
import helpLight from "./questionlight.png";
import helpDark from "./questiondark.png";

export default function TopNav(props) {
  return (
    <header className="topnav">
      <h1 className="title">One of These Things</h1>
      <span className="navicons">
        <button type="button" id="theme-button" onClick={props.toggleTheme}>
          <img src={props.theme === "light" ? themeLight : themeDark}></img>
        </button>
        <button type="button" id="help-button" onClick={props.showModal}>
          <img src={props.theme === "light" ? helpLight : helpDark}></img>
        </button>
      </span>
    </header>
  );
}
