import { defineComponent } from 'vue'
import './App.scss'

export const App = defineComponent({
  setup() {
    return () => (
      <div class="page">
        <routerView></routerView>
      </div>
    )
  },
})
