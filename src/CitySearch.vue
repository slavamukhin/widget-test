<script setup lang="ts">
import { ref } from "vue"
import { fetchCityList } from './weatherApi'
import { CityResult } from './types'

const emit = defineEmits<{
  (e: "select", city: CityResult): void
}>()

const query = ref<string>("")
const suggestions = ref<CityResult[]>([])
const loading = ref(false)
const showList = ref(false)

let debounceTimer: number | undefined

function debounce(fn: Function, delay = 500) {
  return (...args: any[]) => {
    clearTimeout(debounceTimer)
    debounceTimer = window.setTimeout(() => fn(...args), delay)
  }
}

async function fetchCities(q: string) {
  if (!q.trim()) {
    suggestions.value = []
    showList.value = false
    return
  }

  loading.value = true
  try {
    const data = await fetchCityList(q)
    suggestions.value = data
    showList.value = true
  } finally {
    loading.value = false
  }
}

const debouncedSearch = debounce(fetchCities, 400)

function selectCity(city: CityResult) {
  emit("select", city)
  query.value = ''
  showList.value = false
}
</script>

<template>
  <div class="city-search">
    <input
      v-model="query"
      @input="debouncedSearch(query)"
      @focus="query && suggestions.length && (showList = true)"
      type="text"
      placeholder="Enter city name"
      class="search-input"
    />

    <div v-if="loading" class="loader">Searching...</div>

    <ul v-if="showList && suggestions.length" class="suggestions">
      <li
        v-for="city in suggestions"
        :key="city.lat + city.lon"
        @click="selectCity(city)"
        class="suggestion-item"
      >
        <div class="name">{{ city.name }}, {{ city.country }}</div>
        <div class="meta">
          <span>{{ city.country }}</span>
          <span v-if="city.state">, {{ city.state }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.city-search {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: 1px solid #bbb;
  font-size: 14px;
}

.suggestions {
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  border-radius: 6px;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  z-index: 20;
  padding: 0;
  margin: 0;
}

.suggestion-item {
  list-style: none;
  padding: 8px;
  cursor: pointer;
  transition: background 0.15s;
}

.suggestion-item:hover {
  background: #f2f2f2;
}

.meta {
  font-size: 12px;
  color: #666;
}

.loader {
  margin-top: 4px;
  font-size: 12px;
  color: #666;
}
</style>
