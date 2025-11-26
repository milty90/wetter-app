import "./style.scss";
import "/src/wetterApi.js";
import { getOverview } from "./WeatherOverview";

async function init() {
  const html = await getOverview();
  document.querySelector("#app").innerHTML = html;
}

init();
