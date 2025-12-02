<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserLocation } from './getUserLocation'
import { fetchWeatherByCoords } from './weatherApi'
import WeatherCard from './WeatherCard.vue'
import { WeatherData } from './types'

const weather = ref<WeatherData>()
const loading = ref(true)
const error = ref<string | null>(null)

onMounted(async () => {
  try {
    const loc = await getUserLocation()
    console.log("User location:", loc)

    if (loc.lat && loc.lon) {
      weather.value = await fetchWeatherByCoords(loc.lat, loc.lon)
    }
  } catch (err: any) {
    error.value = err?.message ?? "Ошибка при получении данных"
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="weather-widget-wrapper">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <div v-else>
      <WeatherCard :weather="weather as WeatherData" />
    </div>
  </div>
</template>

<style>
.weather-widget-wrapper {
  padding: 10px;
  border: 1px solid #ccc;
  width: 200px;
}
</style>
