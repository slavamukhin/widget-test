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
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
        unsafe: true,
        unsafe_math: true,
        unsafe_methods: true,
        unsafe_proto: true,
        unsafe_undefined: true,
        dead_code: true,
        join_vars: true,
        collapse_vars: true,
        reduce_vars: true
      },
      mangle: {
        toplevel: true,
        safari10: false,
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false,
        beautify: false,
        preamble: '/* WeatherWidget - minified */'
      }
    },
    cssCodeSplit: false,
    sourcemap: false,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    emptyOutDir: true,
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        compact: true,
        generatedCode: {
          arrowFunctions: true,
          constBindings: true
        },
        indent: false,
        semicolons: false
      }
    },
    modulePreload: false,
    assetsInlineLimit: 4096
  }
})