import { TIME_ZONE, COUNTRY_EL } from "./constants.js";

export const detectCity = (data) => {
  let { city_name, country_code } = data.data[0];
  TIME_ZONE.textContent = `${city_name}`;
  COUNTRY_EL.textContent = `${country_code}`;
};
