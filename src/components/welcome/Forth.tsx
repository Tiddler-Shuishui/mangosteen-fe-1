import { defineComponent } from "vue"
import s from './First.module.scss'
import cloud from '../../assets/icons/cloud.svg'
import { RouterLink } from "vue-router"
export const Forth = defineComponent({
  setup: (props, context) => {
    return () => (
      <div class={s.wrapper}>
        <div class={s.card}>
          <img src={cloud}></img>
          <h2>云备份<br/>再也不怕数据丢失</h2>
        </div>
        <div class={s.actions}>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
          <RouterLink to="/start">完成</RouterLink>
          <RouterLink class={s.fake} to="/start">跳过</RouterLink>
        </div>
      </div>
    )
  }
})