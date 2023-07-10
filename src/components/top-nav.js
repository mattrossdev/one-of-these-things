import "../App.css";
import themeLight from "../assets/darkmodelight.png";
import themeDark from "../assets/darkmodedark.png";
import helpLight from "../assets/questionlight.png";
import helpDark from "../assets/questiondark.png";

export default function TopNav(props) {
  return (
    <header className="topnav">
      <h1 className="title">One of These Things</h1>
      <span className="navicons">
        <button type="button" id="theme-button" onClick={props.toggleTheme}>
          <img
            src={props.theme === "light" ? themeLight : themeDark}
            alt="Theme toggle"
          ></img>
        </button>
        <button type="button" id="help-button" onClick={props.showModal}>
          <img
            src={props.theme === "light" ? helpLight : helpDark}
            alt="Theme toggle"
          ></img>
        </button>
      </span>
    </header>
  );
}
