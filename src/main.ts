import '@/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createHead } from 'unhead'
createHead()
const app = createApp(App)

app.use(createPinia())

app.mount('#app')
