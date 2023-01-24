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
      component: HomeView
    },
    {
      path: '/castaneda',
      name: 'castaneda',
      component: () => import('../views/FilteredQuotes.vue'),
      props: { pageName: 'все цитаты' },
    },
    {
      path: '/castaneda/books/:id',
      name: 'books',
      component: () => import('../views/FilteredQuotes.vue'),
      meta: { title: 'quotes' }
    },
    {
      path: '/castaneda/themes/:id',
      name: 'themes',
      component: () => import('../views/FilteredQuotes.vue'),
      meta: { title: 'quotes' }
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

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title ? `${to.params.id}, К.Кастанеда` : 'quotes'
  await loadImages()
  next()
})

export default router
