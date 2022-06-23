let calendarContainer;
let monthNames;
let weekDays;
let dateNow;
let selected;
let selectedDate;
let monthInfo;
let currentCalendarDate;

let tasks;



function initiateGlobals() {
    calendarContainer = document.getElementsByClassName("calendar")[0];
    monthNames = ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];
    weekDays = ["Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"];
    dateNow = new Date();
    monthInfo = [];
    currentCalendarDate = {
        year: dateNow.getFullYear(),
        month: dateNow.getMonth(),
        day: dateNow.getDate()
    };

    tasks = getFromLocalStorage("taskArray") || [];


}