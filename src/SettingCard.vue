<script setup lang="ts">
import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div class="setting-card">
    <div class="card-header">
      <div class="card-title">Settings</div>
      <button class="close-button" @click="$emit('close')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <div class="card-content">
      <div>Настройка 1</div>
      <div>Настройка 2</div>
      <div>Настройка 3</div>
    </div>
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
  margin-bottom: 0.5rem;
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
  display: flex;
  align-items: center;
}

.close-button svg {
  width: 20px;
  height: 20px;
  stroke: #333;
}

.close-button:hover svg {
  stroke: red;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #333;
}
</style>
