navigator.geolocation.getCurrentPosition(function (pos) {
  let lat = pos.coords.latitude;
  let long = pos.coords.longitude;
  initWeather(lat, long);
});

function initWeather(lat, long) {
  getWeatherForeCast(lat, long);
}

async function getWeatherForeCast(lat, long) {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weathercode,temperature_2m_max,sunset,windspeed_10m_max&current_weather=true&timezone=Europe%2FBerlin`
  );
  let data = await response.json();
  console.log(data);
  let temp = data.current_weather.temperature;
  let sunset = data.daily.sunset[0].slice(11);
  let windspeed = ((data.daily.windspeed_10m_max[0] * 1000) / 3600).toFixed(2);
  addWeatherToHtml(temp, sunset, windspeed);
}

function addWeatherToHtml(temp, sunset, windspeed) {
  let weather = document.querySelector(".welcomeContainer");

  const tempDiv = document.createElement("p");
  tempDiv.classList.add("weather-temp");
  tempDiv.innerHTML = `Temp: ${temp}°C`;
  weather.append(tempDiv);

  const sunsetDiv = document.createElement("p");
  sunsetDiv.classList.add("weather-sunset");
  sunsetDiv.innerHTML = `Sunset: ${sunset}`;
  weather.append(sunsetDiv);

  const windspeedDiv = document.createElement("p");
  windspeedDiv.classList.add("weather-wind");
  windspeedDiv.innerHTML = `Windspeed: ${windspeed} m/s`;
  weather.append(windspeedDiv);
}
