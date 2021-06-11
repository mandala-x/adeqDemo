import Vue from 'vue'
import Router from 'vue-router'
import operation from '@/views/operation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'operation',
      component: operation
    }
  ]
})
