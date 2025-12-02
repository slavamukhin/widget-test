import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({ customElement: true })],
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'WeatherWidget',
      fileName: 'weather-widget',
      formats: ['iife'] // чтобы подключать через <script>
    }
  }
})
