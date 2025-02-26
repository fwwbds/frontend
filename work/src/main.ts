import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import router from './routes'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#root')
app.use(router);
app.use(ElementPlus)
app.mount('#app')