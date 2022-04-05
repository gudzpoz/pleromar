import { createApp } from 'vue'
import App from './App.vue'
import '@mdi/font/css/materialdesignicons.css'

document.getElementById('start').onclick = () => {
  createApp(App).mount('#app')
  document.getElementById('start').style.display = 'none'
}
