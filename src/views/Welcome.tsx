import { defineComponent } from "vue"
import { RouterView } from "vue-router"
import s from './Welcome.module.scss'
import mangosteen from '../assets/icons/mangosteen.svg'
export const Welcome = defineComponent({
  setup: (props, context) => {
    return () => <div class={s.wrapper}>
      <header>
        <img src={mangosteen}/>
        <h1>山竹记账</h1>
      </header>
      <main class={s.main}><RouterView/></main>
      <footer></footer>
    </div>
  }
})