import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ManageView from '../views/ManageView.vue'
import SongView from '../views/SongView.vue'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomeView
    },
    {
      name: 'about',
      path: '/about',
      component: AboutView
    },
    {
      name: 'manage',
      path: '/manage',
      component: ManageView,
      beforeEnter(to, from, next) {
        next()
      },
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/manage-music',
      redirect: { name: 'manage' }
    },
    {
      name: 'song',
      path: '/song/:id',
      component: SongView
    },
    {
      path: '/:catchAll(.*)*',
      redirect: { name: 'home' }
    }
  ],
  linkExactActiveClass: 'text-yellow-500'
})

router.beforeEach((to, from, next) => {
  // Also available in the Vue dev-tools extension
  // console.log('[global-guard]', { to, from })

  if (!to.meta.requiresAuth) {
    next()
    return
  }

  const store = useUserStore()
  if (store.isLoggedIn) {
    next()
    return
  }

  next({ name: 'home' })
})

export default router
