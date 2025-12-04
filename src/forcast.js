import { bodyDetails } from "./bodyDetails";

export function forecastItem(icon, time, temp) {
  return `
    <div class="weather-forecast__item">
        <img
          class="weather-forecast__item__icon"
          src="https://openweathermap.org/img/wn/${icon}@2x.png"
          alt="Clear Sky"/>
          <div class="weather-forecast__item">
            <p class="weather-forecast__item__time">${time}</p>
            <p class="weather-forecast__item__temp">${temp}°C</p>
          </div>  
        </div>`;
}

export function forcastDayItem(
  icon,
  day,
  tempRangeMin,
  tempRangeMax,
  description,
  hourlyItems,
  bodyDetails
) {
  return `
  <div class="weather-forecast__dayItem">
    <div class="weather-forecast__dayItem-head">
        <img
          class="weather-forecast__item__icon"
          src="https://openweathermap.org/img/wn/${icon}@2x.png"/>
          <div class="weather-forecast__dayHeader">
          <div class="weather-forecast__dayHeader__title">
            <p class="weather-forecast__dayHeader__day">${day}</p>
            <p class="weather-forecast__dayHeader__tempRange"> ↓ ${tempRangeMin}° ↑ ${tempRangeMax}°</p>
            </div>
            <div class="weather-forecast__dayHeader__description">
            <p>${description}</p>
            </div>
          </div>
    </div>
    <div class="weather-forecast__dayItem-body">
    <img
        class="weather-forecast__arrow-down-icon"
        src="/chevron-down.svg"
        alt="Arrow Down"/>
        <img
        class="weather-forecast__arrow-up-icon"
        src="/chevron-up.svg"
        alt="Arrow Up"/>
    <div class="weather-forecast__day-Content">
    ${bodyDetails}
    
    </div>
    <div class="weather-forecast__dayItem-body-divider"></div>
    <div class="weather-forecast__hourlyItems">
        ${hourlyItems}
      </div>
    </div>
  </div>`;
}
