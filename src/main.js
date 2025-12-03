import "/styles/style.scss";
import "/src/wetterApi.js";
import { getOverview } from "./WeatherOverview";
import { setBackground } from "./backgroundManager";

async function init() {
  const { html, weatherData } = await getOverview();
  document.querySelector("#app").innerHTML = html;

  setBackground(weatherData.id, weatherData.dt, weatherData.sys);

  // Sticky header on scroll
  const weatherMain = document.querySelector(".weather-main");
  const weatherPanel = document.querySelector(".weather-panel");
  const weatherForecastTitle = document.querySelector(
    ".weather-forecast__title-Hours "
  );
  const weatherForecastContainer = document.querySelector(
    ".weather-forecast__container"
  );

  if (
    weatherMain &&
    weatherForecastContainer &&
    weatherPanel &&
    weatherForecastTitle
  ) {
    weatherMain.addEventListener("scroll", () => {
      if (weatherMain.scrollTop > 120) {
        weatherPanel.classList.add("sticky");
        weatherForecastContainer.classList.add("with-sticky-header");
        weatherForecastTitle.classList.add("with-sticky-header");
      } else {
        weatherPanel.classList.remove("sticky");
        weatherForecastContainer.classList.remove("with-sticky-header");
        weatherForecastTitle.classList.remove("with-sticky-header");
      }
    });
  }

  const menuButton = document.getElementById("menu");
  const cancelButton = document.getElementById("cancel");
  const favoriteButton = document.getElementById("favorite");
  const arrowButton = document.getElementById("arrow");

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      cancelButton.style.display = "block";
      arrowButton.style.display = "block";
      favoriteButton.style.display = "block";
      menuButton.style.display = "none";
      console.log("Menu button clicked");
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      menuButton.style.display = "block";
      arrowButton.style.display = "none";
      favoriteButton.style.display = "none";
      cancelButton.style.display = "none";
      console.log("Menu button clicked");
    });
  }

  if (favoriteButton) {
    favoriteButton.addEventListener("click", () => {
      console.log("Favorite button clicked");
    });
  }

  if (arrowButton) {
    arrowButton.addEventListener("click", () => {
      console.log("Arrow button clicked");
    });
  }
}

init();
