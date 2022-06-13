document.addEventListener('DOMContentLoaded', main);

function main() {
    addCalenderHeader()
    initModeButton()
    renderCalendar(dateNow.getFullYear(), dateNow.getMonth());
}