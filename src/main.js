import "./style.scss";
import "/src/wetterApi.js";
import { getOverview } from "./WeatherOverview";

async function init() {
  const html = await getOverview();
  document.querySelector("#app").innerHTML = html;

  // Event listeners hozzáadása MIUTÁN a HTML renderelve van
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
