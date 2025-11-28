import getWeatherIcon from "./getWeatherIcon";

export function panelOptions(description, weatherId) {
  return `<div class="weather-panel__options">
        <img
          class="weather-panel__menu-icon"
          src="/grip-lines.svg"
          alt="Location Icon"/>
        <div class="weather-panel__condition">
            <span class="weather-panel__condition-text">${description}</span>
           ${getWeatherIcon(weatherId)}
        </div>
      </div>`;
}
