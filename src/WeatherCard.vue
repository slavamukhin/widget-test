<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import { WeatherData } from './types'

const props = defineProps<{ weather: WeatherData }>()
const weatherIcon = computed(() => `https://openweathermap.org/img/wn/${props.weather.weather[0].icon}@2x.png`)

watchEffect(() => {
  console.log('WeatherCard props.weather', props.weather)
})
</script>

<template>
  <Card class="weather-card">
    <template #title>
      <div class="card-title">{{ props.weather.name }}, {{ props.weather.sys.country }}</div>
    </template>

    <template #content>
      <div class="card-weather">
        <div class="card-weather-temp">
          <img :src="weatherIcon" alt="weather icon" />
          <div class="temp-data">{{ props.weather.main.temp }}°C</div>
        </div>

        <div class="card-weather-feel">
          Feels like {{ props.weather.main.feels_like }}°C. {{ props.weather.weather[0].description }}
        </div>

        <Divider />

        <div class="card-weather-params">
          <div>Wind: {{ props.weather.wind.speed }} m/s</div>
          <div>Pressure: {{ props.weather.main.pressure }} hPa</div>
          <div>Visibility: {{ (props.weather.visibility / 1000).toFixed(1) }} km</div>
        </div>
      </div>
    </template>
  </Card>

</template>

<style scoped>
.weather-card {
  width: 250px;
  padding: 1rem;
  border-radius: 0.5rem;
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

.card-weather-params {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: #333;
}
</style>
