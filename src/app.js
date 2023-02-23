const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const weatherForecastEl = document.getElementById("weather-forecast");
const currentTempEl = document.getElementById("current-temp");

const API_KEY = "5115e9a262066b1813e5ec1ad1044fc4";

setInterval(() => {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.toLocaleString("default", { month: "short" });
  const date = time.getDate();
  const day = time.toLocaleString("default", { weekday: "long" });
  const hour = time.getHours();
  const hoursIn12HrFormat = hour >= 13 ? "0" + (hour % 12) : hour;
  let minutes = time.getMinutes();
  minutes < 10 ? (minutes = "0" + minutes) : minutes;
  const amPm = hour >= 12 ? "PM" : "AM";

  timeEl.innerHTML =
    hoursIn12HrFormat + ":" + minutes + `<span id="am-pm">${amPm}</span>`;

  dateEl.innerHTML = `${day}, ${date} ${month}, ${year}`;
}, 1000);

const getWeatherData = () => {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FBerlin&timezone=Europe%2FBerlin`
    ).then((res) =>
      res.json().then((data) => {
        console.log(data);
        showWeatherDate(data);
      })
    );
  });
};

getWeatherData();

const showWeatherDate = (data) => {
  let { temperature, winddirection, windspeed } = data.current_weather;
    currentWeatherItemsEl.innerHTML = 
        `<div class="weather-item">
            <div>Temperature</div>
            <div>${temperature}&#176; C</div>
        </div>
        <div class="weather-item">
            <div>Wind Direction</div>
            <div>${winddirection}</div>
        </div>
        <div class="weather-item">
            <div>Wind Speed</div>
            <div>${windspeed} Km/h</div>
        </div>`;
};
