import './styles/index.less';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import dateToToday from './plugins/dateToToday';
import Mock from './mock';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(dateToToday)

app.mount('#app')
