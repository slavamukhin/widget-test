# Widget-test

[Bundle](https://slavamukhin.github.io/widget-test/weather-widget.iife.js)

[Demo repo](https://github.com/slavamukhin/widget-demo)

[Task](https://plumsailteam.sharepoint.com/:w:/s/recruitment/EfN6xudVCOBLheWof-8S9vYB4lMxNaKRiJfm9GEugQsjnQ?rtime=TuNZdF8x3kg)

# Usage
```html
  <weather-widget></weather-widget>
  <weather-widget namespace="seccond" max="3"></weather-widget>
  <script type="text/javascript" src="https://slavamukhin.github.io/widget-test/weather-widget.iife.js"></script>
```
```ts
  interface Widget {
    namespace?: string; // Unique namespace within the app for localStorage separation, 'default' by defult
    max?: number | string; // Max cities, Infinity by default
  }
```