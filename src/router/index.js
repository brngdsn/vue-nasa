import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Nasa from '@/components/Nasa'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/nasa'
    },
    {
      path: '/',
      name: 'Hello',
      component: Hello,
      children: [
        {
          path: '/nasa',
          name: 'Nasa',
          component: Nasa
        }
      ]
    }
  ]
})
