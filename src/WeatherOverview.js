import { panelOverview } from "./panelOverview";
import { panelOptions } from "./panelOptions";
import { panelDetails } from "./panelDetails";
import { getWeatherData } from "./wetterApi";
import { forecastItem, forcastDayItem } from "./forcast";
import { renderLoadingScreen } from "./loadingScreen";
import { dayFormatter } from "./dateFormatter";

export async function getOverview() {
  renderLoadingScreen();
  const data = await getWeatherData("Ihringen");
  return await weatherOverview(data);
}

export async function weatherOverview(data) {
  console.log("weatherOverview : ", data);
  const {
    city: { name: city, country, sunrise, sunset },

    list: [
      {
        dt,
        main: { temp, temp_max, temp_min, humidity, feels_like },
        weather: [{ description, id }],
        wind: { speed },
      },
    ],
  } = data || {};

  return ` 
  <div class="weather-main">  
  <div class="weather-panel">
      ${panelOverview(city, country, dt, temp, temp_max, temp_min)}
      ${panelOptions(description, id)}
  </div>
  <div class="weather-details">
    ${panelDetails(speed, humidity, feels_like)}
  </div>
  <div class="weather-forecast__container">
        <p class="weather-forecast__title ">Stunden Vorhersage</p>
        <div class="weather-forecast__items">
         ${data.list
           .slice(0, 8)
           .map((item) =>
             forecastItem(
               item.weather[0].icon,
               new Date(item.dt * 1000).getHours() + ":00",
               Math.round(item.main.temp)
             )
           )
           .join("")}
           </div>
           <p class="weather-forecast__title ">Nächste 4 tagen</p>
           <div class="weather-forecast__dayItems">
         ${data.list
           .filter((item, index) => index % 8 === 0)
           .map((item) =>
             forcastDayItem(
               item.weather[0].icon,
               dayFormatter(item.dt),
               Math.round(item.main.temp_min),
               Math.round(item.main.temp_max),
               item.weather[0].description
             )
           )
           .join("")}
        
      </div>
 
</div>`;
}
