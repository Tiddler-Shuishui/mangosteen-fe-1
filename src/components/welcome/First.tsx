import s from './WelcomeLayout.module.scss'
import pig from '../../assets/icons/pig.svg'
import { RouterLink } from "vue-router"
import { WelcomeLayout } from "./WelcomeLayout"
export const First = (
  <WelcomeLayout>
    {{
      icon: () => <img src={pig}></img>,
      title: () => <h2>会挣钱<br />还要会省钱</h2>,
      actions: () => <>
        <RouterLink class={s.fake} to="/start">跳过</RouterLink>
        <RouterLink to="/welcome/2">下一页</RouterLink>
        <RouterLink to="/start">跳过</RouterLink>
      </>
    }}
  </WelcomeLayout>
)