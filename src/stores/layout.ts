import { defineStore } from 'pinia'
import { useBreakpoints } from '@vueuse/core'

export default defineStore('storeLayout', () => {
  const baseSize = ref(74) // 图标大小
  const baseMargin = ref(18) // 图标间距
  const editMode = ref(false) // 编辑模式
  const layouts = ref([]) // 布局数据

  // 布局数据
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

  const addWidget = (widget: any) => {
    console.log('addWidget', widget)
  }

  const delWidget = (widget: any) => {
    console.log('delWidget', widget)
  }

  return { baseSize, baseMargin, addWidget, delWidget, editMode, breakpoints, colsNum }
})
