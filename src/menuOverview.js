import { getBackgroundImage } from "./backgroundManager";
import { cityNameCutter } from "./formatters";
import { renderLoadingScreen } from "./loadingScreen";
import { getSavedCities } from "./localStateManager";
import { getCurrentWeatherData, getWeatherData } from "./wetterApi";

export async function getMenuOverview() {
  renderLoadingScreen();
  let cities = getSavedCities();

  const cards = [];

  for (let cityId of cities) {
    const data = await getWeatherData(cityId);
    const currentData = await getCurrentWeatherData(cityId);

    console.log("Daten in Menüübersicht: ", currentData);

    if (
      currentData &&
      currentData.name &&
      currentData.weather &&
      currentData.weather[0]
    ) {
      const bgImage = getBackgroundImage(
        currentData.weather[0].id,
        currentData.dt,
        currentData.weather[0].icon.slice(-1),
      );

      cards.push(
        cardItem(
          currentData.id,
          currentData.name,
          currentData.weather[0].description,
          currentData.sys.country,
          Math.round(currentData.main.temp),
          currentData.weather[0].icon,
          bgImage,
        ),
      );
    }
  }

  return menuOverview(cards.join(""));
}

export function menuOverview(cardsHtml) {
  return `<div class="menu-main">
  <div class="menu-head">
  <img class="menu-logo" src="/weather-icons/few-clouds.svg" alt="Logo"/>
    <h1 class="menu-title">WETTER</h1>
  </div>
  <div class="menu-divider">
    ${
      cardsHtml
        ? '<p class="menu-divider__subtitle">Deine gespeicherten Orte</p>'
        : '<p class="menu-divider__subtitle">Keine gespeicherten Orte</p>'
    }
     <button class="menu-divider__button"> Bearbeiten </button>
    </div>
  <div class="menu-body"> 
    <div class="menu-body__list">
    ${cardsHtml}
    </div>
    
  </div>
  ${searchItem()}
</div>`;
}

function cardItem(cityId, city, condition, country, temp, icon, bgImage) {
  return `
  <div class="menu-item" data-city-id="${cityId}" style="background-image: url('${bgImage}'); background-size: cover; background-position: center;">
    <div class="menu-item__left-side">
  <div class="menu-item__left-content">
       <img class="menu-item__icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
       <div class="menu-item__delete-button">
        <img class="menu-item__delete-icon" src="/do-not-enter.svg" alt="Delete Icon">
        </div>
   </div>
     <div class="menu-item__center">
      <div class="menu-item__center-top">
       <h2 class="menu-item__location">${cityNameCutter(city)}</h2>
         <p class="menu-item__country">${country}</p>
       </div>
       <div class="menu-item__center-bottom">
         <p class="menu-item__condition">${condition}</p>
      </div>
    </div>
    </div>
   <div class="menu-item__right">
     <p class="menu-item__temp">${temp}</p>
      <p class="menu-item__temp-unit">°C</p>
   </div>
</div>`;
}

function searchItem() {
  return `
  <div class="search-container">
    <button class="search-container__button" id="open-search-button">
      <div class="svg-wrapper-1">
        <div class="svg-wrapper">
        <svg 
        viewBox="0 0 24 24" 
        class="icon"
        fill="none"
         width="30"
        height="30"
        xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0">
        </g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
        </g><g id="SVGRepo_iconCarrier"> 
        <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="#8f8f8f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
      
      
    </div>
  </div>
<span>Suchen</span>
</button>
      </div>`;
}
