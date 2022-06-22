const calendarContainer = document.getElementsByClassName("calendar")[0];
const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
const weekDays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
let dateNow = new Date();
let selected;
let selectedDate;
let monthInfo = [];

let currentCalendarDate = {
  year: dateNow.getFullYear(),
  month: dateNow.getMonth(),
  day: dateNow.getDate()
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

function isRedDay(date) {
  const dateString = formatDateToString(date)
  const day = monthInfo.find(day => day.datum === dateString);
  // console.log(monthInfo);
  if (day) {
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
  let weekday = firstDay.getDay() === 1 ? 7 : firstDay.getDay() > 1 ? firstDay.getDay() - 1 : 6;
  let lastDay = new Date(year, month + 1, 0);
  let lastDayOfMonth = lastDay.getDate();

  //Previous month
  for (let i = 0; i < weekday; i++) {
    const date = new Date(year, month, i - weekday + 1);
    createCalenderDay(date, previous, false);
  }

  //Current Month
  for (let i = 0; i < lastDayOfMonth; i++) {
    const date = new Date(year, month, firstDay.getDate() + i);
    createCalenderDay(date, toggleSelected, true);
  }

  //Next month
  for (let i = lastDayOfMonth + weekday; i < 42; i++) {
    const date = new Date(year, month + 1, i - lastDayOfMonth + 1 - weekday);
    createCalenderDay(date, next, false);
  }
}

function createCalenderDay(date, eventFunction, isCurrentMonth) {

  const calendarDay = document.createElement("div");
  calendarDay.classList.add("calendarDay");

  if ((date ? formatDateToString(date) : "undefined") === (selectedDate ? formatDateToString(selectedDate) : "")) {
    calendarDay.classList.add("selected");
    selected = calendarDay;
  }

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

    updateTaskFormDate(formatDateToString(dateNow));
    renderAllTasks();
  }

  if (!sameDay) {
    target.classList.add("selected");
    selected = target;
    selectedDate = date;

    updateTaskFormDate(formatDateToString(date));
    renderAllTasks(formatDateToString(date));
  }
}

function next() {
  if (currentCalendarDate.month === 11) {
    currentCalendarDate.year = currentCalendarDate.year + 1;
  }
  currentCalendarDate.month = (currentCalendarDate.month + 1) % 12;
  const dateObj = convertObjectToDate(currentCalendarDate);

  fetchMonthInfo(dateObj).then(() => {
    renderCalendar(currentCalendarDate.year, currentCalendarDate.month)
  }
  );
}

function previous() {
  if (currentCalendarDate.month === 0) {
    currentCalendarDate.year = currentCalendarDate.year - 1;
  }
  currentCalendarDate.month = currentCalendarDate.month === 0 ? 11 : currentCalendarDate.month - 1;

  const dateObj = convertObjectToDate(currentCalendarDate);
  fetchMonthInfo(dateObj).then(() => {
    renderCalendar(currentCalendarDate.year, currentCalendarDate.month)
  }
  );
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