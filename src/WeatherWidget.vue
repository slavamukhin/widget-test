<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getUserLocation } from './getUserLocation'
import { fetchWeatherByCoords } from './weatherApi'
import WeatherCard from './WeatherCard.vue'
import SettingsButton from './SettingsButton.vue'
import SettingCard from './SettingCard.vue'
import { CityResult, WeatherData, CityList } from './types'

const props = defineProps<{
  max?: number | string
  namespace?: string
}>()

const getMaxCount = (): number => {
  if (props.max == null) return Infinity
  const num = Number(props.max)
  if (isNaN(num) || num <= 0) return 1
  return Math.round(num)
}

const getNameSpace = (): string => {
  return props.namespace != null ? props.namespace : 'default'
}

console.log('props', props)
const NAMESPACE = `Weather-widgetCYTY_LIST-${getNameSpace()}`
const cityList = ref<CityList[]>(JSON.parse(localStorage.getItem(NAMESPACE) ?? '[]'))
const weatherList = ref<WeatherData[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const settingsVisible = ref(false)
const maxCount = getMaxCount()

const saveToLS = (): void => {
  localStorage.setItem(NAMESPACE, JSON.stringify(cityList.value))
}

const loadWeather = async (lat: number, lon: number) => {
  const w = await fetchWeatherByCoords(lat, lon)
  weatherList.value.push(w)
  return w
}

const onSelectedCity = async (city: CityResult): Promise<void> => {
  if (cityList.value.length >= maxCount) {
    console.log(`Невозможно добавить больше ${maxCount}`)
    return
  }
  const exists = cityList.value.some(c => c.lat === city.lat && c.lon === city.lon)
  if (!exists) {
    const c = {
      name: city.name,
      country: city.country,
      lat: city.lat,
      lon: city.lon
    }

     const w = await loadWeather(city.lat, city.lon)
     cityList.value.push({...c, id: w.id})
  }
}

const onRemoveCity = (data: CityResult): void => {
  console.log('cityToRemove', data)
  cityList.value = cityList.value.filter(city => city.id !== data.id)
  weatherList.value = weatherList.value.filter(weather => weather.id !== data.id)
}

window.addEventListener('beforeunload', saveToLS)

onMounted(async () => {
  try {
    if (cityList.value.length === 0) {
      const loc = await getUserLocation()
      const w = await loadWeather(loc.lat as number, loc.lon as number)

      cityList.value.push({
        name: w.name,
        country: w.sys.country,
        lat: w.coord.lat,
        lon: w.coord.lon,
        id: w.id
      })
    } else {
      for (const city of cityList.value) {
        await loadWeather(city.lat, city.lon)
      }
    }
  } catch (err: any) {
    error.value = err?.message ?? "Ошибка при получении данных"
  } finally {
    loading.value = false
  }
})

onBeforeUnmount(() => window.removeEventListener('beforeunload', saveToLS))
console.log('weatherList', weatherList.value)
</script>

<template>
  <div class="weather-widget-wrapper">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>

    <div v-else class="weather-widget">
      <div
        class="weather-card-wrapper"
        v-for="weather in weatherList"
        :key="weather.id"
      >
        <WeatherCard :weather="weather" />
      </div>

      <SettingsButton v-if="!settingsVisible" @click="settingsVisible = true" />

      <SettingCard :city-list="cityList" v-if="settingsVisible" @close="settingsVisible = false" @select="onSelectedCity" @remove="onRemoveCity" />
    </div>
  </div>
</template>

<style scoped>
.weather-widget-wrapper {
  padding: 10px;
  border: 1px solid #ccc;
  width: 300px;
  font-family: sans-serif;
}

.weather-widget {
  position: relative;
}

.weather-card-wrapper {
  margin-bottom: 10px;
}

.weather-card-wrapper:last-child {
  margin-bottom: 0;
}
</style>
