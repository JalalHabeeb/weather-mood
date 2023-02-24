const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const music = document.getElementById("music");
const activitySuggestion = document.getElementById("activity-suggestion");

const API_KEY = "659a35b6764b4738915d9fa508aad814";

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

getWeatherData = () => {
  navigator.geolocation.getCurrentPosition((success) => {
    let { latitude, longitude } = success.coords;

    fetch(
      `https://api.weatherbit.io/v2.0/current?lat=${latitude}&lon=${longitude}&key=${API_KEY}&lang=en`
    ).then((res) =>
      res.json().then((data) => {
        console.log(data.data);
        showWeatherDate(data);
        detectCity(data);
        musicSuggest(data);
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
            <div class ="weather-icon"><img src="./public/assets/icons/${icon}.png"/></div>
        </div>`;
};

const detectCity = (data) => {
  let { city_name, country_code } = data.data[0];
  timezone.textContent = `${city_name}`;
  countryEl.textContent = `${country_code}`;
};

const musicSuggest = (data) => {
  const sunny = [800, 801, 803];
  const cloudy = [802, 804, 900, 751, 741, 731, 721, 711, 700];
  const rainy = [522, 521, 520, 511, 502, 501, 500, 302, 301, 300];
  const snowy = [623, 622, 621, 612, 611, 610, 602, 601, 600];
  const stormy = [233, 232, 231, 230, 202, 201, 200];

  let { code } = data.data[0].weather;

  if (snowy.indexOf(code) !== -1) {
    music.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXd9rSDyQguIk?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    activitySuggestion.textContent = "Drinking Hot drink with a movie";
    document.body.style.backgroundImage = "url(../public/assets/snow.jpg)";
  } else if (rainy.indexOf(code) !== -1) {
    music.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX7YCknf2jT6s?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    activitySuggestion.textContent = "Reading a book in the library";
    document.body.style.backgroundImage = "url(../public/assets/rain.jpg)";
  } else if (cloudy.indexOf(code) !== -1) {
    music.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4s3V2rTswzO?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    activitySuggestion.textContent = "Practice JavaScript";
    document.body.style.backgroundImage = "url(../public/assets/cloud.jpg)";
  } else if (sunny.indexOf(code) !== -1) {
    music.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5xiztvBdlUf?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    activitySuggestion.textContent = "Cycling on the beach";
    document.body.style.backgroundImage = "url(../public/assets/sun.jpg)";
  } else if (stormy.indexOf(code) !== -1) {
    music.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/6XyY86QOPPrYVGvF9ch6wz?utm_source=generator" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    activitySuggestion.textContent = "Play video games";
    document.body.style.backgroundImage = "url(../public/assets/storm.jpg)";
  }
};
