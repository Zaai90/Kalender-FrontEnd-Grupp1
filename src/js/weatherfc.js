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
  0: "Clear sky",
  1: "fa-cloud-sun",
  2: "partly cloudy",
  3: "fa-cloud-sun",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Drizzle Light",
  53: "moderate",
  55: "dense intensity",
  56: "Freezing Drizzle Light",
  57: "Freezing Drizzle dense intensity",
  61: "Rain: Slight",
  63: "Rain: moderate",
  65: "Rain: heavy intensity",
  66: "Freezing Rain: Light",
  67: "Freezing Rain: heavy intensity",
  71: "Snow fall: Slight",
  73: "Snow fall: moderate",
  75: "Snow fall: heavy intensity",
  77: "Snow grains",
  80: "Rain showers: Slight",
  81: "Rain showers: moderate",
  82: "Rain showers: violent",
  85: "Snow showers slight",
  86: "Snow showers heavy",
  95: "Thunderstorm: Slight",
  999: "Thunderstorm: moderate",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail",
};

function addWeatherToHtml(temp, sunset, windspeed, weatherCode) {
  let weather = document.querySelector(".welcomeContainer");

  const weatherCodeDiv = document.createElement("i");
  weatherCodeDiv.classList.add("fa-solid", weatherCodeLib[weatherCode]);
  weatherCodeDiv.style.fontSize = "1.8rem";
  weather.append(weatherCodeDiv);
  console.log(weatherCode);

  const tempDiv = document.createElement("p");
  tempDiv.classList.add("fa-solid", "fa-temperature-half");
  tempDiv.innerHTML = ` ${temp}°C`;
  tempDiv.style.fontSize = "1rem";
  weather.append(tempDiv);
  console.log(temp);

  const sunsetDiv = document.createElement("p");
  sunsetDiv.classList.add("fa-solid", "fa-moon");
  sunsetDiv.innerHTML = `${sunset}`;
  sunsetDiv.style.fontSize = "1rem";
  weather.append(sunsetDiv);
  console.log(sunset);

  const windspeedDiv = document.createElement("i");
  windspeedDiv.classList.add("fa-solid", "fa-wind");
  windspeedDiv.innerHTML = ` ${windspeed} m/s`;
  windspeedDiv.style.fontSize = "1rem";
  weather.append(windspeedDiv);
  console.log(windspeed);
}
