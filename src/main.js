import "/styles/style.scss";
import "/src/wetterApi.js";
import { getWeatherOverview } from "./weatherOverview.js";
import { getMenuOverview } from "./menuOverview";
import { setBackground } from "./backgroundManager";
import { saveCityInLocalState } from "./localStateManager";
import { deleteSavedCity } from "./localStateManager";
import { searchView } from "./searchView.js";
import { searchCities } from "./wetterApi.js";
import { getIdbyLocationandCountry } from "./wetterApi.js";
import { cityNameCutter } from "./formatters.js";

async function init() {
  const menuHtml = await getMenuOverview();
  document.querySelector("#app").innerHTML = menuHtml;

  setTimeout(() => {
    setupEventListeners();
  }, 200);
}

let listenersAbort = new AbortController();

function setupEventListeners() {
  listenersAbort.abort();
  listenersAbort = new AbortController();
  const signal = listenersAbort.signal;

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

  if (arrowUpIcons.length > 0 && arrowDownIcons.length > 0) {
    arrowUpIcons.forEach((arrowUpIcon, index) => {
      const arrowDownIcon = arrowDownIcons[index];
      const dayItem = arrowUpIcon.closest(".weather-forecast__dayItem");
      const bodyDetails = dayItem?.querySelector(
        ".weather-forecast__body-details"
      );
      const hourlyItems = dayItem?.querySelector(
        ".weather-forecast__hourlyItems"
      );
      const divider = dayItem?.querySelector(
        ".weather-forecast__dayItem-body-divider"
      );

      arrowUpIcon.addEventListener(
        "click",
        () => {
          if (bodyDetails) bodyDetails.classList.remove("show");
          if (hourlyItems) hourlyItems.classList.remove("show");
          if (divider) divider.classList.remove("show");

          setTimeout(() => {
            arrowUpIcon.classList.add("u-hidden");
            arrowUpIcon.classList.remove("u-flex");

            if (arrowDownIcon) {
              arrowDownIcon.classList.remove("u-hidden");
              arrowDownIcon.classList.add("u-flex");
            }
            if (bodyDetails) {
              bodyDetails.classList.add("u-hidden");
              bodyDetails.classList.remove("u-flex");
            }
            if (hourlyItems) {
              hourlyItems.classList.add("u-hidden");
              hourlyItems.classList.remove("u-flex");
            }
            if (divider) {
              divider.classList.add("u-hidden");
              divider.classList.remove("u-block");
            }
          }, 100);
        },
        { signal }
      );
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

      arrowDownIcon.addEventListener(
        "click",
        () => {
          arrowDownIcon.classList.add("u-hidden");
          arrowDownIcon.classList.remove("u-flex");

          if (arrowUpIcon) {
            arrowUpIcon.classList.remove("u-hidden");
            arrowUpIcon.classList.add("u-flex");
          }

          if (bodyDetails) {
            bodyDetails.classList.remove("u-hidden");
            bodyDetails.classList.add("u-flex");
          }
          if (hourlyItems) {
            hourlyItems.classList.remove("u-hidden");
            hourlyItems.classList.add("u-flex");
          }
          if (divider) {
            divider.classList.remove("u-hidden");
            divider.classList.add("u-block");
          }

          setTimeout(() => {
            if (bodyDetails) bodyDetails.classList.add("show");
            if (hourlyItems) hourlyItems.classList.add("show");
            if (divider) divider.classList.add("show");
          }, 100);
        },
        { signal }
      );
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
  const cityIdAttr = document.querySelector(".weather-panel");

  if (
    weatherMain &&
    weatherForecastContainer &&
    weatherPanel &&
    weatherForecastTitle
  ) {
    weatherMain.addEventListener("scroll", () => {
      if (weatherMain.scrollTop > 120) {
        weatherPanel.classList.add("weather-panel--sticky");
        weatherForecastContainer.classList.add("with-sticky-header");
        weatherForecastTitle.classList.add("with-sticky-header");

        if (menuButton) {
          menuButton.classList.add("u-hidden");
          menuButton.classList.remove("u-block");
        }
        if (cancelButton) {
          cancelButton.classList.add("u-hidden");
          cancelButton.classList.remove("u-block");
        }
        if (favoriteButton) {
          favoriteButton.classList.add("u-hidden");
          favoriteButton.classList.remove("u-block");
        }
        if (arrowButton) {
          arrowButton.classList.add("u-hidden");
          arrowButton.classList.remove("u-block");
        }
      } else {
        weatherPanel.classList.remove("weather-panel--sticky");
        weatherForecastContainer.classList.remove("with-sticky-header");
        weatherForecastTitle.classList.remove("with-sticky-header");

        if (menuButton) {
          menuButton.classList.remove("u-hidden");
          menuButton.classList.add("u-block");
        }
        if (cancelButton) {
          cancelButton.classList.add("u-hidden");
          cancelButton.classList.remove("u-block");
        }
        if (favoriteButton) {
          favoriteButton.classList.add("u-hidden");
          favoriteButton.classList.remove("u-block");
        }
        if (arrowButton) {
          arrowButton.classList.add("u-hidden");
          arrowButton.classList.remove("u-block");
        }
      }
    });
  }

  if (menuButton) {
    menuButton.addEventListener("click", () => {
      if (weatherPanel?.classList.contains("weather-panel--sticky")) {
        return;
      }

      menuButton.classList.add("weather-panel__option-button--rotating-exit");
      menuButton.classList.remove(
        "weather-panel__option-button--rotation-reset"
      );

      setTimeout(() => {
        menuButton.classList.add("u-hidden");
        menuButton.classList.remove("u-block");
        menuButton.classList.remove(
          "weather-panel__option-button--rotating-exit"
        );
        menuButton.classList.add(
          "weather-panel__option-button--rotation-reset"
        );

        if (cancelButton) {
          cancelButton.classList.remove("u-hidden");
          cancelButton.classList.add("u-block");
        }
        if (arrowButton) {
          arrowButton.classList.remove("u-hidden");
          arrowButton.classList.add("u-block");
        }
        if (favoriteButton) {
          favoriteButton.classList.remove("u-hidden");
          favoriteButton.classList.add("u-block");
        }

        if (cancelButton) {
          cancelButton.classList.add(
            "weather-panel__option-button--fading-out"
          );
          cancelButton.classList.remove(
            "weather-panel__option-button--fading-in"
          );
        }
        if (arrowButton) {
          arrowButton.classList.add("weather-panel__option-button--fading-out");
          arrowButton.classList.remove(
            "weather-panel__option-button--fading-in"
          );
        }
        if (favoriteButton) {
          favoriteButton.classList.add(
            "weather-panel__option-button--fading-out"
          );
          favoriteButton.classList.remove(
            "weather-panel__option-button--fading-in"
          );
        }

        setTimeout(() => {
          if (cancelButton) {
            cancelButton.classList.remove(
              "weather-panel__option-button--fading-out"
            );
            cancelButton.classList.add(
              "weather-panel__option-button--fading-in"
            );
          }
        }, 50);
        setTimeout(() => {
          if (arrowButton) {
            arrowButton.classList.remove(
              "weather-panel__option-button--fading-out"
            );
            arrowButton.classList.add(
              "weather-panel__option-button--fading-in"
            );
          }
        }, 100);
        setTimeout(() => {
          if (favoriteButton) {
            favoriteButton.classList.remove(
              "weather-panel__option-button--fading-out"
            );
            favoriteButton.classList.add(
              "weather-panel__option-button--fading-in"
            );
          }
        }, 150);
      }, 150);
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      cancelButton.classList.add("weather-panel__option-button--rotating-exit");
      cancelButton.classList.remove(
        "weather-panel__option-button--rotation-reset"
      );

      setTimeout(() => {
        if (arrowButton) {
          arrowButton.classList.add("u-hidden");
          arrowButton.classList.remove("u-block");
        }
        if (favoriteButton) {
          favoriteButton.classList.add("u-hidden");
          favoriteButton.classList.remove("u-block");
        }
        cancelButton.classList.add("u-hidden");
        cancelButton.classList.remove("u-block");
        cancelButton.classList.remove(
          "weather-panel__option-button--rotating-exit"
        );
        cancelButton.classList.add(
          "weather-panel__option-button--rotation-reset"
        );

        menuButton.classList.remove("u-hidden");
        menuButton.classList.add("u-block");
        menuButton.classList.add("weather-panel__option-button--fading-out");
        menuButton.classList.remove("weather-panel__option-button--fading-in");

        setTimeout(() => {
          menuButton.classList.remove(
            "weather-panel__option-button--fading-out"
          );
          menuButton.classList.add("weather-panel__option-button--fading-in");
        }, 50);
      }, 150);
    });
  }

  if (favoriteButton) {
    favoriteButton.addEventListener("click", () => {
      const cityIdValue = cityIdAttr.getAttribute("data-city-id");

      saveCityInLocalState(cityIdValue);
      favoriteButton.remove();
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
          icon.classList.add("u-hidden");
          icon.classList.remove("u-block");
        });
        deleteIcons.forEach((deleteIcon) => {
          deleteIcon.classList.remove("u-hidden");
          deleteIcon.classList.add("u-block");
        });
        editButton.textContent = "Fertig";
        isEditing = true;
      } else {
        menuItemIcons.forEach((icon) => {
          icon.classList.remove("u-hidden");
          icon.classList.add("u-block");
        });
        deleteIcons.forEach((deleteIcon) => {
          deleteIcon.classList.add("u-hidden");
          deleteIcon.classList.remove("u-block");
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
        const cityId = menuItem.getAttribute("data-city-id");

        deleteSavedCity(cityId);
        menuItem.remove();

        const remainingItems = document.querySelectorAll(".menu-item");
        if (remainingItems.length === 0) {
          const subtitle = document.querySelector(".menu-divider__subtitle");
          if (subtitle) {
            subtitle.textContent = "Keine gespeicherten Orte";
          }
        }
      });
    });
  }

  if (menuItem) {
    menuItem.forEach((item) => {
      item.addEventListener("click", () => {
        const locationElement = item.querySelector(".menu-item__location");
        const cityName = locationElement.textContent;
        const cityId = item.getAttribute("data-city-id");

        getWeatherOverview(cityId, cityName).then(
          ({ html, weatherData, currentWeatherData }) => {
            document.querySelector("#app").innerHTML = html;
            setBackground(
              currentWeatherData.currentId,
              currentWeatherData.currentDt,
              currentWeatherData.currentSys
            );
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

  const searchInput = document.getElementById("searchInput");
  const searchResults = document.getElementById("searchResults");
  searchInput.focus();

  let debounceTimer;

  searchInput.addEventListener("input", async (e) => {
    const query = e.target.value.trim();

    clearTimeout(debounceTimer);

    if (query.length < 2) {
      searchResults.innerHTML = "";
      return;
    }

    searchResults.innerHTML =
      '<div class="search-view__loading">Suche...</div>';

    debounceTimer = setTimeout(async () => {
      try {
        const cities = await searchCities(query);
        console.log("cities from search: ", cities);
        await displaySearchResults(cities, searchResults);
      } catch (error) {
        searchResults.innerHTML =
          '<div class="search-view__error">Bei der Suche ist ein Fehler aufgetreten.</div>';
      }
    }, 300);
  });

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
async function displaySearchResults(cities, resultsContainer) {
  if (cities.length === 0) {
    resultsContainer.innerHTML =
      '<div class="search-view__no-results">Kein Ergebnis</div>';
    return;
  }

  resultsContainer.innerHTML = cities
    .map((city) => {
      const country = city.country || "";
      const state = city.state ? `, ${city.state}` : "";
      const geoLat = city.lat;
      const geoLon = city.lon;

      return `
      <div class="search-view__result-item" data-geo-lat="${geoLat}" data-geo-lon="${geoLon}" data-city="${city.name}" data-country="${country}">
        <div class="search-view__result-name">${city.name}</div>
       <div class="search-view__result-details">${country}${state}</div>
      </div>
    `;
    })
    .join("");

  resultsContainer
    .querySelectorAll(".search-view__result-item")
    .forEach((item) => {
      item.addEventListener("click", async () => {
        const cityName = item.getAttribute("data-city");
        const country = item.getAttribute("data-country");

        const cityId = await getIdbyLocationandCountry(
          cityNameCutter(cityName),
          country
        );

        if (!cityId) {
          alert(
            "Die Wetterdaten für diese Stadt konnten nicht gefunden werden."
          );
          return;
        }

        const result = await getWeatherOverview(cityId, cityName);

        if (!result) {
          alert(
            "Fehler beim Laden der Wetterdaten. Bitte versuchen Sie es erneut."
          );
          const menuHtml = await getMenuOverview();
          document.querySelector("#app").innerHTML = menuHtml;
          setTimeout(() => setupEventListeners(), 200);
          closeSearchModal();
          return;
        }

        const { html, weatherData, currentWeatherData } = result;
        document.querySelector("#app").innerHTML = html;
        setBackground(
          currentWeatherData.currentId,
          currentWeatherData.currentDt,
          currentWeatherData.currentSys
        );
        closeSearchModal();
        requestAnimationFrame(() => setupEventListeners());
      });
    });
}

init();
