import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/castaneda',
      name: 'castaneda',
      component: () => import('../views/FilteredQuotes.vue'),
      props: { pageName: 'все цитаты' }
    },
    {
      path: '/castaneda/books/:id',
      name: 'books',
      component: () => import('../views/FilteredQuotes.vue'),
    },
    {
      path: '/castaneda/themes/:id',
      name: 'themes',
      component: () => import('../views/FilteredQuotes.vue'),
    },
    {
      path: '/castaneda/random',
      name: 'random',
      component: () => import('../views/FilteredQuotes.vue'),
      props: { pageName: 'рандом' }
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'home' },
    },
  ]
})

export default router
