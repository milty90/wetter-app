import { panelOverview } from "./panelOverview";
import { panelOptions } from "./panelOptions";
import { panelDetails } from "./panelDetails";
import { getWeatherData, getCurrentWeatherData } from "./wetterApi";
import { forecastItem, forcastDayItem } from "./forecast";
import { renderLoadingScreen } from "./loadingScreen";
import { dayFormatter, hourFormatter, escapeHtml } from "./formatters";
import { bodyDetails } from "./bodyDetails";
import { getSavedCities } from "./localStateManager";

export async function getWeatherOverview(cityId, city) {
  renderLoadingScreen(city);

  const data = await getWeatherData(cityId);
  if (!data || !data.list || !data.list[0]) {
    console.error("Fehler beim Laden der Wetterdaten für Stadt-ID:", cityId);
    return null;
  }
  const weatherData = {
    city,
    id: data.list[0].weather[0].id,
    dt: data.list[0].dt,
    sys: data.list[0].sys.pod,
  };

  const currentData = await getCurrentWeatherData(cityId);
  if (!currentData) {
    console.error(
      "Fehler beim Laden der aktuellen Wetterdaten für Stadt-ID:",
      cityId
    );
    return null;
  }

  const currentWeatherData = {
    currentCity: city,
    currentTimezone: currentData.timezone,
    currentId: currentData.weather[0].id,
    currentDt: currentData.dt,
    currentSys: currentData.weather[0].icon.slice(-1),
  };

  const html = await weatherOverview(data, currentData);
  return { html, weatherData, currentWeatherData };
}

export async function weatherOverview(data, currentData) {
  const {
    city: {
      name: city,
      id: cityId,
      coord: { lat: latitude, lon: longitude },
      country,
      sunrise,
      sunset,
      timezone,
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

  const {
    name: currentCity,
    timezone: currentTimezone,
    weather: [{ id: currentWeatherId, description: currentDescription }],
    dt: currentDt,
  } = currentData || {};

  console.log("currentData in weatherOverview: ", currentData);
  console.log("currentCity: ", currentCity);

  const savedCities = getSavedCities();

  const isFavorite = savedCities.some(
    (savedId) => String(savedId) === String(cityId)
  );

  return ` 
  <div class="weather-main">  
  <div class="weather-panel" data-city-id="${escapeHtml(
    String(cityId)
  )}" data-geo-lat="${escapeHtml(String(latitude))}" data-geo-lon="${escapeHtml(
    String(longitude)
  )}">

      ${panelOverview(
        currentCity,
        country,
        currentDt,
        temp,
        temp_max,
        temp_min,
        sunrise,
        sunset,
        currentTimezone
      )}
      ${panelOptions(currentDescription, currentWeatherId, isFavorite)}
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
               hourFormatter(item.dt, timezone) + " Uhr",
               Math.round(item.main.temp)
             )
           )
           .join("")}
           </div>
           <p class="weather-forecast__title-Days ">Die nächsten 4 Tage:</p>
           <div class="weather-forecast__dayItems">
         ${(() => {
           const groupedByDay = {};
           data.list.forEach((item) => {
             const date = new Date((item.dt + timezone) * 1000)
               .toISOString()
               .split("T")[0];
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
                     hourFormatter(item.dt, timezone) + " Uhr",
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
                 dayFormatter(items[0].dt, timezone),
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
