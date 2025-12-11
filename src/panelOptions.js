import getWeatherIcon from "./getWeatherIcon";

export function panelOptions(description, weatherId, isFavorite) {
  return `<div class="weather-panel__options">
  <div class="weather-panel__options-left">
  <img id="arrow" class="weather-panel__menu-icon" src="/arrow-left.svg" alt="menu icon"/>
  </div>
  <div class="weather-panel__options-right">
  <img id="menu" class="weather-panel__menu-icon" src="/menu-duo.svg" alt="menu icon"/>
  <img id="cancel" class="weather-panel__menu-icon" src="/cancel.svg" alt="menu icon"/>
  ${
    !isFavorite
      ? `<img id="favorite" class="weather-panel__menu-icon weather-panel__menu-icon--active" src="/favorite.svg" alt="menu icon"/>`
      : ""
  }
  <div class="weather-panel__condition">
    <span class="weather-panel__condition-text">${description}</span>
           ${getWeatherIcon(weatherId)}
    </div>
  </div>
</div>`;
}
