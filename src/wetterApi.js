const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/";

export async function getWeatherData(id) {
  // const apiUrl = `${BASE_URL}forecast?q=${location},${country}&appid=${API_KEY}&units=metric&lang=de`;
  // const apiUrl = `${BASE_URL}forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=de`;
  console.log("Fetching weather data for city ID: ", id);

  const apiUrl = `${BASE_URL}forecast?id=${id}&appid=${API_KEY}&units=metric&lang=de`;

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

export async function getIdbyLocationandCountry(cityName, country) {
  const forecastUrl = `${BASE_URL}forecast?q=${encodeURIComponent(
    cityName
  )},${country}&appid=${API_KEY}&units=metric&lang=de`;
  const resp = await fetch(forecastUrl);
  if (!resp.ok) {
    console.error("Could not fetch forecast data for ID retrieval");
    return;
  }
  const forecastData = await resp.json();
  return forecastData?.city?.id;
}

export async function searchCities(query) {
  const url = `${GEO_URL}direct?q=${query}&limit=5&appid=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Could not fetch city data");
  }
  return await response.json();
}
