import { defineStore } from 'pinia'
import { useBreakpoints } from '@vueuse/core'
import dayjs from 'dayjs'
import { nanoid } from 'nanoid/non-secure'

// 计算可以放下的x,y
const getXYByWH: any = (w: number, h: number, layouts: any, cols: number) => {
  return new Promise((resolve, reject) => {
    const x = 0
    const y = 0
    if (layouts.length === 0) resolve([x, y])

    resolve([x, y])
  })
}
export default defineStore('storeLayout', () => {
  const baseSize = ref(74) // 图标大小
  const baseMargin = ref(18) // 图标间距
  const editMode = ref(false) // 编辑模式
  const layouts: any = ref([]) // 布局组件数据

  // 布局宽度数据
  const breakpoints = ref({
    4: 475,
    8: 705,
    12: 1050,
    14: 1225,
    16: 1400,
    18: 1575,
    20: 1750
  })
  const breakpointsData = useBreakpoints(breakpoints.value)
  const current: ComputedRef<string[]> = breakpointsData.current() //当前布局断点
  // 一共多少列
  const colsNum: ComputedRef<number> = computed(() => {
    const [firstData] = Object.keys(breakpoints.value)
    const colsNum = current.value.at(-1) || firstData
    return Number(colsNum)
  })

  const addWidget = async (widget: any, component: 'string') => {
    console.log('addWidget', widget)
    const position: any = {}
    const [w, h] = widget.widgetSize.split(':')
    const [x, y] = await getXYByWH(Number(w), Number(h), layouts.value, colsNum.value)
    position[colsNum.value] = [x, y]
    const date = dayjs().valueOf()
    const id = nanoid() + date
    layouts.value.push({ id, ...widget, position, update: date, component })
    // TODO: 异步计算 breakpoints 中其他的 position 值
  }

  const delWidget = (widget: any) => {
    console.log('delWidget', widget)
  }

  return { baseSize, baseMargin, addWidget, delWidget, editMode, breakpoints, colsNum, layouts }
})
