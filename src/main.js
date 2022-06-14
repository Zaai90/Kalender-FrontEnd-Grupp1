document.addEventListener("DOMContentLoaded", main);

function main() {
  addCalenderHeader();
  renderCalendar(dateNow.getFullYear(), dateNow.getMonth());
  renderWelcomeSegment();
  setInterval(() => (dateNow = new Date()), 1000);
  initModeButton();
  initTasks();
}
