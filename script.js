const timeRef = document.getElementById('time');
const dateRef = document.getElementById('date');
const responseRef = document.getElementById('response');
const buttonRef = document.getElementById('action-btn');

let running = false;
let timerIntervalId;

let currentDate;

const startGame = () => {
  const date = generateRandomDate();
  dateRef.innerHTML = formatDate(date);

  currentDate = date;
  startTimer();
}

const startTimer = () => {
  const startTime = Date.now();

  timerIntervalId = setInterval(() => {
    timeRef.innerHTML = formatTime(Date.now() - startTime);
  }, 1);
}

const stopTimer = () => {
  clearInterval(timerIntervalId);
}

buttonRef.addEventListener('click', () => {
  if (running) {
    stopTimer();
    running = false;
    buttonRef.innerText = "Start";

    const { d, m, y } = currentDate;
    responseRef.innerHTML = new Date(`${y}/${m}/${d}`).toDateString();
  } else {
    startGame();
    running = true;
    buttonRef.innerText = "Stop";
  }
});

const formatTime = (time) => {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor(time / 1000) - minutes * 60;
  const millis = time % 1000;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedMillis = millis.toString().padStart(3, "0");

  return `${formattedMinutes}:${formattedSeconds}.${formattedMillis}`;
}

const formatDate = ({ d, m, y }) => {
  return `${(d+'').padStart(2, "0")}/${(m+'').padStart(2, "0")}/${(y+'').padStart(4, "0")}`
}

const generateRandomDate = () => {
  const year = Math.floor(Math.random() * 700 + 1700);
  const month = Math.ceil(Math.random() * 12);

  const leapYear = (year % 4 == 0 && Math.floor(year % 100) != 0) || year % 400 == 0;
  
  let daysSpan = 28;
  if (month == 2) {
    if (leapYear) {
      daysSpan += 1;
    }
  } else if (month <= 7) {
    if (month % 2 == 0) {
      daysSpan += 2;
    } else {
      daysSpan += 3;
    }
  } else {
    if (month % 2 == 0) {
      daysSpan += 3;
    } else {
      daysSpan += 2;
    }
  }
  
  const day = Math.ceil(Math.random() * daysSpan);

  return { d: day, m: month, y: year };
}