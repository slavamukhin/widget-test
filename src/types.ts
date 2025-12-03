export interface WeatherData {
  id: number
  name: string
  sys: { country: string }
  weather: { description: string, icon: string, main: string }[]
  main: { temp: number, feels_like: number; pressure: number, humidity: number }
  wind: { speed: number }
  visibility: number
  coord: { lat: number, lon: number }
}

export interface CityResult {
  name: string
  lat: number
  lon: number
  country: string
  state?: string
  id?: number
}

export type CityList = Omit<CityResult, 'state'>
