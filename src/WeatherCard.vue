<script setup lang="ts">
import { computed } from 'vue'
import { WeatherData } from './types'

const { weather } = defineProps<{ weather: WeatherData }>()
const weatherIcon = computed(() => `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`)
</script>

<template>
  <div class="weather-card">
    <div class="card-title">
      {{ weather.name }}, {{ weather.sys.country }}
    </div>

    <div class="card-weather">
      <div class="card-weather-temp">
        <img :src="weatherIcon" alt="weather icon" />
        <div class="temp-data">{{ weather.main.temp }}°C</div>
      </div>

      <div class="card-weather-feel">
        Feels like {{ weather.main.feels_like }}°C. {{ weather.weather[0].main }}, {{ weather.weather[0].description }}
      </div>

      <div class="card-divider"></div>

      <div class="card-weather-params">
        <div>
          <div>Wind: {{ weather.wind.speed }}m/s</div>
          <div>Visibility: {{ (weather.visibility / 1000).toFixed() }}km</div>
        </div>
        <div>
          <div>Pressure: {{ weather.main.pressure }}hPa</div>
          <div>Humidity : {{ weather.main.humidity  }}%</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #dfdfdf;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  font-family: sans-serif;
}

.card-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.card-weather {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-weather-temp {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card-weather-temp img {
  width: 50px;
  height: 50px;
}

.temp-data {
  font-size: 1.4rem;
  font-weight: bold;
}

.card-weather-feel {
  font-size: 0.9rem;
  color: #555;
}

.card-divider {
  height: 1px;
  background-color: #c7c7c7;
  margin: 0.5rem 0;
}

.card-weather-params {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: #333;
}
</style>

