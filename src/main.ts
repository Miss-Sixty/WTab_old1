import '@/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { createHead } from 'unhead'

import Button from '@/components/Button.vue'
import ContextMenuVue from '@/components/ContextMenu/index.vue'

createHead()
const app = createApp(App)
app.component('Button', Button)
app.component('ContextMenu', ContextMenuVue)

app.use(createPinia())

app.mount('#app')
