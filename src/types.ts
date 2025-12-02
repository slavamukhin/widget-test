export interface WeatherData {
  name: string
  sys: { country: string }
  weather: { description: string; icon: string }
  main: { temp: number; feels_like: number; pressure: number }
  wind: { speed: number }
  visibility: number
}