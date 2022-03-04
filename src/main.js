import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import './assets/index.scss'
import ElementPlus from 'element-plus'
import AppLayout from './layouts/AppLayout'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .component('AppLayout', AppLayout)

app.mount('#app')
