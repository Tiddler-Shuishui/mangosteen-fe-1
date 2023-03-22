import { defineComponent, PropType } from "vue"
import { MainLayout } from "../layouts/MainLayout"
import { BackIcon } from "./BackIcon"
import { Center } from "./Center"
import s from "./ComingSoon.module.scss"
import { Icon } from "./Icon"
export const ComingSoon = defineComponent({
  props:{
    name:{
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <MainLayout>{{
        title: () => '敬请期待',
        icon: () => <BackIcon/>,
        default: () => (
          <div>
          <Center class={s.pig_wrapper}>
            <Icon name="pig" class={s.pig} />
          </Center>
          <p class={s.text}>敬请期待</p>
        </div>
        )
      }}</MainLayout>

    )
  }
})