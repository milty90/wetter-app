const API_KEY = "10abce120a256e5e7252d7164ab73720";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export async function getWeatherData(location) {
  const apiUrl = `${BASE_URL}forecast?q=${location}&appid=${API_KEY}&units=metric&lang=de`;
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
