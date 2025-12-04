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

    // Get all arrow icons and bodies (multiple items)
    const arrowDownIcons = document.querySelectorAll(
      ".weather-forecast__arrow-down-icon"
    );
    const arrowUpIcons = document.querySelectorAll(
      ".weather-forecast__arrow-up-icon"
    );

    console.log("Found arrows:", {
      arrowDownIcons: arrowDownIcons.length,
      arrowUpIcons: arrowUpIcons.length,
    });

    // Add event listeners to each arrow pair
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

      console.log(`Arrow up ${index}:`, {
        dayItem: !!dayItem,
        bodyDetails: !!bodyDetails,
        hourlyItems: !!hourlyItems,
        divider: !!divider,
        arrowDownIcon: !!arrowDownIcon,
      });

      arrowUpIcon.addEventListener("click", () => {
        console.log(`Arrow up clicked ${index}`);
        arrowUpIcon.style.display = "none";
        if (arrowDownIcon) arrowDownIcon.style.display = "flex";
        if (bodyDetails) bodyDetails.style.display = "none";
        if (hourlyItems) hourlyItems.style.display = "none";
        if (divider) divider.style.display = "none";
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

      console.log(`Arrow down ${index}:`, {
        dayItem: !!dayItem,
        bodyDetails: !!bodyDetails,
        hourlyItems: !!hourlyItems,
        divider: !!divider,
        arrowUpIcon: !!arrowUpIcon,
      });

      arrowDownIcon.addEventListener("click", () => {
        console.log(`Arrow down clicked ${index}`);
        arrowDownIcon.style.display = "none";
        if (arrowUpIcon) arrowUpIcon.style.display = "flex";
        if (bodyDetails) bodyDetails.style.display = "flex";
        if (hourlyItems) hourlyItems.style.display = "flex";
        if (divider) divider.style.display = "block";
        console.log("Body shown");
      });
    });

    if (
      weatherMain &&
      weatherForecastContainer &&
      weatherPanel &&
      weatherForecastTitle
    ) {
      console.log("Setting up scroll listener...");
      weatherMain.addEventListener("scroll", () => {
        console.log("Scroll detected, scrollTop:", weatherMain.scrollTop);
        if (weatherMain.scrollTop > 120) {
          weatherPanel.classList.add("sticky");
          weatherForecastContainer.classList.add("with-sticky-header");
          weatherForecastTitle.classList.add("with-sticky-header");
          console.log("Added sticky class");
        } else {
          weatherPanel.classList.remove("sticky");
          weatherForecastContainer.classList.remove("with-sticky-header");
          weatherForecastTitle.classList.remove("with-sticky-header");
          console.log("Removed sticky class");
        }
      });
    } else {
      console.error("Some sticky elements not found!");
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
  }, 200);
}

init();
