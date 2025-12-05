import "/styles/style.scss";
import "/src/wetterApi.js";
import { getOverview } from "./WeatherOverview";
import { setBackground } from "./backgroundManager";

async function init() {
  const { html, weatherData } = await getOverview();
  document.querySelector("#app").innerHTML = html;

  setBackground(weatherData.id, weatherData.dt, weatherData.sys);

  setTimeout(() => {
    const weatherMain = document.querySelector(".weather-main");
    const weatherPanel = document.querySelector(".weather-panel");
    const weatherForecastTitle = document.querySelector(
      ".weather-forecast__title-Hours"
    );
    const weatherForecastContainer = document.querySelector(
      ".weather-forecast__container"
    );

    const arrowDownIcons = document.querySelectorAll(
      ".weather-forecast__arrow-down-icon"
    );
    const arrowUpIcons = document.querySelectorAll(
      ".weather-forecast__arrow-up-icon"
    );

    arrowUpIcons.forEach((arrowUpIcon, index) => {
      const arrowDownIcon = arrowDownIcons[index];
      const dayItem = arrowUpIcon.closest(".weather-forecast__dayItem-body");
      const bodyDetails = dayItem?.querySelector(
        ".weather-forecast__body-details"
      );
      const hourlyItems = dayItem?.querySelector(
        ".weather-forecast__hourlyItems"
      );
      const divider = dayItem?.querySelector(
        ".weather-forecast__dayItem-body-divider"
      );

      arrowUpIcon.addEventListener("click", () => {
        console.log(`Arrow up clicked ${index}`);

        if (bodyDetails) bodyDetails.classList.remove("show");
        if (hourlyItems) hourlyItems.classList.remove("show");
        if (divider) divider.classList.remove("show");

        setTimeout(() => {
          arrowUpIcon.style.display = "none";
          if (arrowDownIcon) arrowDownIcon.style.display = "flex";
          if (bodyDetails) bodyDetails.style.display = "none";
          if (hourlyItems) hourlyItems.style.display = "none";
          if (divider) divider.style.display = "none";
        }, 100);

        console.log("Body hidden");
      });
    });

    arrowDownIcons.forEach((arrowDownIcon, index) => {
      const arrowUpIcon = arrowUpIcons[index];
      const dayItem = arrowDownIcon.closest(".weather-forecast__dayItem");
      const bodyDetails = dayItem?.querySelector(
        ".weather-forecast__body-details"
      );
      const hourlyItems = dayItem?.querySelector(
        ".weather-forecast__hourlyItems"
      );
      const divider = dayItem?.querySelector(
        ".weather-forecast__dayItem-body-divider"
      );

      arrowDownIcon.addEventListener("click", () => {
        console.log(`Arrow down clicked ${index}`);
        arrowDownIcon.style.display = "none";
        if (arrowUpIcon) arrowUpIcon.style.display = "flex";

        if (bodyDetails) bodyDetails.style.display = "flex";
        if (hourlyItems) hourlyItems.style.display = "flex";
        if (divider) divider.style.display = "block";

        setTimeout(() => {
          if (bodyDetails) bodyDetails.classList.add("show");
          if (hourlyItems) hourlyItems.classList.add("show");
          if (divider) divider.classList.add("show");
        }, 10);

        console.log("Body shown");
      });
    });

    const menuButton = document.getElementById("menu");
    const cancelButton = document.getElementById("cancel");
    const favoriteButton = document.getElementById("favorite");
    const arrowButton = document.getElementById("arrow");

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

          if (menuButton) menuButton.style.display = "none";
          if (cancelButton) cancelButton.style.display = "none";
          if (favoriteButton) favoriteButton.style.display = "none";
          if (arrowButton) arrowButton.style.display = "none";
        } else {
          weatherPanel.classList.remove("sticky");
          weatherForecastContainer.classList.remove("with-sticky-header");
          weatherForecastTitle.classList.remove("with-sticky-header");

          if (menuButton) menuButton.style.display = "block";
          if (cancelButton) cancelButton.style.display = "none";
          if (favoriteButton) favoriteButton.style.display = "none";
          if (arrowButton) arrowButton.style.display = "none";
        }
      });
    }
    // else {
    //   console.error("Some sticky elements not found!");
    // }

    if (menuButton) {
      menuButton.addEventListener("click", () => {
        if (weatherPanel.classList.contains("sticky")) {
          return;
        }

        menuButton.style.transform = "rotate(90deg) scale(0.8)";
        setTimeout(() => {
          menuButton.style.display = "none";
          menuButton.style.transform = "";

          cancelButton.style.display = "block";
          arrowButton.style.display = "block";
          favoriteButton.style.display = "block";

          cancelButton.style.opacity = "0";
          arrowButton.style.opacity = "0";
          favoriteButton.style.opacity = "0";

          setTimeout(() => {
            cancelButton.style.opacity = "1";
          }, 50);
          setTimeout(() => {
            arrowButton.style.opacity = "1";
          }, 100);
          setTimeout(() => {
            favoriteButton.style.opacity = "1";
          }, 150);
        }, 150);
      });
    }

    if (cancelButton) {
      cancelButton.addEventListener("click", () => {
        cancelButton.style.transform = "rotate(90deg) scale(0.8)";

        setTimeout(() => {
          arrowButton.style.display = "none";
          favoriteButton.style.display = "none";
          cancelButton.style.display = "none";
          cancelButton.style.transform = "";

          menuButton.style.display = "block";
          menuButton.style.opacity = "0";
          setTimeout(() => {
            menuButton.style.opacity = "1";
          }, 50);
        }, 150);

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
  }, 200);
}

init();
