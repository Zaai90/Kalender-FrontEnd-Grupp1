function initGeoLocation() {
  navigator.geolocation.getCurrentPosition(function (pos) {
    let lat = pos.coords.latitude;
    let long = pos.coords.longitude;
    getWeatherForeCast(lat, long);
  });
}

async function getWeatherForeCast(lat, long) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,sunset,windspeed_10m_max&current_weather=true&weathercode&timezone=Europe%2FBerlin`
  );
  let data = await response.json();
  let temp = data.current_weather.temperature;
  let sunset = data.daily.sunset[0].slice(11);
  let windspeed = ((data.daily.windspeed_10m_max[0] * 1000) / 3600).toFixed(2);
  let weatherCode = data.current_weather.weathercode;
  addWeatherToHtml(temp, sunset, windspeed, weatherCode);
}
const weatherCodeLib = {
  0: "fa-sun",
  1: "fa-cloud-sun",
  2: "fa-cloud-sun",
  3: "fa-cloud-sun",
  45: "fa-smog",
  48: "fa-smog",
  51: "fa-droplet",
  53: "fa-cloud-rain",
  55: "fa-cloud-showers-heavy",
  56: "fa-droplet",
  57: "fa-cloud-showers-heavy",
  61: "fa-droplet",
  63: "fa-cloud-rain",
  65: "fa-cloud-showers-heavy",
  66: "fa-droplet",
  67: "fa-cloud-showers-heavy",
  71: "fa-snowflake",
  73: "fa-snowflake",
  75: "fa-snowplow",
  77: "fa-snowplow",
  80: "fa-droplet",
  81: "fa-cloud-rain",
  82: "fa-cloud-showers-water",
  85: "fa-snowflake",
  86: "fa-snowplow",
  95: "fa-cloud-bolt",
  999: "fa-bolt-lightning",
  96: "fa-cloud-bolt",
  99: "fa-bolt-lightning",
};

function addWeatherToHtml(temp, sunset, windspeed, weatherCode) {
  let weather = document.querySelector(".welcomeContainer");

  const weatherCodeDiv = document.createElement("i");
  weatherCodeDiv.classList.add("fa-solid", weatherCodeLib[weatherCode]);
  weatherCodeDiv.style.fontSize = "1.8rem";
  weather.append(weatherCodeDiv);

  const tempDiv = document.createElement("i");
  tempDiv.classList.add("fa-solid", "fa-temperature-half");
  tempDiv.innerHTML = ` ${temp}°C`;
  tempDiv.style.fontSize = "1rem";
  weather.append(tempDiv);

  const sunsetDiv = document.createElement("i");
  sunsetDiv.classList.add("fa-solid", "fa-moon");
  sunsetDiv.innerHTML = `${sunset}`;
  sunsetDiv.style.fontSize = "1rem";
  weather.append(sunsetDiv);

  const windspeedDiv = document.createElement("i");
  windspeedDiv.classList.add("fa-solid", "fa-wind");
  windspeedDiv.innerHTML = ` ${windspeed} m/s`;
  windspeedDiv.style.fontSize = "1rem";
  weather.append(windspeedDiv);
}
