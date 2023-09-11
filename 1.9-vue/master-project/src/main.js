import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { veeValidatePlugin } from './plugins/validation'
import router from './router'
import i18n from './includes/i18n'
import GlobalComponents from './includes/_globals'
import { registerSW } from 'virtual:pwa-register'
import Icon from './directives/icon'
import progress from './includes/progress-bar'
import 'nprogress/nprogress.css'

registerSW({ immediate: true })

progress(router)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(veeValidatePlugin)
app.use(i18n)
app.use(GlobalComponents)

app.directive('icon', Icon)

app.mount('#app')
