const welcomeContainer = document.getElementsByClassName("welcomeContainer");

function createRenderDivs() {
  let welcomeDiv = document.querySelector(".welcomeContainer");
  welcomeDiv
    .appendChild(document.createElement("div"))
    .classList.add("compressedInfo");
}

function populateDiv() {
  const compressedDiv = document.querySelector(".compressedInfo");
  compressedDiv.innerHTML =
    weekDays[dateNow.getDay() - 1] +
    " " +
    "den " +
    dateNow.getDate() +
    " " +
    monthNames[dateNow.getMonth()] +
    " " +
    (dateNow.getHours() < 10 ? "0" : "") +
    dateNow.getHours() +
    ":" +
    (dateNow.getMinutes() < 10 ? "0" : "") +
    dateNow.getMinutes() +
    ":" +
    (dateNow.getSeconds() < 10 ? "0" : "") +
    dateNow.getSeconds();
}

function renderWelcomeSegment() {
  createRenderDivs();
  populateDiv();
  setInterval(populateDiv, 1000);
  fetchMonthInfo(dateNow).then(renderSpecialDayInfo);
}

function renderSpecialDayInfo(res) {
  const daysArray = res;
  console.log(daysArray);
  let welcomeDiv = document.querySelector(".welcomeContainer");
  welcomeDiv
    .appendChild(document.createElement("div"))
    .classList.add("holidayInfo");
  const testDiv = document.querySelector(".holidayInfo");
  testDiv.innerHTML = "Dagens namn: " + daysArray[dateNow.getDate()].namnsdag;
}
