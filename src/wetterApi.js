const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/";

export async function getWeatherData(id) {
  console.log("Wetterdaten für Stadt-ID werden abgerufen: ", id);
  const apiUrl = `${BASE_URL}forecast?id=${id}&appid=${API_KEY}&units=metric&lang=de`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Die Wetterdaten konnten nicht abgerufen werden.");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Abrufen der Wetterdaten:", error);
    return null;
  }
}

export async function getCurrentWeatherData(id) {
  console.log("Aktuelle Wetterdaten für Stadt-ID werden abgerufen: ", id);
  const apiUrl = `${BASE_URL}weather?id=${id}&appid=${API_KEY}&units=metric&lang=de`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(
        "Die aktuellen Wetterdaten konnten nicht abgerufen werden."
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fehler beim Abrufen der aktuellen Wetterdaten:", error);
    return null;
  }
}

export async function getIdbyLocationandCountry(cityName, country) {
  const forecastUrl = `${BASE_URL}forecast?q=${encodeURIComponent(
    cityName
  )},${country}&appid=${API_KEY}&units=metric&lang=de`;
  const response = await fetch(forecastUrl);
  if (!response.ok) {
    console.error("Die Daten für den ID-Abruf konnten nicht abgerufen werden.");
    return;
  }
  const forecastData = await response.json();
  return forecastData?.city?.id;
}

export async function searchCities(query) {
  const url = `${GEO_URL}direct?q=${query}&limit=5&appid=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      "Die Daten für die Stadtsuche konnten nicht abgerufen werden."
    );
  }
  return await response.json();
}
