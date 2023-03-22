import { defineComponent } from 'vue'
import { RouterLink } from 'vue-router'
import s from './SkipFeatures.module.scss'
export const SkipFeatures = defineComponent({
  props: {
    text: {
      type: String,
      default: '跳过'
    }
  },
  setup: (props, context) => {
    const onClick = () => {
      localStorage.setItem('skipFeatures', 'yes')
    }
    return () => (
      <span onClick={onClick}>
        <RouterLink to="/items" replace>
          {props.text}
        </RouterLink>
      </span>
    )
  }
})
