import { useState, useEffect } from "react";
import { animalNames } from "./data.js";
import { shuffle } from "./utils.js";
import { useIsMount } from "./utils.js";
import { startTimer, stopTimer, resetTimer, returnTime } from "./stopwatch.js";
import TopNav from "./top-nav.js";
import HelpModal from "./help-modal.js";
import WinModal from "./win-modal.js";
import "./App.css";

function App() {
  //Hooks
  const isMount = useIsMount();

  //Styling state
  const [theme, setTheme] = useState("light");

  //Game state
  const [showHelpModal, setShowHelpModal] = useState(true);
  const [gameCount, setGameCount] = useState(1);
  const [imageLinks, setImageLinks] = useState([]);
  const [numberLoadedImages, setNumberLoadedImages] = useState(0);
  const [gameReady, setGameReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameTime, setGameTime] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [animalNamePair, setAnimalNamePair] = useState({
    first: "",
    second: "",
  });
  const [target, setTarget] = useState("");

  const handleHelpModalShow = () => {
    setShowHelpModal(true);
  };

  const handleHelpModalHide = () => {
    setShowHelpModal(false);
  };

  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleHelpModalHide();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const getNames = () => {
    const getRandomAnimal = () => {
      return animalNames[Math.floor(Math.random() * animalNames.length)];
    };
    var animal1 = getRandomAnimal();

    var getMinorityAnimal = () => {
      var animal2 = getRandomAnimal();
      while (animal1 === animal2) {
        animal2 = getMinorityAnimal();
      }
      return animal2;
    };

    getMinorityAnimal();
    setAnimalNamePair({ first: animal1, second: getMinorityAnimal() });
  };

  const fetchRequest = async () => {
    var imageArray = [];
    var majorityAnimalRequest = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${
        animalNamePair.first
      }&orientation=landscape&client_id=${"HSHyd3uB_pmCjDlMXp7ZN4d5Jd-DtI8vEN-jBopzTPE"}&per_page=10`
    );
    var majorityAnimalRequestJ = await majorityAnimalRequest.json();
    var majorityAnimalResult = await majorityAnimalRequestJ.results;

    if (majorityAnimalResult.length < 5) {
      alert("Error fetching data, please refresh the page");
    } else {
      for (let i = 0; i < 5; i++) {
        imageArray.push(majorityAnimalResult[i].urls.regular);
      }
    }

    var minorityAnimalRequest = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${
        animalNamePair.second
      }&orientation=landscape&client_id=${"HSHyd3uB_pmCjDlMXp7ZN4d5Jd-DtI8vEN-jBopzTPE"}&per_page=10`
    );
    var minorityAnimalRequestJ = await minorityAnimalRequest.json();
    var minorityAnimalResult = await minorityAnimalRequestJ.results;
    var minorityAnimalImageLink = minorityAnimalResult[0].urls.regular;

    if (minorityAnimalResult === null) {
      alert("Error fetching data, please refresh the page");
    } else {
      imageArray.push(minorityAnimalImageLink);
      console.log(imageArray);
      setTarget(minorityAnimalImageLink);
      shuffle(imageArray);
      setImageLinks(imageArray);
    }
  };

  useEffect(() => {
    getNames();
  }, []);

  useEffect(() => {
    if (!isMount) {
      fetchRequest();
    }
  }, [animalNamePair]);

  useEffect(() => {
    if (numberLoadedImages === 6) {
      setGameReady(true);
    }
  }, [numberLoadedImages]);

  useEffect(() => {
    if (gameCount > 3) {
      setGameWon(true);
      setGameCount(1);
      setGameTime(returnTime());
      resetTimer();
    }
  }, [gameCount]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const startGame = () => {
    setGameReady(false);
    setGameWon(false);
    setIsPlaying(true);
    setNumberLoadedImages(0);
    startTimer();
  };

  const determineSuccess = (e) => {
    stopTimer();
    setIsPlaying(false);
    if (e.target.src === target) {
      setGameCount(gameCount + 1);
    } else {
      setGameCount(1);
      alert("incorrect");
      resetTimer();
    }
    getNames();
  };

  const handleImageLoad = () => {
    setNumberLoadedImages(
      (prevNumberLoadedImages) => prevNumberLoadedImages + 1
    );
  };

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className="app">
      <TopNav
        showModal={handleHelpModalShow}
        toggleTheme={toggleTheme}
        theme={theme}
      />
      <HelpModal show={showHelpModal} handleClose={handleHelpModalHide} />
      {gameWon && <WinModal time={gameTime} />}
      <div className="component">
        <div id="gameText">
          <div id="gameCounter">Level {gameCount} / 3</div>
          <button className="button" onClick={startGame} disabled={!gameReady}>
            {" "}
            Ready{" "}
          </button>
        </div>
        <div id="timer">
          <span id="seconds">00:</span>
          <span id="tens">00</span>
        </div>
        <br></br>
        <div id="image-grid">
          <div className="container" style={{ maxWidth: "800px" }}>
            <div className="row no-gutters">
              {imageLinks.map((link, index) => (
                <div key={index} className="col-6 px-0">
                  <div
                    className={`max-height-200-wrapper" ${
                      isPlaying ? "" : "d-none"
                    }`}
                  >
                    <img
                      src={link}
                      className="img-fluid"
                      onClick={determineSuccess}
                      onLoad={handleImageLoad}
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
