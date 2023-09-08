import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { veeValidatePlugin } from './plugins/validation'
import router from './router'
import i18n from './includes/i18n'

import Icon from './directives/icon'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(veeValidatePlugin)
app.use(i18n)

app.directive('icon', Icon)

app.mount('#app')
