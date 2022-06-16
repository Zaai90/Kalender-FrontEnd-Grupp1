document.addEventListener("DOMContentLoaded", main);

function main() {
  setInterval(() => (dateNow = new Date()), 1000);
  renderWelcomeSegment();
  initTasks();
  initModeButton();
  addCalenderHeader();
  renderCalendar(dateNow.getFullYear(), dateNow.getMonth());
}
