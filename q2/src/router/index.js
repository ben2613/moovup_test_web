import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import DetailsView from '../views/DetailsView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ListView,
      meta: {
        title: 'My Friends'
      }
    },
    {
      path: '/friends/:id',
      name: 'details',
      component: DetailsView,
      meta: {
        title: 'Your Friend'
      }
    },
    {
      path: '/404',
      component: NotFound,
      meta: {
        title: 'Page Not Found'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    }
  ]
})

export default router
