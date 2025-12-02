import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({ customElement: true })],
  define: {
      'process.env.NODE_ENV': '"production"'
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'WeatherWidget',
      fileName: 'weather-widget',
      formats: ['iife']
    },
    rollupOptions: {
      external: [],
    }
  }
})
