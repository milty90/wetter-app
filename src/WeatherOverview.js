import { panelOverview } from "./panelOverview";
import { panelOptions } from "./panelOptions";
import { panelDetails } from "./panelDetails";
import { getWeatherData } from "./wetterApi";
import { forecastItem, forcastDayItem } from "./forcast";
import { renderLoadingScreen } from "./loadingScreen";
import { dayFormatter } from "./formatters";
import { bodyDetails } from "./bodyDetails";
import { getSavedCities } from "./localStateManager";

export async function getWeatherOverview(lat, lon, city) {
  renderLoadingScreen(city);

  const data = await getWeatherData(lat, lon);

  console.log("data in weather overview: ", lat, lon, data);
  const weatherData = {
    city: city,
    id: data.city.id,
    dt: data.list[0].dt,
    sys: data.list[0].sys.pod,
  };
  const html = await weatherOverview(data);
  return { html, weatherData };
}

export async function weatherOverview(data) {
  console.log("weatherOverview : ", data);
  const {
    city: {
      name: city,
      coord: { lat: latitude, lon: longitude },
      country,
      sunrise,
      sunset,
      id,
    },

    list: [
      {
        dt,
        main: { temp, temp_max, temp_min, humidity, feels_like },
        weather: [{ description, id: weatherId }],
        wind: { speed },
        sys: { pod },
      },
    ],
  } = data || {};

  const savedCities = getSavedCities();

  const isFavorite = savedCities.some((cityItem) => {
    const [cityName, countryCode, latitude, longitude] = cityItem.split(",");

    return (
      cityName === city &&
      countryCode === country &&
      String(latitude) === String(latitude) &&
      String(longitude) === String(longitude)
    );
  });

  return ` 
  <div class="weather-main">  
  <div class="weather-panel" data-geo-lat="${latitude}" data-geo-lon="${longitude}">
      ${panelOverview(
        city,
        country,
        dt,
        temp,
        temp_max,
        temp_min,
        pod,
        sunrise,
        sunset
      )}
      ${panelOptions(description, weatherId, isFavorite)}
  </div>
  <div class="weather-details">
    ${panelDetails(speed, humidity, feels_like)}
  </div>
  <div class="weather-forecast__container">
        <p class="weather-forecast__title-Hours ">3 stündliche Vorhersage:</p>
        <div class="weather-forecast__items">
         ${data.list
           .slice(0, 8)
           .map((item) =>
             forecastItem(
               item.weather[0].icon,
               new Date(item.dt * 1000).getHours() + " Uhr",
               Math.round(item.main.temp)
             )
           )
           .join("")}
           </div>
           <p class="weather-forecast__title-Days ">Die nächsten 4 Tage:</p>
           <div class="weather-forecast__dayItems">
         ${(() => {
           // Gruppierung nach Tag
           const groupedByDay = {};
           data.list.forEach((item) => {
             const date = new Date(item.dt * 1000).toDateString();
             if (!groupedByDay[date]) {
               groupedByDay[date] = [];
             }
             groupedByDay[date].push(item);
           });

           // Die nächsten 4 Tage rendern
           return Object.entries(groupedByDay)
             .slice(1, 5)
             .map(([date, items]) => {
               const temps = items.map((i) => i.main.temp);
               const hourlyItems = items
                 .map((item) =>
                   forecastItem(
                     item.weather[0].icon,
                     new Date(item.dt * 1000).getHours() + " Uhr",
                     Math.round(item.main.temp)
                   )
                 )
                 .join("");

               const bodydetails = (() => {
                 const avgWind =
                   items.reduce((sum, item) => sum + item.wind.speed, 0) /
                   items.length;
                 const avgHumidity =
                   items.reduce((sum, item) => sum + item.main.humidity, 0) /
                   items.length;
                 const avgFeelsLike =
                   items.reduce((sum, item) => sum + item.main.feels_like, 0) /
                   items.length;

                 return bodyDetails(
                   avgWind.toFixed(1),
                   Math.round(avgHumidity),
                   Math.round(avgFeelsLike)
                 );
               })();

               return forcastDayItem(
                 items[0].weather[0].icon,
                 dayFormatter(items[0].dt),
                 Math.round(Math.min(...temps)),
                 Math.round(Math.max(...temps)),
                 items[0].weather[0].description,
                 hourlyItems,
                 bodydetails
               );
             })
             .join("");
         })()}
      </div>
 </div>`;
}
