document.addEventListener('DOMContentLoaded', main);

function main() {
    addCalenderHeader()
    renderCalendar(dateNow.getFullYear(), dateNow.getMonth());
}