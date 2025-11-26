export function panelDetails(wind, humidity, feelsLike) {
  return `<div class="weather-panel__details">
        <div class="weather-panel__detail-item">
          <p class="weather-panel__detail-item__label">Wind</p>
          <p class="weather-panel__detail-item__value">${wind} m/s</p>
        </div>
        <div class="weather-panel__detail-item">
          <p class="weather-panel__detail-item__label">Feuchtigkeit</p>
          <p class="weather-panel__detail-item__value">${humidity}%</p>
        </div>
        <div class="weather-panel__detail-item">
          <p class="weather-panel__detail-item__label">Gefühlt</p>
          <p class="weather-panel__detail-item__value">${feelsLike.toFixed(
            1
          )}°C</p>
        </div>
      </div>`;
}
