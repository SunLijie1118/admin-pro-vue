import './styles/index.less'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import dateToToday from './plugins/dateToToday'
import countTransform from './plugins/countTransform'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// 插件
app.use(dateToToday).use(countTransform)
app.mount('#app')
