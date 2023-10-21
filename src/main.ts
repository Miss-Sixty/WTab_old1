import '@/styles/index.scss'

import 'simplebar'
import 'simplebar/dist/simplebar.min.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createHead } from 'unhead'

import Button from '@/components/Button.vue'

createHead()
const app = createApp(App)
app.component('Button', Button)

app.use(createPinia())

app.mount('#app')
