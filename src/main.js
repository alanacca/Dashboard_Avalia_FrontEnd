import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import ripple from 'vuetify/lib/directives/ripple';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(IconsPlugin)
Vue.use(BootstrapVue)

new Vue({
  ripple,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
