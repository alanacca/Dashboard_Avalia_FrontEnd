import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import ripple from 'vuetify/lib/directives/ripple';

Vue.config.productionTip = false

new Vue({
  ripple,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
