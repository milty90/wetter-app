import { getBackgroundImage } from "./backgroundManager";
import { cityNameCutter, locationFormatter } from "./formatters";
import { renderLoadingScreen } from "./loadingScreen";
import { getSavedCities } from "./localStateManager";
import { getWeatherData } from "./wetterApi";

export async function getMenuOverview() {
  renderLoadingScreen();
  let cities = getSavedCities();

  const cards = [];

  for (let geoCoord of cities) {
    const { lat, lon } = locationFormatter(geoCoord);

    const data = await getWeatherData(lat, lon);

    console.log("data in menu overview: ", data);

    if (data && data.city && data.list && data.list[0]) {
      const bgImage = getBackgroundImage(
        data.list[0].weather[0].id,
        data.list[0].dt,
        data.list[0].sys.pod
      );

      cards.push(
        cardItem(
          lat,
          lon,
          data.city.name,
          data.list[0].weather[0].description,
          data.city.country,
          Math.round(data.list[0].main.temp),
          data.list[0].weather[0].icon,
          bgImage
        )
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
    <p class="menu-divider__subtitle">Deine gespeicherten Orte</p>
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

function cardItem(lat, lon, city, condition, country, temp, icon, bgImage) {
  return `
  <div class="menu-item" data-lat="${lat}" data-lon="${lon}" style="background-image: url('${bgImage}'); background-size: cover; background-position: center;">
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
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="30"
        height="30"
        class="icon"
      ><path
          d="M22,15.04C22,17.23 20.24,19 18.07,19H5.93C3.76,19 2,17.23 2,15.04C2,13.07 3.43,11.44 5.31,11.14C5.28,11 5.27,10.86 5.27,10.71C5.27,9.33 6.38,8.2 7.76,8.2C8.37,8.2 8.94,8.43 9.37,8.8C10.14,7.05 11.13,5.44 13.91,5.44C17.28,5.44 18.87,8.06 18.87,10.83C18.87,10.94 18.87,11.06 18.86,11.17C20.65,11.54 22,13.13 22,15.04Z"
        ></path>
      </svg>
    </div>
  </div>
<span>Suchen</span>
</button>
      </div>`;
}
