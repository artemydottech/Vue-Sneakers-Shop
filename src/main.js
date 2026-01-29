<<<<<<< HEAD
import './assets/main.scss'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(autoAnimatePlugin)

app.mount('#app')
=======
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
>>>>>>> 92226327ca8c82e7fbcc3e69e321266e4bfcb895
