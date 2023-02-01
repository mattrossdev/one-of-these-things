var tens = 0;
var seconds = 0;
var Interval;

const timer = () => {
  tens++;
  if (tens <= 9) {
    document.getElementById("tens").innerHTML = "0" + tens;
  }
  if (tens > 9) {
    document.getElementById("tens").innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    document.getElementById("seconds").innerHTML = "0" + seconds + ":";
    tens = 0;
  }
  if (seconds > 9) {
    document.getElementById("seconds").innerHTML = seconds + ":";
  }
};

export const startTimer = () => {
  clearInterval(Interval);
  Interval = setInterval(timer, 10);
};

export const stopTimer = () => {
  clearInterval(Interval);
};

export const resetTimer = () => {
  clearInterval(Interval);
  tens = 0;
  seconds = 0;
  document.getElementById("tens").innerHTML = "00";
  document.getElementById("seconds").innerHTML = "0" + seconds + ":";
};

export const returnTime = () => {
  return seconds + "." + tens +  " seconds"
};
