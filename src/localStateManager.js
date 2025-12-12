export function saveCityInLocalState(id) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!cities.includes(id)) {
    cities.push(id);
    localStorage.setItem("cities", JSON.stringify(cities));
  }
}

export function getSavedCities() {
  return JSON.parse(localStorage.getItem("cities")) || [];
}

export function deleteSavedCity(id) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities = cities.filter((savedCityId) => savedCityId !== id);
  localStorage.setItem("cities", JSON.stringify(cities));
}
