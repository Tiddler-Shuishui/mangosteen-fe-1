import { defineComponent } from "vue"
import s from './WelcomeLayout.module.scss'
import clock from '../../assets/icons/clock.svg'
import { RouterLink } from "vue-router"
import { WelcomeLayout } from "./WelcomeLayout"
export const Second = defineComponent({
  setup: (props, context) => {
    return () => (
      <WelcomeLayout>
        {{
          icon: () => <img src={clock}></img>,
          title: () => <h2>每日提醒<br/>不会遗漏每一笔账单</h2>,
          actions: () => <>
            <RouterLink class={s.fake} to="/start">跳过</RouterLink>
            <RouterLink to="/welcome/3">下一页</RouterLink>
            <RouterLink to="/start">跳过</RouterLink>
          </>
        }}
      </WelcomeLayout>
    )
  }
})