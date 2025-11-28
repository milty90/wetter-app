import { dateFormatter } from "./dateFormatter";

export function panelOverview(city, country, dt, temp, temp_max, temp_min) {
  return `<div class="weather-panel__overview">
        <div class="weather-panel__header">
          <img
            class="weather-panel__header__location-icon"
            src="/location-pin.svg"
            alt="Location Icon"
          />
          <p class="weather-panel__header__location">${city}, ${country}</p>
        </div>
        <p class="weather-panel__current-date">${dateFormatter(dt)}</p>
        <div class="weather-panel__temp-container">
          <p class="weather-panel__temperature">${temp.toFixed(0)}</p>
          <p class="weather-panel__temperature-unit">°C</p>
        </div>
        <div class="weather-panel__min-max-temp">
          <p class="weather-panel__min-temp">Min: ${temp_min.toFixed(1)}°C</p>
          <p class="weather-panel__max-temp">Max: ${temp_max.toFixed(1)}°C</p>
        </div>
      </div>`;
}
