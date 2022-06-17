document.addEventListener("DOMContentLoaded", main);

async function main() {
  setInterval(() => (dateNow = new Date()), 1000);
  await getMonthInfo(dateNow);
  renderWelcomeSegment();
  initTasks();
  initModeButton();
  addCalenderHeader();
  renderCalendar(dateNow.getFullYear(), dateNow.getMonth());
  initGeoLocation();
}

function update() {
  renderCalendar(currentCalendarDate.year, currentCalendarDate.month);
  selected
    ? renderAllTasks(formatDateToString(selectedDate))
    : renderAllTasks();
}
