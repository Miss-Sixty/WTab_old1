import '@/styles/index.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import '@/plugins'
import widgets from '@/widgets/index'

import Button from '@/components/Button.vue'
import Dialog from '@/components/Dialog.vue'

const app = createApp(App)
app.component('Button', Button)
app.component('Dialog', Dialog)

app.use(createPinia()).use(widgets)

app.mount('#app')
