import { SPLASH } from "./constants.js";
import { dateAndTime } from "./dateAndTime.js";
import { getWeatherData } from "./getWeather.js";

export const main = () => {
  document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      SPLASH.classList.add("display-none");
    }, 5000);
  });

  dateAndTime;

  getWeatherData();
};
