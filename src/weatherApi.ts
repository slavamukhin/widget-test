const API_KEY = "02824533832ec37dab2f769bc33aaa21";

export async function fetchWeatherByCoords(lat: number, lon: number) {
  const url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`

  const response = await fetch(url);
  if (!response.ok) throw new Error("Ошибка запроса погоды по координатам");

  return await response.json();
}
