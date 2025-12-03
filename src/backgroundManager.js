export function getBackgroundImage(weatherId, timestamp, sys) {
  const hour = new Date(timestamp * 1000).getHours();

  console.log("sys : ", sys);
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
  console.log("Generated image path:", imagePath);
  return imagePath;
}

export function setBackground(weatherId, timestamp, sys) {
  const bgImage = getBackgroundImage(weatherId, timestamp, sys);
  console.log("Setting background to:", bgImage);
  console.log("weatherId:", weatherId, "isDay:", sys === "d");

  const isDay = sys === "d";

  setTimeout(() => {
    const weatherMain = document.querySelector(".weather-main");
    const locationIcon = document.querySelector(
      ".weather-panel__header__location-icon"
    );
    const location = document.querySelector(".weather-panel__header__location");
    const current_date = document.querySelector(".weather-panel__current-date");
    const condition_text = document.querySelector(
      ".weather-panel__condition-text"
    );

    console.log("Elements found:", {
      weatherMain: !!weatherMain,
      location: !!location,
      current_date: !!current_date,
      condition_text: !!condition_text,
    });

    if (weatherMain) {
      weatherMain.style.setProperty("--bg-image", `url('${bgImage}')`);
      weatherMain.style.backgroundImage = `url('${bgImage}')`;
      weatherMain.style.backgroundSize = "cover";

      if (isDay) {
        if (locationIcon) {
          locationIcon.style.filter = "invert(90%) ";
        }
        if (location) {
          location.style.color = "rgba(255, 255, 255, 0.8)";
        }
      } else {
        if (locationIcon) {
          locationIcon.style.filter = "invert(10%)";
        }
        if (location) {
          location.style.color = "rgba(0, 0, 0, 0.8)";
        }
      }

      console.log("Background set successfully");
    } else {
      console.error("weather-main element not found!");
    }
  }, 100);
}
