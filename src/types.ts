export interface WeatherData {
  name: string
  sys: { country: string }
  weather: { description: string; icon: string, main: string }[]
  main: { temp: number; feels_like: number; pressure: number, humidity: number }
  wind: { speed: number }
  visibility: number
}

export interface CityResult {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
}
