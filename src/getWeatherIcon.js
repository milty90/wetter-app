function getWeatherIcon(weatherId) {
  switch (true) {
    case weatherId >= 200 && weatherId < 300:
      return `<img
            class="weather-panel__condition-icon"
            src="./public/weather-icons/thunderstorm.svg"
            alt="Thunderstorm"
          />`;
    case weatherId >= 300 && weatherId < 400:
      return `<img
            class="weather-panel__condition-icon"
            src="./public/weather-icons/rain.svg"
            alt="Drizzle"
          />`;
    case weatherId >= 500 && weatherId < 600:
      return `<img
            class="weather-panel__condition-icon"
            src="./public/weather-icons/shower-rain.svg"
            alt="Rain"
          /> `;
    case weatherId >= 600 && weatherId < 700:
      return `<img
            class="weather-panel__condition-icon"
            src="./public/weather-icons/snow.svg"
            alt="Snow"
          /> `;
    case weatherId >= 700 && weatherId < 800:
      return `<img
            class="weather-panel__condition-icon"
            src="./public/weather-icons/mist.svg"
            alt="Mist"
          /> `;
    case weatherId === 800:
      return `<img
            class="weather-panel__condition-icon"
            src="./public/weather-icons/clear-sky.svg"
            alt="Mist"
          /> `;
    case weatherId >= 801 && weatherId < 810:
      return `<img
            class="weather-panel__condition-icon"
            src="./public/weather-icons/scattered-clouds.svg"
            alt="Partly Cloudy"
          />`;
    default:
      return `<img
            class="weather-panel__condition-icon"
            src="./public/weather-icons/tornado.svg"
            alt="Tornado"
          />`;
  }
}
export default getWeatherIcon;
