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
      `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&city=thehague&key=659a35b6764b4738915d9fa508aad814&lang=en`
    ).then((res) =>
      res.json().then((data) => {
        console.log(data.data);
        showWeatherDate(data);
      })
    );
  });
};

getWeatherData();

const showWeatherDate = (data) => {
  let { temp, sunrise, sunset, wind_spd } = data.data[0];
  let { description, icon } = data.data[0].weather;
    currentWeatherItemsEl.innerHTML = `<div class="weather-item">
            <div>Temperature</div>
            <div>${temp}&#176; C</div>
        </div>
        <div class="weather-item">
            <div>Sunrise</div>
            <div>${sunrise}</div>
        </div>
        <div class="weather-item">
            <div>Sunset</div>
            <div>${sunset}</div>
        </div>
        <div class="weather-item">
            <div>Wind Speed</div>
            <div>${wind_spd.toFixed(2)} Km/h</div>
        </div>
        <div class="weather-item">
            <div>${description}</div>
            <div><img src="./public/assets/icons/${icon}.png"/></div>
        </div>`;
};
