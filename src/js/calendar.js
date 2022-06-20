const calendarContainer = document.getElementsByClassName("calendar")[0];
const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
const weekDays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
let dateNow = new Date();
let selected;
let selectedDate;
let monthInfo = [];

let currentCalendarDate = {
  day: dateNow.getDate(),
  month: dateNow.getMonth(),
  year: dateNow.getFullYear(),
};

function addCalenderHeader() {
  let header = document.querySelector(".calendarHeader");

  const calendarYear = document.createElement("div");
  calendarYear.classList.add("calendarHeaderYear");

  const calendarMonth = document.createElement("div");
  calendarMonth.classList.add("calendarHeaderMonth");

  header.appendChild(calendarYear);
  header.appendChild(calendarMonth);
}

async function getMonthInfo(date) {
  monthInfo = await fetchMonthInfo(date);
}

function isRedDay(date) {
  const dateString = formatDateToString(date)
  const day = monthInfo.find(day => day.datum === dateString);
  if (day) {
    console.log(day);
    return day["röd dag"] === "Ja";
  }
}

function renderHeader(year, month) {
  const yearDiv = document.querySelector(".calendarHeaderYear");
  const monthDiv = document.querySelector(".calendarHeaderMonth");
  yearDiv.innerHTML = year;
  monthDiv.innerHTML = monthNames[month];
}

function renderCalendar(year, month) {
  calendarContainer.innerHTML = "";
  renderHeader(year, month);

  let firstDay = new Date(year, month);
  let weekday = firstDay.getDay() > 0 ? firstDay.getDay() === 0 ? 6 : firstDay.getDay() -1 : 7;
  let lastDay = new Date(year, month + 1, 0);
  let lastDayOfMonth = lastDay.getDate();

  //Previous month
  for (let i = 0; i < weekday; i++) {
    let date = new Date(year, month, i - weekday + 1);
    createCalenderDay(date, previous, false);
  }

  //Current Month
  for (let i = 0; i < lastDayOfMonth; i++) {
    let date = new Date(year, month, firstDay.getDate() + i);
    createCalenderDay(date, toggleSelected, true);
  }

  //Next month
  for (let i = lastDayOfMonth + weekday; i < 42; i++) {
    let date = new Date(year, month + 1, i - lastDayOfMonth + 1 - weekday);
    createCalenderDay(date, next, false);
  }
}

function createCalenderDay(date, eventFunction, isCurrentMonth) {
  const calendarDay = document.createElement("div");
  calendarDay.classList.add("calendarDay");

  date.toDateString() === dateNow.toDateString() && isCurrentMonth
    ? calendarDay.classList.add("highlighted")
    : null;
  calendarDay.classList.add(isCurrentMonth ? "current" : "faded");

  if (isCurrentMonth) {
    isRedDay(date) ? calendarDay.classList.add("redDay") : '';
  }

  calendarDay.id = `${date.getDate()}-${date.getMonth() + 1
    }-${date.getFullYear()}${isCurrentMonth ? "" : ""}`;

  const calendarDayNumber = document.createElement("p");
  calendarDayNumber.classList.add("calendarDayNumber");
  calendarDayNumber.innerHTML = date.getDate();
  calendarDay.appendChild(calendarDayNumber);
  calendarDay.addEventListener("click", (e) => eventFunction(e, date));

  const taskAmount = getAmountOfTasks(formatDateToString(date));
  if (taskAmount > 0) {
    const calendarDayTaskAmount = document.createElement("div");
    calendarDayTaskAmount.classList.add("taskAmount");
    const taskAmountText = document.createElement("p");
    taskAmountText.innerHTML = taskAmount;
    calendarDayTaskAmount.appendChild(taskAmountText);
    calendarDay.appendChild(calendarDayTaskAmount);
  }

  calendarContainer.appendChild(calendarDay);
}

function toggleSelected(e, date) {
  const target = e.currentTarget;
  const sameDay = target === selected;

  if (selected) {
    selected.classList.remove("selected");
    selected = undefined;
    selectedDate = undefined;
    renderAllTasks();
  }

  if (!sameDay) {
    target.classList.add("selected");
    selected = target;
    selectedDate = date;

    renderAllTasks(formatDateToString(date));
  }
}

function next() {
  if (currentCalendarDate.month === 11) {
    currentCalendarDate.year = currentCalendarDate.year + 1;
  }
  currentCalendarDate.month = (currentCalendarDate.month + 1) % 12;

  getMonthInfo(currentCalendarDate).then(() => {
    renderCalendar(currentCalendarDate.year, currentCalendarDate.month)
  }
  );
}

function previous() {
  if (currentCalendarDate.month === 0) {
    currentCalendarDate.year = currentCalendarDate.year - 1;
  }
  currentCalendarDate.month = currentCalendarDate.month === 0 ? 11 : currentCalendarDate.month - 1;

  getMonthInfo(currentCalendarDate).then(() => {
    renderCalendar(currentCalendarDate.year, currentCalendarDate.month)
  }
  );
}

/**
 * 
 * @param {Date} date 
 * @returns 
 */
function formatDateToString(date) {
  return date.toISOString().split("T")[0];
}

function getAmountOfTasks(date) {
  let amount = 0;
  tasks.forEach(task => {
    if (task.taskDate === date) {
      amount++;
    }
  });
  return amount;
}