import { defineCustomElement } from 'vue'
import WeatherWidget from './WeatherWidget.vue'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

const element = defineCustomElement(WeatherWidget)
customElements.define('weather-widget', element)
