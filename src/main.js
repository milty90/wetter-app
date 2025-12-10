import "/styles/style.scss";
import "/src/wetterApi.js";
import { getWeatherOverview } from "./WeatherOverview";
import { getMenuOverview } from "./menuOverview";
import { setBackground } from "./backgroundManager";
import { saveCityInLocalState } from "./localStateManager";
import { deleteSavedCity } from "./localStateManager";
import { searchView } from "./searchView.js";
import { searchCities } from "./wetterApi.js";

async function init() {
  const menuHtml = await getMenuOverview();
  document.querySelector("#app").innerHTML = menuHtml;

  setTimeout(() => {
    setupEventListeners();
  }, 200);
}

function setupEventListeners() {
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

  if (arrowUpIcons) {
    if (!arrowDownIcons) return;
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
      });
    });
  }

  if (arrowDownIcons) {
    if (!arrowUpIcons) return;
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
      });
    });
  }

  const menuButton = document.getElementById("menu");
  const cancelButton = document.getElementById("cancel");
  const favoriteButton = document.getElementById("favorite");
  const arrowButton = document.getElementById("arrow");
  const editButton = document.querySelector(".menu-divider__button");
  const menuItem = document.querySelectorAll(".menu-item");
  const menuItemIcons = document.querySelectorAll(".menu-item__icon");
  const deleteIcons = document.querySelectorAll(".menu-item__delete-icon");
  const searchButton = document.querySelector(".search-container__button");
  const city = document.querySelector(".weather-panel__header-location");

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

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      if (weatherPanel?.classList.contains("sticky")) {
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
    });
  }

  if (favoriteButton) {
    favoriteButton.addEventListener("click", () => {
      const cityName = city.textContent;
      console.log("Favorisieren:", cityName);
      saveCityInLocalState(cityName);
      document.querySelector("#app").innerHTML = menuHtml;
      setTimeout(() => setupEventListeners(), 200);
    });
  }

  if (arrowButton) {
    arrowButton.addEventListener("click", async () => {
      const menuHtml = await getMenuOverview();
      document.querySelector("#app").innerHTML = menuHtml;
      setTimeout(() => setupEventListeners(), 200);
    });
  }

  if (editButton) {
    let isEditing = false;

    editButton.addEventListener("click", () => {
      if (!isEditing) {
        menuItemIcons.forEach((icon) => {
          icon.style.display = "none";
        });
        deleteIcons.forEach((deleteIcon) => {
          deleteIcon.style.display = "block";
        });
        editButton.textContent = "Fertig";
        isEditing = true;
      } else {
        menuItemIcons.forEach((icon) => {
          icon.style.display = "block";
        });
        deleteIcons.forEach((deleteIcon) => {
          deleteIcon.style.display = "none";
        });
        editButton.textContent = "Bearbeiten";
        isEditing = false;
      }
    });
  }

  if (deleteIcons) {
    deleteIcons.forEach((deleteIcon) => {
      deleteIcon.addEventListener("click", (event) => {
        event.stopPropagation();

        const menuItem = deleteIcon.closest(".menu-item");
        const cityName = menuItem.getAttribute("data-city");

        deleteSavedCity(cityName);
        menuItem.remove();
      });
    });
  }

  if (menuItem) {
    menuItem.forEach((item) => {
      item.addEventListener("click", () => {
        const locationElement = item.querySelector(".menu-item__location");
        const cityName = locationElement.textContent;
        const countryElement = item.querySelector(".menu-item__country");
        const countryCode = countryElement.textContent;

        console.log("Gewählte Stadt:", cityName, countryCode);

        getWeatherOverview(cityName, countryCode).then(
          ({ html, weatherData }) => {
            document.querySelector("#app").innerHTML = html;
            setBackground(weatherData.id, weatherData.dt, weatherData.sys);

            setTimeout(() => setupEventListeners(), 200);
          }
        );
      });
    });
  }

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      openSearchModal();
    });
  }
}

function openSearchModal() {
  const modalHtml = searchView();
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  setTimeout(() => {
    document.getElementById("searchModal").classList.add("show");
  }, 10);

  document
    .getElementById("closeSearchModal")
    .addEventListener("click", closeSearchModal);

  document.getElementById("searchModal").addEventListener("click", (e) => {
    if (e.target.id === "searchModal") {
      closeSearchModal();
    }
  });

  // Focus input
  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  searchInput.focus();

  // Valós idejű keresés az input változásakor
  searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.trim();

    if (query.length < 2) {
      searchResults.innerHTML = "";
      return;
    }

    try {
      const cities = await searchCities(query);
      displaySearchResults(cities, searchResults);
    } catch (error) {
      console.error("Fehler bei der Suche:", error);
      searchResults.innerHTML =
        '<div class="search-view__error">Bei der Suche ist ein Fehler aufgetreten.</div>';
    }
  });

  // Enter billentyű az első találat kiválasztására
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const firstResult = searchResults.querySelector(
        ".search-view__result-item"
      );
      if (firstResult) {
        firstResult.click();
      }
    }
  });
}

function closeSearchModal() {
  const modal = document.getElementById("searchModal");
  modal.classList.remove("show");

  setTimeout(() => {
    modal.remove();
  }, 300);

  document.removeEventListener("keydown", handleEscapeKey);
}

function handleEscapeKey(e) {
  if (e.key === "Escape") {
    closeSearchModal();
  }
}

function displaySearchResults(cities, resultsContainer) {
  if (cities.length === 0) {
    resultsContainer.innerHTML =
      '<div class="search-view__no-results">Kein Ergebnis</div>';
    return;
  }

  resultsContainer.innerHTML = cities
    .map((city) => {
      const country = city.country || "";
      const state = city.state ? `, ${city.state}` : "";
      return `
      <div class="search-view__result-item" data-city="${city.name}" data-country="${country}">
        <div class="search-view__result-name">${city.name}</div>
        <div class="search-view__result-details">${country}${state}</div>
      </div>
    `;
    })
    .join("");

  // Kattintás esemény minden találatra
  resultsContainer
    .querySelectorAll(".search-view__result-item")
    .forEach((item) => {
      item.addEventListener("click", () => {
        const cityName = item.getAttribute("data-city");
        const countryCode = item.getAttribute("data-country");

        getWeatherOverview(cityName, countryCode).then(
          ({ html, weatherData }) => {
            document.querySelector("#app").innerHTML = html;
            setBackground(weatherData.id, weatherData.dt, weatherData.sys);
            closeSearchModal();
            setTimeout(() => setupEventListeners(), 200);
          }
        );
      });
    });
}

init();
