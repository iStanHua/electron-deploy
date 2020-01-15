import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/components/layout/index.vue'

import homePage from '@/views/index.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          meta: {
            title: '登录MySQL',
            max: false
          },
          component: () => import('@/views/login.vue')
        },
        {
          path: 'index',
          meta: {
            title: 'MySQL',
            max: true
          },
          component: homePage
        },
        {
          path: '*',
          meta: {
            title: '404'
          },
          component: () => import('@/views/common/notFound.vue')
        }

      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

router.afterEach(() => {
  window.scrollTo(0, 0)
})

export default router