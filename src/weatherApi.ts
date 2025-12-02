import { CityResult, WeatherData } from "./types";

const API_KEY = "02824533832ec37dab2f769bc33aaa21";

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`

  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка запроса погоды по координатам");

  return await response.json();
}

export async function fetchCityList(q: string): Promise<CityResult[]> {
  const url =
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${API_KEY}`

  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка запроса городов");

  return await response.json();
}
