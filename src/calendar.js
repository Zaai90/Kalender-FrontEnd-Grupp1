const monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
const dateNow = new Date();

let currentCalendarDate = {
    day: dateNow.getDate(),
    month: dateNow.getMonth(),
    year: dateNow.getFullYear()
};

function addCalenderHeader() {
    let header = document.querySelector('.calendarHeader');
    header.appendChild(document.createElement('div')).classList.add('calendarHeaderYear');
    header.appendChild(document.createElement('div')).classList.add('calendarHeaderMonth');
}

function renderHeader(year, month) {
    const yearDiv = document.querySelector('.calendarHeaderYear');
    const monthDiv = document.querySelector('.calendarHeaderMonth');
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
        renderCalenderDay(i, date, previous, false)
    }

    //Current Month
    for (let i = 0; i < lastDayOfMonth; i++) {
        let date = new Date(year, month, firstDay.getDate() + i);
        renderCalenderDay(i + weekday, date, markCalenderDay, true)
    }

    //Next month
    for (let i = lastDayOfMonth + weekday; i < 42; i++) {
        let date = new Date(year, month + 1, i - lastDayOfMonth + 1 - weekday);
        renderCalenderDay(i, date, next, false)
    }
}


/**
* @param {number} index 
* @param {Date} date 
* @param {Function} eventFunction 
* @param {Boolean} isCurrentMonth
* Function to render a calendar day
*/
function renderCalenderDay(index, date, eventFunction, isCurrentMonth) {
    document.querySelector('.calendarContainer').appendChild(document.createElement('div')).classList.add('calendarDay');
    const calendarDay = document.querySelectorAll('.calendarDay')[index];

    calendarDay.classList.add(date.toDateString() === dateNow.toDateString() && isCurrentMonth ? 'highlighted' : 'i');
    calendarDay.classList.add(isCurrentMonth ? 'current' : 'faded');
    calendarDay.id = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}${isCurrentMonth ? '-current' : ''}`;

    calendarDay.appendChild(document.createElement('p')).classList += 'calendarDayNumber';
    calendarDay.getElementsByTagName('p')[0].innerHTML = date.getDate();
    calendarDay.addEventListener('click', eventFunction);
}

function markCalenderDay(event) {
    let target = document.getElementById(event.target.id);
    let markedTargets = document.getElementsByClassName('marked');

    if (target.classList.contains('marked')) {
        target.classList.remove('marked');
    }
    else {
        for (let i = 0; i < markedTargets.length; i++) {
            markedTargets[i]?.classList.remove('marked');
        }
        target.classList.add('marked');
    }
}

function next() {
    currentCalendarDate.year = (currentCalendarDate.month === 11) ? currentCalendarDate.year + 1 : currentCalendarDate.year;
    currentCalendarDate.month = (currentCalendarDate.month + 1) % 12;

    resetCalendar(currentCalendarDate.year, currentCalendarDate.month);
}

function previous() {
    currentCalendarDate.year = (currentCalendarDate.month === 0) ? currentCalendarDate.year - 1 : currentCalendarDate.year;
    currentCalendarDate.month = (currentCalendarDate.month === 0) ? 11 : currentCalendarDate.month - 1;

    resetCalendar(currentCalendarDate.year, currentCalendarDate.month);
}

function resetCalendar(year, month) {
    let calendarDays = document.getElementsByClassName('calendarDay');
    while (calendarDays.length > 0) {
        calendarDays[0].remove();
    }
    renderCalendar(year, month);
}