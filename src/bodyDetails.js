export function bodyDetails(wind, humidity, feelsLike) {
  return `<div class="weather-forecast__body-details">
        <div class="weather-forecast__body-detail-item">
          <img src="weather-icons/wind.svg" alt="Wind Icon" class="weather-forecast__body-detail-item__icon"/>
          <p class="weather-forecast__body-detail-item__label">Wind</p>
          <p class="weather-forecast__body-detail-item__value">${wind} m/s</p>
        </div>
        <div class="weather-forecast__body-detail-item">
        <img src="weather-icons/drop.svg" alt="Humidity Icon" class="weather-forecast__body-detail-item__icon"/>
          <p class="weather-forecast__body-detail-item__label">Feuchtigkeit</p>
          <p class="weather-forecast__body-detail-item__value">${humidity}%</p>
        </div>
        <div class="weather-forecast__body-detail-item">
        <img src="weather-icons/thermometer.svg" alt="Feels Like Icon" class="weather-forecast__body-detail-item__icon"/>
          <p class="weather-forecast__body-detail-item__label">Gefühlt</p>
          <p class="weather-forecast__body-detail-item__value">${feelsLike}°C</p>
        </div>
      </div>`;
}
