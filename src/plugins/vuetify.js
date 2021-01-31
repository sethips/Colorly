import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import appIcon from '../components/icons/AppIcon.vue' // app icon

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: false
  },
  icons: {
    iconfont: 'mdi',
    values: {
      app: {
        component: appIcon,
      }
    },
  },
})
