import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue({ 
    customElement: true,
    template: {
      compilerOptions: {
        whitespace: 'condense',
        comments: false
      }
    }
  })],
  define: {
    'process.env.NODE_ENV': '"production"',
    '__VUE_OPTIONS_API__': false,
    '__VUE_PROD_DEVTOOLS__': false,
    '__VUE_PROD_HYDRATION_MISMATCH_DETAILS__': false
  },
  build: {
    target: 'es2020',
    lib: {
      entry: 'src/main.ts',
      name: 'WeatherWidget',
      fileName: 'weather-widget',
      formats: ['iife']
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 2
      },
      format: {
        comments: false
      }
    },
    cssCodeSplit: false,
    sourcemap: false,
    // УБЕРИТЕ external или закомментируйте:
    rollupOptions: {
      // external: ['vue'], // ← УДАЛИТЬ или ЗАКОММЕНТИРОВАТЬ!
      output: {
        // globals: { // ← УДАЛИТЬ если убрали external
        //   vue: 'Vue'
        // },
        compact: true
      }
    }
  }
})