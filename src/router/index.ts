import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { NUMBER_OF_IMAGES } from "@/constants";

const loadImages = () => {
  const images: string[] = []
  for (let i = 1; i <= NUMBER_OF_IMAGES; i++) {
    images.push(`images/random/image_${i}.jpg`)
  }

  images.map((item: any, i) => {
    const img = new Image();
    img.src = images[i];
  });
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'quotes' },
    },
    {
      path: '/castaneda',
      name: 'castaneda',
      component: () => import('../views/FilteredQuotes.vue'),
      meta: { title: 'Карлос Кастанеда', author: 'castaneda' },
      props: { pageName: 'все цитаты' },
    },
    {
      path: '/castaneda/books/:id',
      name: 'books',
      component: () => import('../views/FilteredQuotes.vue'),
      meta: { title: 'Карлос Кастанеда', author: 'castaneda' },
    },
    {
      path: '/castaneda/themes/:id',
      name: 'themes',
      component: () => import('../views/FilteredQuotes.vue'),
      meta: { title: 'Карлос Кастанеда', author: 'castaneda' },
    },
    {
      path: '/castaneda/random',
      name: 'random',
      component: () => import('../views/FilteredQuotes.vue'),
      meta: { title: 'Карлос Кастанеда', author: 'castaneda' },
      props: { pageName: 'рандом' }
    },
    {
      path: '/nisargadatta',
      name: 'nisargadatta',
      component: () => import('../views/FilteredQuotes.vue'),
      meta: { title: 'Нисаргадатта Махарадж', author: 'nisargadatta' },
      props: { pageName: 'все цитаты'},
    },
    {
      path: '/nisargadatta/random',
      name: 'nisargadatta random',
      component: () => import('../views/FilteredQuotes.vue'),
      meta: { title: 'Нисаргадатта Махарадж', author: 'nisargadatta' },
      props: { pageName: 'рандом' }
    },
    {
      path: '/filterAll',
      name: 'filterAll',
      component: () => import('../views/FilteredQuotes.vue'),
      meta: { title: 'quotes' },
      props: { pageName: 'все цитаты' }
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'home' },
    },
  ]
})

router.beforeEach(async (to, from, next) => {
  document.title = `${to.params.id ? to.params.id : to.meta.title}`
  await loadImages()
  next()
})

export default router
