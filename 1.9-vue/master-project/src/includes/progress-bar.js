import nProgress from "nprogress"

export default function progress(router) {
  router.beforeEach((to, from, next) => {
    nProgress.start();
    next()
  })

  router.afterEach(nProgress.done)
}
