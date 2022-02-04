import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { dom } from "@fortawesome/fontawesome-svg-core"

import AppLayout from './layouts/AppLayout'

dom.watch()
library.add(fas)
library.add(fab)

const app = createApp(App)
  .use(store)
  .use(router)
  .component('AppLayout', AppLayout)
  .component('font-awesome-icon', FontAwesomeIcon)

new WaveUI(app)

app.mount('#app')
