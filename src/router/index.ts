import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/nolibrary',
      name: 'nolibrary',
      component: () => import('../views/NoLibrary.vue'),
    },
    {
      path: '/veevalidate',
      name: 'veevalidate',
      component: () => import('../views/VeeValidate.vue'),
    },
    {
      path: '/formkit',
      name: 'formkit',
      component: () => import('../views/FormKit.vue'),
    },
  ],
})

export default router
