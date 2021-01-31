import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Gradients from '@/components/Gradients'
import Palettes from '@/components/Palettes'
import AboutUs from '@/components/AboutUs'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/gradients',
      name: 'Gradients',
      component: Gradients
    },
    {
      path: '/palettes',
      name: 'Palettes',
      component: Palettes
    },
    {
      path: '/about',
      name: 'About',
      component: AboutUs
    }
  ]
})
