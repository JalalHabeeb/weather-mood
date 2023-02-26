const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const currentWeatherItemsEl = document.getElementById("current-weather-items");
const timezone = document.getElementById("time-zone");
const countryEl = document.getElementById("country");
const music = document.getElementById("music");
const activitySuggestion = document.getElementById("activity-suggestion");
const splash = document.querySelector('.splash')
const API_KEY = config.API_KEY

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    splash.classList.add("display-none");
  }, 5000);
});

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
    )
      .then((res) => res.json())
      .then((data) => {
        showWeatherDate(data);
        detectCity(data);
        musicSuggest(data);
        return data;
      })
      .catch((error) => {
        console.log("error" + error.message);
        //Error div
        const errorDiv = document.createElement("div");
        errorDiv.setAttribute("class", "error-div");
        document.body.appendChild(errorDiv);

        //Error paragraph
        const errorPar = document.createElement("p");
        errorDiv.appendChild(errorPar);
        errorPar.textContent = "Oops!! Please reload the page";

        //button Div
        const buttonDiv = document.createElement("div");
        errorDiv.appendChild(buttonDiv);

        //Refresh Button
        const button = document.createElement("button");
        button.setAttribute("class", "refresh-button");
        button.textContent = "Reload";
        buttonDiv.appendChild(button);
        button.addEventListener("click", () => {
          location.reload();
        });
      });
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
  const cloudy = [ 804, 900, 751, 741, 731, 721, 711, 700];
  const rainy = [802, 522, 521, 520, 511, 502, 501, 500, 302, 301, 300];
  const snowy = [623, 622, 621, 612, 611, 610, 602, 601, 600];
  const stormy = [233, 232, 231, 230, 202, 201, 200];

  let { code } = data.data[0].weather;

  if (snowy.indexOf(code) !== -1) {
    music.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/6PFPjumGRpZnBzqnDci6qJ?utm_source=generator&theme=0" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    activitySuggestion.innerHTML = `<strong>Hybrid Theory</strong> released on October 24, 2000. The album's lyrical themes deal with problems lead vocalist Chester Bennington experienced during his adolescence, including drug abuse and the constant fighting and divorce of his parents. It takes its title from the previous name of the band as well as the concept of music theory and combining different styles. <a href="https://en.wikipedia.org/wiki/Hybrid_Theory" target="_blank" class="read-more">Read More</a>`;
    document.body.style.backgroundImage = "url(../public/assets/snow.jpg)";
  } else if (rainy.indexOf(code) !== -1) {
    music.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/4Gfnly5CzMJQqkUFfoHaP3?utm_source=generator&theme=0" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    activitySuggestion.innerHTML = `<strong>Meteora</strong> is the second studio album by Linkin Park. It was released on March 25, 2003. The title Meteora is taken from the Greek Orthodox monasteries originally bearing the name. Meteora has a similar sound to Hybrid Theory, and the album took almost a year to be recorded. <a href="https://en.wikipedia.org/wiki/Meteora_(album)" target="_blank" class="read-more">Read More</a>`;
    document.body.style.backgroundImage = "url(../public/assets/rain.jpg)";
  } else if (cloudy.indexOf(code) !== -1) {
    music.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/5uvXx5ZQswNRFCdHR521YZ?utm_source=generator&theme=0" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    activitySuggestion.innerHTML = `<strong>A Thousand Suns</strong> is the fourth studio album by Linkin Park. It was released on September 13, 2010. It is a concept album dealing with human fears such as nuclear warfare. The title is a reference to the Bhagavad Gita, by J. Robert Oppenheimer, who described the atomic bomb as being "as bright as a thousand suns". <a href="https://en.wikipedia.org/wiki/A_Thousand_Suns" target="_blank" class="read-more">Read More</a>`;
    document.body.style.backgroundImage = "url(../public/assets/cloud.jpg)";
  } else if (sunny.indexOf(code) !== -1) {
    music.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/5Eevxp2BCbWq25ZdiXRwYd?utm_source=generator&theme=0" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    activitySuggestion.innerHTML = `<strong>One More Light</strong> is the seventh studio album by Linkin Park. It was released on May 19, 2017. It is the band's first album to have a title track, as they felt that the song "One More Light" was the heart of the album. It is also the last album to be released before the death of lead vocalist Chester Bennington on July 20, 2017. <a href="https://en.wikipedia.org/wiki/One_More_Light" target="_blank" class="read-more">Read More</a>`;
    document.body.style.backgroundImage = "url(../public/assets/sun.jpg)";
  } else if (stormy.indexOf(code) !== -1) {
    music.innerHTML = `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/album/5NH94cATqx5fjBE794xZLy?utm_source=generator&theme=0" width="100%" height="200" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
    activitySuggestion.innerHTML = `<strong>Collision Course</strong> is a collaborative album from Jay-Z and Linkin Park, released on November 30, 2004. From Linkin Park's catalog, Collision Course features three songs from Meteora and four from Hybrid Theory. <a href="https://en.wikipedia.org/wiki/Collision_Course_(EP)" target="_blank" class="read-more">Read More</a>`;
    document.body.style.backgroundImage = "url(../public/assets/storm.jpg)";
  }
};


