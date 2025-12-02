<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUserLocation } from './getUserLocation'
import { fetchWeatherByCoords } from './weatherApi'
import WeatherCard from './WeatherCard.vue'
import SettingsButton from './SettingsButton.vue'
import SettingCard from './SettingCard.vue'
import { CityResult, WeatherData } from './types'

const weather = ref<WeatherData>()
const loading = ref(true)
const error = ref<string | null>(null)
const settingsVisible = ref(false)

const onSelectedCity = (city: CityResult) => {
  console.log('Выбранный город:', city)
}

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
    <div v-else class="weather-widget">
      <WeatherCard :weather="weather as WeatherData" />
      <SettingsButton v-if="!settingsVisible" @click="settingsVisible = true" />
      <SettingCard v-if="settingsVisible" @close="settingsVisible = false" @select="onSelectedCity" />
    </div>
  </div>
</template>

<style scoped>
.weather-widget-wrapper {
  padding: 10px;
  border: 1px solid #ccc;
  width: 260px;
  font-family: sans-serif;
}

.weather-widget {
  position: relative;
}
</style>