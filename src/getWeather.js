import { API_KEY } from "./constants.js";
import { showWeatherDate } from "./showWeather.js";
import { detectCity } from "./detectCity.js";
import { musicSuggest } from "./musicSuggest.js";

export const getWeatherData = () => {
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
