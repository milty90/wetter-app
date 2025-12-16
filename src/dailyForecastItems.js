import { forecastItem, forcastDayItem } from "./forecast";
import { dayFormatter, hourFormatter } from "./formatters";
import { bodyDetails } from "./bodyDetails";

export function generateHourlyForecast(data, timezone) {
  return data.list
    .slice(0, 8)
    .map((item) =>
      forecastItem(
        item.weather[0].icon,
        hourFormatter(item.dt, timezone) + " Uhr",
        Math.round(item.main.temp)
      )
    )
    .join("");
}

export function generateDailyForecast(data, timezone) {
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
          items.reduce((sum, item) => sum + item.wind.speed, 0) / items.length;
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
}
