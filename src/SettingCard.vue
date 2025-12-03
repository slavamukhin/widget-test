<script setup lang="ts">
import CitySearch from './CitySearch.vue'
import type { CityList, CityResult } from './types'

const props = defineProps<{
  cityList: CityList[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', city: CityResult): void
  (e: 'remove', city: CityList): void
}>()

const removeCity = (city: CityList): void => {
  emit('remove', city)
}
console.log('cityList', props.cityList)
</script>

<template>
  <div class="setting-card">
    <div class="card-header">
      <div class="card-title">Settings</div>
      <button class="close-button" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
             viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <div class="city-list">
      <div
        class="city-item"
        v-for="city in cityList"
        :key="city.id"
      >
        <div class="drag-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
               viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="5" r="1"/>
            <circle cx="12" cy="12" r="1"/>
            <circle cx="12" cy="19" r="1"/>
          </svg>
        </div>

        <div class="city-info">
          <div class="name">{{ city.name }}</div>
          <div class="country">{{ city.country }}</div>
        </div>

        <button class="remove-button" @click="removeCity(city)">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
               viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2"
               stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14H6L5 6"/>
            <path d="M10 11v6"/>
            <path d="M14 11v6"/>
          </svg>
        </button>
      </div>
    </div>

    <CitySearch @select="$emit('select', $event)" />
  </div>
</template>

<style scoped>
.setting-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 1rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  font-weight: bold;
  font-size: 1.2rem;
}

.close-button {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
}

.close-button svg {
  stroke: #333;
}
.close-button:hover svg {
  stroke: red;
}

.city-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1rem;
}

.city-item {
  display: flex;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fafafa;
  gap: 10px;
}

.drag-icon {
  cursor: grab;
  padding: 4px;
  opacity: 0.6;
}

.city-info {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
  font-size: 14px;
}

.country {
  font-size: 12px;
  color: #666;
}

.remove-button {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 4px;
}

.remove-button svg {
  stroke: #444;
}

.remove-button:hover svg {
  stroke: #d11;
}
</style>
