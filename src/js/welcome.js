const welcomeContainer = document.getElementsByClassName("welcomeContainer");

function createRenderDivs() {
  let welcomeDiv = document.querySelector(".welcomeContainer");
  const compressedInfo = document.createElement("div");
  compressedInfo.classList.add("compressedInfo");
  welcomeDiv.appendChild(compressedInfo);
}

function populateDiv() {
  const dateInfo = document.querySelector(".dateInfo");
  dateInfo.innerHTML =
    weekDays[
    dateNow.getDay() - 1 < 0 ? 6 : dateNow.getDay() - 1
    ] +
    " " +
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
  let welcomeDiv = document.querySelector(".dailyNames");
  welcomeDiv
    .appendChild(document.createElement("div"))
    .classList.add("holidayInfo");

  const holidayDiv = document.querySelector(".holidayInfo");
  const names = daysArray[dateNow.getDate() - 1].namnsdag;
  if (names.length > 0) {
    holidayDiv.innerHTML =
      "Dagens namn: " + names;
  }
}
