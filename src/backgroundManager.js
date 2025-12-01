export function getBackgroundImage(weatherId, timestamp, sys) {
  const hour = new Date(timestamp * 1000).getHours();

  console.log("sys : ", sys);
  const isDay = sys === "d";
  const timeOfDay = isDay ? "day" : "night";

  let weather = "clear";
  if (weatherId >= 200 && weatherId < 300) weather = "thunderstorm";
  else if (weatherId >= 300 && weatherId < 600) weather = "rain";
  else if (weatherId >= 600 && weatherId < 700) weather = "snow";
  else if (weatherId >= 700 && weatherId < 800) weather = "mist";
  else if (weatherId === 800) weather = "clear";
  else if (weatherId >= 801 && weatherId <= 802) weather = "clouds";
  else if (weatherId > 802) weather = "overcast";

  return `/backgrounds/${timeOfDay}_${weather}.jpg`;
}

export function setBackground(weatherId, timestamp, sys) {
  const bgImage = getBackgroundImage(weatherId, timestamp, sys);

  setTimeout(() => {
    const weatherMain = document.querySelector(".weather-main");
    if (weatherMain) {
      weatherMain.style.backgroundImage = `url('${bgImage}')`;
      weatherMain.style.backgroundSize = "cover";
      weatherMain.style.backgroundPosition = "center";
    }
  }, 100);
}
