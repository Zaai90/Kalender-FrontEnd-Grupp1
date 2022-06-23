document.addEventListener("DOMContentLoaded", main);

async function main() {
  initiateGlobals();
  setInterval(() => (dateNow = new Date()), 1000);
  renderWelcomeSegment();
  initTasks();
  initializeTheme();
  addCalenderHeader();
  renderCalendar(dateNow.getFullYear(), dateNow.getMonth());
  initGeoLocation();
  initMascotEvent();

  fetchMonthInfo(dateNow).then(() => {
    renderCalendar(dateNow.getFullYear(), dateNow.getMonth());
  });
}

function update() {
  renderCalendar(currentCalendarDate.year, currentCalendarDate.month);
  selected
    ? renderAllTasks(formatDateToString(selectedDate))
    : renderAllTasks();
}
