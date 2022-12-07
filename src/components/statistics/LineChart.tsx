import * as echarts from 'echarts'
import { onMounted,defineComponent, ref } from "vue"
import s from "./LineChart.module.scss"
export const LineChart = defineComponent({
  setup: (props, context) => {
    const refDiv = ref()
    onMounted(() => {
      if (refDiv.value === undefined) { return }
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(refDiv.value);
      // 绘制图表
      myChart.setOption({
        grid: [
          { left: 0, top: 0, right: 0, bottom: 20 }
        ],
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {},
        series: [
          {
            type: 'line',
            data: [5, 20, 36, 10, 10, 20, 77]
          }
        ]
      });
  
    })
    return () => (
      <div ref={refDiv} class={s.wrapper}/>
    )
  }
})
