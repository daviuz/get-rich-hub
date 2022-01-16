import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from '../configs/fireBase'

const firebaseApp = initializeApp(firebaseConfig)

createApp(App).use(store).use(router).use(firebaseApp).mount('#app')
