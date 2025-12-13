export function saveCityInLocalState(id) {
  const idString = String(id);
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  if (!cities.includes(idString)) {
    cities.push(idString);
    localStorage.setItem("cities", JSON.stringify(cities));
  }
}

export function getSavedCities() {
  return (JSON.parse(localStorage.getItem("cities")) || []).map((id) =>
    String(id)
  );
}

export function deleteSavedCity(id) {
  const idString = String(id);
  let cities = JSON.parse(localStorage.getItem("cities")) || [];
  cities = cities.filter((savedCityId) => savedCityId !== idString);
  localStorage.setItem("cities", JSON.stringify(cities));
}
