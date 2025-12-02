import { defineCustomElement } from 'vue'
import WeatherWidget from './WeatherWidget.vue'


const element = defineCustomElement(WeatherWidget)
customElements.define('weather-widget', element)
