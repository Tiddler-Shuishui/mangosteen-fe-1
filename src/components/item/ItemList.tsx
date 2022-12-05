import { defineComponent, PropType } from 'vue';
import { ItemSummary } from './ItemSummary';
import { TimeTabsLayout } from '../../layouts/TimeTabsLayout';
export const ItemList = defineComponent({
  props: {
    name: {
      type: String as PropType<string>
    }
  },
  setup: (props, context) => {
    return () => (
      <TimeTabsLayout component={ItemSummary}/>
    )
  }
})