const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/";

export async function getWeatherData(lat, lon) {
  // const apiUrl = `${BASE_URL}forecast?q=${location},${country}&appid=${API_KEY}&units=metric&lang=de`;
  const apiUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=de`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Could not fetch weather data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

export async function searchCities(query) {
  const city = `${BASE_URL}weather?q=${query}&appid=${API_KEY}`;
  const url = `${GEO_URL}direct?q=${query}&limit=5&appid=${API_KEY}`;

  const response = await fetch(url);

  // if (response.ok) {
  //   throw new Error("Fehler beim Abrufen der Stadtdaten");
  // }

  return await response.json();
}
