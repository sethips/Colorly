// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuetify from '@/plugins/vuetify' // path to vuetify export
import VueClipboard from 'vue-clipboard2' // Copy to clipboard

Vue.config.productionTip = false
export const eventBus = new Vue();

Vue.use(VueClipboard, router)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data: {
    message: ''
  },
  router,
  vuetify,
  components: {
    App
  },
  template: '<App/>'
})
