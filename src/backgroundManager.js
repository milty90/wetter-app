export function getBackgroundImage(weatherId, timestamp, sys) {
  const hour = new Date(timestamp * 1000).getHours();

  const isDay = sys === "d";
  const timeOfDay = isDay ? "day" : "night";

  let weather = "clear";
  if (weatherId >= 200 && weatherId < 300) weather = "thunderstrom";
  else if (weatherId >= 300 && weatherId < 501) weather = "drizzle";
  else if (weatherId >= 501 && weatherId < 600) weather = "rain";
  else if (weatherId >= 600 && weatherId < 700) weather = "snow";
  else if (weatherId >= 700 && weatherId < 800) weather = "mist";
  else if (weatherId === 800) weather = "clear";
  else if (weatherId >= 801 && weatherId <= 802) weather = "clouds";
  else if (weatherId > 802) weather = "overcast";

  const imagePath = `/backgrounds/${timeOfDay}_${weather}.jpg`;
  return imagePath;
}

export function setBackground(weatherId, timestamp, sys) {
  const bgImage = getBackgroundImage(weatherId, timestamp, sys);

  const isDay = sys === "d";

  setTimeout(() => {
    const weatherMain = document.querySelector(".weather-main");
    const locationIcon = document.querySelector(
      ".weather-panel__header-location-icon"
    );
    const location = document.querySelector(".weather-panel__header-location");
    // const current_date = document.querySelector(".weather-panel__current-date");
    // const condition_text = document.querySelector(
    //   ".weather-panel__condition-text"
    // );

    if (weatherMain) {
      weatherMain.style.setProperty("--bg-image", `url('${bgImage}')`);
      weatherMain.style.backgroundImage = `url('${bgImage}')`;
      weatherMain.style.backgroundSize = "cover";

      if (isDay) {
        if (locationIcon) {
          locationIcon.style.filter = "invert(90%) ";
        }
        if (location) {
          location.style.color = "rgba(255, 255, 255, 0.9)";
        }
      } else if (!isDay) {
        if (locationIcon) {
          locationIcon.style.filter = "invert(10%)";
        }
        if (location) {
          location.style.color = "rgba(0, 0, 0, 0.8)";
        }
      }
    } else {
      console.error("weather-main element not found!");
    }
  }, 200);
}
