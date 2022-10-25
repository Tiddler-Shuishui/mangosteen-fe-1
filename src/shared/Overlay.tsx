import { defineComponent, PropType } from "vue"
import { RouterLink } from "vue-router"
import { Icon } from "./Icon"
import s from './Overlay.module.scss'
export const Overlay = defineComponent({
  props:{
    onClose: {
      type: Function as PropType<() => void>
    }
  },
  setup: (props, context) => {
    const onClickSignIn = () => {}
    return () => <>
      <div class={s.mask} onClick={()=>props.onClose?.()}></div>
      <div class={s.overlay}>
        <section class={s.currentUser} onClick={onClickSignIn}>
          <h2>未登录用户</h2>
          <p>点击这里登录</p>
        </section>
        <nav>
          <ul class={s.action_list}>
            <li>
              <RouterLink to="/statistics" class={s.action}>
                <Icon name="charts" class={s.icon}></Icon>
                <span>统计图表</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/export" class={s.action}>
                <Icon name="export" class={s.icon}></Icon>
                <span>导出数据</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/classify" class={s.action}>
                <Icon name="classify" class={s.icon}></Icon>
                <span>自定义分类</span>
              </RouterLink>
            </li>
            <li>
              <RouterLink to="/notify" class={s.action}>
                <Icon name="notify" class={s.icon}></Icon>
                <span>记账提醒</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  }
})