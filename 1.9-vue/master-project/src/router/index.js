import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const HomeView = () => import('../views/HomeView.vue')
const AboutView = () => import('../views/AboutView.vue')
const ManageView = () => import('../views/ManageView.vue')
const SongView = () => import('../views/SongView.vue')

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
      path: '/about/:member',
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
