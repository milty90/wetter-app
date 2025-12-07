import { getBackgroundImage } from "./backgroundManager";
import { renderLoadingScreen } from "./loadingScreen";
import { getSavedCities } from "./localStateManager";
import { getWeatherData } from "./wetterApi";

export async function getMenuOverview() {
  renderLoadingScreen();
  let cities = getSavedCities();

  const cards = [];

  for (let city of cities) {
    const data = await getWeatherData(city);

    console.log("Menu Overview Data for city:", city, data);

    if (data && data.city && data.list && data.list[0]) {
      const bgImage = getBackgroundImage(
        data.list[0].weather[0].id,
        data.list[0].dt,
        data.list[0].sys.pod
      );

      cards.push(
        cardItem(
          city,
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

function cardItem(originalCity, city, condition, country, temp, icon, bgImage) {
  return `
  <div class="menu-item" data-city="${originalCity}" style="background-image: url('${bgImage}'); background-size: cover; background-position: center;">
    <div class="menu-item__left-side">
  <div class="menu-item__left-content">
       <img class="menu-item__icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Icon">
       <div class="menu-item__delete-button">
        <img class="menu-item__delete-icon" src="/do-not-enter.svg" alt="Delete Icon">
        </div>
   </div>
     <div class="menu-item__center">
      <div class="menu-item__center-top">
       <h2 class="menu-item__location">${city}</h2>
         <p class="menu-item__country">${country}</p>
       </div>
       <div class="menu-item__center-bottom">
         <p class="menu-item__condition">${condition}</p>
      </div>
    </div>
    </div>
   <div class="menu-item__right">
     <p class="menu-item__temp">${temp}°C</p>
   </div>
</div>`;
}

function searchItem() {
  return `
      <div class="search-container">
        <div class="search-container__button">
          <img src="/search.svg" alt="Search" class="search-container__icon"/>
        </div>
      </div>`;
}
