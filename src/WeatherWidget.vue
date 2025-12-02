<template>
  <div class="weather-widget">
    <p>Погода будет здесь</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'WeatherWidget'
})
</script>

<style>
.weather-widget {
  padding: 10px;
  border: 1px solid #ccc;
  width: 200px;
}
</style>
