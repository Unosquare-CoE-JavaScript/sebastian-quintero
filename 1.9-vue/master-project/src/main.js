import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { veeValidatePlugin } from './plugins/validation'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(veeValidatePlugin)

app.mount('#app')
