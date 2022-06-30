import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import ripple from 'vuetify/lib/directives/ripple';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/tooltip.sass'
import VTooltip from 'v-tooltip'

Vue.config.productionTip = false

Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.use(VTooltip)

new Vue({
  ripple,
  router,
  vuetify,
  VTooltip,
  render: h => h(App)
}).$mount('#app')
