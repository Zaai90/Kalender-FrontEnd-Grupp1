const welcomeContainer = document.getElementsByClassName("welcomeContainer");
const weekDays = [
  "Måndag",
  "Tisdag",
  "Onsdag",
  "Torsdag",
  "Fredag",
  "Lördag",
  "Söndag",
];

function createRenderDivs() {
  let welcomeDiv = document.querySelector(".welcomeContainer");
  welcomeDiv.appendChild(document.createElement("div")).classList.add("time");
  welcomeDiv.appendChild(document.createElement("div")).classList.add("day");
  welcomeDiv.appendChild(document.createElement("div")).classList.add("date");
}

function populateDivs() {
  const timeDiv = document.querySelector(".time");
  const dayDiv = document.querySelector(".day");
  const dateDiv = document.querySelector(".date");
  timeDiv.innerHTML =
    "Klockan är nu: " +
    (dateNow.getHours() < 10 ? "0" : "") +
    dateNow.getHours() +
    ":" +
    (dateNow.getMinutes() < 10 ? "0" : "") +
    dateNow.getMinutes() +
    ":" +
    (dateNow.getSeconds() < 10 ? "0" : "") +
    dateNow.getSeconds();
  dayDiv.innerHTML = "Dagens dag i veckan: " + weekDays[dateNow.getDay() - 1];
  dateDiv.innerHTML =
    "Dagens datum är den " +
    dateNow.getDate() +
    " " +
    monthNames[dateNow.getMonth()];
}

function renderWelcomeSegment() {
  createRenderDivs();
  setInterval(populateDivs, 1000);
}
