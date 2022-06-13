const calendarContainer =
  document.getElementsByClassName("calendarContainer")[0];
const monthNames = [
  "Januari",
  "Februari",
  "Mars",
  "April",
  "Maj",
  "Juni",
  "Juli",
  "Augusti",
  "September",
  "Oktober",
  "November",
  "December",
];
let dateNow = new Date();
let selected;

let currentCalendarDate = {
  day: dateNow.getDate(),
  month: dateNow.getMonth(),
  year: dateNow.getFullYear(),
};

function addCalenderHeader() {
  let header = document.querySelector(".calendarHeader");
  header
    .appendChild(document.createElement("div"))
    .classList.add("calendarHeaderYear");
  header
    .appendChild(document.createElement("div"))
    .classList.add("calendarHeaderMonth");
}

function renderHeader(year, month) {
  const yearDiv = document.querySelector(".calendarHeaderYear");
  const monthDiv = document.querySelector(".calendarHeaderMonth");
  yearDiv.innerHTML = year;
  monthDiv.innerHTML = monthNames[month];
}

function renderCalendar(year, month) {
  renderHeader(year, month);

  let firstDay = new Date(year, month);
  let weekday = firstDay.getDay() === 0 ? 0 : firstDay.getDay() - 1;
  let lastDay = new Date(year, month + 1, 0);
  let lastDayOfMonth = lastDay.getDate();

  //Previous month
  for (let i = 0; i < weekday; i++) {
    let date = new Date(year, month, i - weekday + 1);
    createCalenderDay(i, date, previous, false);
  }

  //Current Month
  for (let i = 0; i < lastDayOfMonth; i++) {
    let date = new Date(year, month, firstDay.getDate() + i);
    createCalenderDay(i + weekday, date, toggleSelected, true);
  }

  //Next month
  for (let i = lastDayOfMonth + weekday; i < 42; i++) {
    let date = new Date(year, month + 1, i - lastDayOfMonth + 1 - weekday);
    createCalenderDay(i, date, next, false);
  }
}

function createCalenderDay(index, date, eventFunction, isCurrentMonth) {
  calendarContainer
    .appendChild(document.createElement("div"))
    .classList.add("calendarDay");
  const calendarDay = document.querySelectorAll(".calendarDay")[index];

  date.toDateString() === dateNow.toDateString() && isCurrentMonth
    ? calendarDay.classList.add("highlighted")
    : null;
  calendarDay.classList.add(isCurrentMonth ? "current" : "faded");
  calendarDay.id = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}${isCurrentMonth ? "" : ""}`;

  calendarDay.appendChild(document.createElement("p")).classList +=
    "calendarDayNumber";
  calendarDay.getElementsByTagName("p")[0].innerHTML = date.getDate();
  calendarDay.addEventListener("click", eventFunction);
}

function toggleSelected() {
  const target = this;
  const sameDay = target === selected;
  if (selected) {
    selected.classList.remove("selected");
    selected = undefined;
  }
  if (!sameDay) {
    target.classList.add("selected");
    selected = target;
  }
}

function next() {
  currentCalendarDate.year =
    currentCalendarDate.month === 11
      ? currentCalendarDate.year + 1
      : currentCalendarDate.year;
  currentCalendarDate.month = (currentCalendarDate.month + 1) % 12;

  resetCalendar(currentCalendarDate.year, currentCalendarDate.month);
}

function previous() {
  currentCalendarDate.year =
    currentCalendarDate.month === 0
      ? currentCalendarDate.year - 1
      : currentCalendarDate.year;
  currentCalendarDate.month =
    currentCalendarDate.month === 0 ? 11 : currentCalendarDate.month - 1;

  resetCalendar(currentCalendarDate.year, currentCalendarDate.month);
}

function resetCalendar(year, month) {
  let calendarDays = document.getElementsByClassName("calendarDay");
  while (calendarDays.length > 0) {
    calendarDays[0].remove();
  }
  renderCalendar(year, month);
}
