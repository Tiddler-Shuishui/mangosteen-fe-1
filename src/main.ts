import { createApp } from 'vue'
import { App } from './App'
import { routes } from './config/routes'
import { history } from './shared/history'
import { createRouter } from 'vue-router'
import '@svgstore'
import { createPinia, storeToRefs } from 'pinia'
import { useMeStore } from './stores/useMeStore'

const router = createRouter({ history, routes })
const pinia = createPinia()
const app = createApp(App)

const whiteList: Record<string, 'exact' | 'startsWith'> = {
  '/': 'exact',
  '/start': 'exact',
  '/welcome': 'startsWith',
  '/sign_in': 'startsWith'
}

router.beforeEach((to, from) => {
  for (const key in whiteList) {
    const value = whiteList[key]
    if (value === 'exact' && to.path === key) {
      return true
    }
    if (value === 'startsWith' && to.path.startsWith(key)) {
      return true
    }
  }
  return mePromise!.value!.then(
    () => true,
    () => '/sign_in?return_to' + from.path
  )
})

app.use(router)
app.use(pinia)
app.mount('#app')

const meStore = useMeStore()
const { mePromise } = storeToRefs(meStore)
meStore.refreshMe()
