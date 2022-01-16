import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as firebase from "firebase/app";
import { firebaseConfig } from '../configs/fireBase'

const firebaseApp = firebase.initializeApp(firebaseConfig)

createApp(App).use(store).use(router).use(firebaseApp).mount('#app')
