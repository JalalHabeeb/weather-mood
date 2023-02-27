import { CURRENT_WEATHER_ITEMS_EL } from "./constants.js";

export const showWeatherDate = (data) => {
  let { temp, sunrise, sunset, wind_spd } = data.data[0];
  let { description, icon } = data.data[0].weather;
  CURRENT_WEATHER_ITEMS_EL.innerHTML = `<div class="weather-item">
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
            <div class ="weather-icon"><img src="public/assets/icons/${icon}.png"/></div>
        </div>`;
};
