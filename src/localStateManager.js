export function saveCityInLocalState(city) {
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!cities.includes(city)) {
    cities.push(city);
    localStorage.setItem("cities", JSON.stringify(cities));
  }
}

export function getSavedCities() {
  return JSON.parse(localStorage.getItem("cities")) || [];
}

export function clearSavedCities() {
  localStorage.removeItem("cities");
}
