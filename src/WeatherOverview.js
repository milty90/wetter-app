import { panelOverview } from "./panelOverview";
import { panelOptions } from "./panelOptions";
import { panelDetails } from "./paneldetails";
import { getWeatherData } from "./wetterApi";
import { panelForecast } from "./forcast";
import { renderLoadingScreen } from "./loadingScreen";

export async function getOverview() {
  renderLoadingScreen();
  const data = await getWeatherData("Sulzburg");
  return await weatherOverview(data);
}

export async function weatherOverview(data) {
  console.log("weatherOverview : ", data);
  const {
    name: city,
    dt,
    main: { temp, temp_max, temp_min, humidity, feels_like },
    sys: { country },
    weather: [{ description }],
    wind: { speed },
  } = data || {};

  return ` 
  <div class="weather-main">  
  <div class="weather-panel">
      ${panelOverview(city, country, dt, temp, temp_max, temp_min)}
      ${panelOptions(description, data.weather[0].id)}
  </div>
  <div class="weather-details">
    ${panelDetails(speed, humidity, feels_like)}
  </div>
  ${panelForecast()}
</div>`;
}
