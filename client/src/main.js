import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(BootstrapVue3)
  .mount('#app')
