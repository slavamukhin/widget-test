<script setup lang="ts">
import { computed } from 'vue'
import { WeatherData } from './types'

const props = defineProps<{ weather: WeatherData }>()
const weatherIcon = computed(() => `https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`)
</script>

<template>
  <div class="weather-card">
    <div class="card-title">
      {{ props.weather.name }}, {{ props.weather.sys.country }}
    </div>

    <div class="card-weather">
      <div class="card-weather-temp">
        <img :src="weatherIcon" alt="weather icon" />
        <div class="temp-data">{{ props.weather.main.temp }}°C</div>
      </div>

      <div class="card-weather-feel">
        Feels like {{ props.weather.main.feels_like }}°C. {{ props.weather.weather[0].main }}, {{ props.weather.weather[0].description }}
      </div>

      <div class="card-divider"></div>

      <div class="card-weather-params">
        <div>Wind: {{ props.weather.wind.speed }} m/s</div>
        <div>Pressure: {{ props.weather.main.pressure }} hPa</div>
        <div>Visibility: {{ (props.weather.visibility / 1000).toFixed(1) }} km</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.weather-card {
  width: 250px;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f9f9f9;
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
  background-color: #ddd;
  margin: 0.5rem 0;
}

.card-weather-params {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: #333;
}
</style>

