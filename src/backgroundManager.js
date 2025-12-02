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

  return `/backgrounds/${timeOfDay}_${weather}.jpg`;
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
      // Set background on ::before pseudo-element via CSS custom property
      weatherMain.style.setProperty("--bg-image", `url('${bgImage}')`);

      // Set overlay color based on day/night
      if (isDay) {
        console.log("Is day mode, checking weatherId:", weatherId);
        // Drizzle weather
        if (
          (weatherId >= 300 && weatherId < 501) ||
          (weatherId >= 501 && weatherId < 800) ||
          (weatherId >= 700 && weatherId < 800) ||
          (weatherId >= 801 && weatherId <= 802) ||
          weatherId > 802
        ) {
          console.log("Applying drizzle colors!");
          if (locationIcon) {
            locationIcon.style.filter =
              "invert(10%) drop-shadow(2px 2px 2px #ffffffff)";
          }
          if (location) {
            location.style.color = "#242424";
            location.style.fontWeight = "bold";
            location.style.fontSize = "26px";
            location.style.textShadow =
              "-1px -1px 0 #ffffff5c, 1px -1px 0 #ffffff80, -1px 1px 0 #ffffff80, 1px 1px 0 #ffffffff";
          }
          if (current_date) {
            current_date.style.color = "#EB6E4C";
            current_date.style.fontWeight = "bold";
            current_date.style.fontSize = "20px";
            current_date.style.textShadow = "#282828ff 0.5px 0.5px 0.5px";
          }
          if (condition_text) {
            condition_text.style.color = "#EB6E4C";
            condition_text.style.fontWeight = "bold";
            condition_text.style.fontSize = "20px";
            condition_text.style.textShadow = "#282828ff 0.5px 0.5px 0.5px";
          }
        }
      } else {
        if (
          (weatherId >= 600 && weatherId < 700) ||
          (weatherId >= 300 && weatherId < 501)
        ) {
          if (locationIcon) {
            locationIcon.style.filter =
              "invert(10%) drop-shadow(1px 1px 1px #ffffffff)";
          }
          if (location) {
            location.style.color = "#242424";
            location.style.fontWeight = "bold";
            location.style.fontSize = "26px";
            location.style.textShadow =
              "-1px -1px 0 #ffffff5c, 1px -1px 0 #ffffff80, -1px 1px 0 #ffffff80, 1px 1px 0 #ffffffff";
          }
          if (current_date) {
            current_date.style.color = "#EB6E4C";
            current_date.style.fontWeight = "bold";
            current_date.style.fontSize = "20px";
            current_date.style.textShadow = "#282828ff 0.5px 0.5px 0.5px";
          }
          if (condition_text) {
            condition_text.style.color = "#EB6E4C";
            condition_text.style.fontWeight = "bold";
            condition_text.style.fontSize = "20px";
            condition_text.style.textShadow = "#282828ff 0.5px 0.5px 0.5px";
          }
        }
      }

      console.log("Background set successfully");
    } else {
      console.error("weather-main element not found!");
    }
  }, 100);
}
