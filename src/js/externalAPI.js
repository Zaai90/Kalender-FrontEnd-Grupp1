async function fetchMonthInfo(date) {
  formattedDate = formatDateToString(date).slice(0, 7).replace("-", "/");
  const url = `https://sholiday.faboul.se/dagar/v2.1/${formattedDate}`;
  const response = await fetchData(url);
  const days = response.dagar.map((day) => {
    return day;
  });
  return days;
}

async function fetchYearInfo(date) {
  formattedDate = formatDateToString(date).slice(0, 4);
  const url = `https://sholiday.faboul.se/dagar/v2.1/${formattedDate}`;
  const response = await fetchData(url);
  const days = await response.dagar.map((day) => {
    return day;
  });
  return days;
}

function fetchData(url, options) {
  return fetch(url, options).then((response) => {
    return response.json();
  });
}
