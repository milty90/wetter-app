const APIKEY = "8d884744842ab6341434a68ebb5aaeac";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

export async function getWeatherData(location) {
  const apiUrl = `${BASE_URL}weather?q=${location}&appid=${APIKEY}&units=metric&lang=de`;
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
