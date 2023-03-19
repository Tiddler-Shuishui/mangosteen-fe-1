import { defineComponent, PropType, ref } from 'vue'
import { FormItem } from '../../shared/Form'
import s from './Charts.module.scss'
import { Bars } from './Bars'
import { LineChart } from './LineChart'
import { PieChart } from './PieChart'
export const Charts = defineComponent({
  props: {
    startDate: {
      type: String as PropType<string>,
      required: false,
    },
    endDate: {
      type: String as PropType<string>,
      required: false,
    },
  },
  setup: (props, context) => {
    const category = ref('expenses')
    return () => (
      <div class={s.wrapper}>
        <FormItem
          label="类型"
          type="select"
          v-model={category.value}
          options={[
            { value: 'expenses', text: '支出' },
            { value: 'income', text: '收入' },
          ]}
        />
        <LineChart />
        <PieChart />
        <Bars />
      </div>
    )
  },
})
