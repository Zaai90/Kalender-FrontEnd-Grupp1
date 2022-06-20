document.addEventListener("DOMContentLoaded", main);

async function main() {
  dateNow = new Date();
  setInterval(() => (dateNow = new Date()), 1000);
  renderWelcomeSegment();
  initTasks();
  initializeTheme();
  addCalenderHeader();
  renderCalendar(dateNow.getFullYear(), dateNow.getMonth());
  initGeoLocation();
  initMascotEvent();

  getMonthInfo(dateNow).then(() => {
    renderCalendar(dateNow.getFullYear(), dateNow.getMonth());
  });
  addCalenderHeader();
}

function update() {
  renderCalendar(currentCalendarDate.year, currentCalendarDate.month);
  selected
    ? renderAllTasks(formatDateToString(selectedDate))
    : renderAllTasks();
}
