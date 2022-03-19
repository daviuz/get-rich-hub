import { createApp } from 'vue'
import { VueQueryPlugin } from 'vue-query'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import './assets/index.scss'
import ElementPlus from 'element-plus'
import AppLayout from './layouts/AppLayout'

import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

dom.watch()
library.add(fas)
library.add(fab)
library.add(far)

const app = createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(VueQueryPlugin)
  .component('font-awesome-icon', FontAwesomeIcon)
  .component('AppLayout', AppLayout)

app.mount('#app')
