import { useEventListener } from '@vueuse/core'

export default (config: any) => {
  const { listener, el, baseSize, baseMargin, layouts, colsNum } = config
  const dragging = ref(false)
  const pointerDown = ref(false)
  let startEventListener: any
  let moveEventListener: any
  let endEventListener: any
  let cancelEventListener: any

  watch(listener, (bl) => {
    if (bl) {
      startEventListener = useEventListener(el.value, 'pointerdown', start)
      moveEventListener = useEventListener(window, 'pointermove', move)
      endEventListener = useEventListener(window, 'pointerup', end)
      cancelEventListener = useEventListener(window, 'pointercancel', cancel)
    } else {
      startEventListener()
      moveEventListener()
      endEventListener()
      cancelEventListener()
      startEventListener = undefined
      moveEventListener = undefined
      endEventListener = undefined
      cancelEventListener = undefined
    }
  })

  const startXY = ref([0, 0])
  const childXY = ref([0, 0])
  const draggingId = ref('')
  const draggingData = computed(() =>
    layouts.value.find((item: any) => item.id === draggingId.value)
  )
  const start = (e: any) => {
    if (e.button !== 0) return
    e.preventDefault()
    console.log('start', e)
    let child: any = e.target

    // 一直查找父级，如果找到e.target还没找到 id 里有grid-item，就停止查找
    while (child && !child.id.includes('grid-item')) {
      // 如果找到的元素是el.target，就停止查找
      if (child === el.value) {
        child = null
        break
      }
      // 如果找到了id为grid-item的元素，就把child赋值为该元素
      child = child.parentNode
      draggingId.value = child.id.replace('grid-item-', '')
    }

    if (!child) return
    pointerDown.value = true

    const childRect = child.getBoundingClientRect() // 记录鼠标按下时的小组件坐标
    const parentRect = el.value.getBoundingClientRect() // 记录鼠标按下时的父级坐标
    // grid-item 相对于 grid 的坐标
    childXY.value = [childRect.x - parentRect.x, childRect.y - parentRect.y]

    // 鼠标点击位置相对于 gird-item 的坐标
    startXY.value = [e.x - childRect.x + parentRect.x, e.y - childRect.y + parentRect.y]
  }
  const move = (e: any) => {
    if (!pointerDown.value) return
    const [startX, startY] = startXY.value
    childXY.value = [e.x - startX, e.y - startY]

    const [childX, childY] = childXY.value

    let gridX = Math.round((childX - baseMargin.value) / (baseSize.value + baseMargin.value))
    let gridY = Math.round((childY - baseMargin.value) / (baseSize.value + baseMargin.value))

    // 边界计算，超出边界时，placeholderGridItem 不可移动到该位置，且不与其他元素重叠
    const { widgetSize } = draggingData.value
    const [widgetW] = widgetSize.split(':')
    if (gridX + widgetW > colsNum.value) {
      gridX = colsNum.value - widgetW
    }
    if (gridX <= 0) gridX = 0
    if (gridY <= 0) gridY = 0
  }

  const end = (e: any) => {
    console.log('end', e)
    pointerDown.value = false
  }

  const cancel = (e: any) => {
    console.log('cancel', e)
    pointerDown.value = false
  }

  return { dragging, childXY, draggingId }
}
