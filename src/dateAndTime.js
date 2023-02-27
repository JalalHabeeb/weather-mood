import { TIME_EL, DATE_EL } from "./constants.js";

export const dateAndTime = setInterval(() => {
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

  TIME_EL.innerHTML =
    hoursIn12HrFormat + ":" + minutes + `<span id="am-pm">${amPm}</span>`;

  DATE_EL.innerHTML = `${day}, ${date} ${month}, ${year}`;
}, 1000);
