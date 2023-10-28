import { useEventListener } from '@vueuse/core'

export default (config: any) => {
  const { listener, el } = config
  const dragging = ref(false)
  const pointerDown = ref(false)
  let startEventListener: any
  let moveEventListener: any
  let endEventListener: any
  let cancelEventListener: any

  watch(listener, (bl) => {
    if (bl) {
      startEventListener = useEventListener(el.value, 'pointerdown', start)
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

  const start = (e: any) => {
    if (e.button !== 0) return
    e.preventDefault()
    console.log('start', e)
    let child: any = e.target

    // 一直查找父级，如果找到e.target还没找到id为grid-item，就停止查找
    while (child && child.id !== 'grid-item') {
      // 如果找到的元素是el.target，就停止查找
      if (child === el.value) {
        child = null
        break
      }
      // 如果找到了id为grid-item的元素，就把child赋值为该元素
      child = child.parentNode
    }
    if (!child) return
    pointerDown.value = true

    moveEventListener = useEventListener(window, 'pointermove', move)
    endEventListener = useEventListener(window, 'pointerup', end)
    cancelEventListener = useEventListener(window, 'pointercancel', cancel)
  }
  const move = (e: any) => {
    if (!pointerDown.value) return
    console.log('move', e)
  }
  const end = (e: any) => {
    console.log('end', e)
    pointerDown.value = false
  }
  const cancel = (e: any) => {
    console.log('cancel', e)
    pointerDown.value = false
  }

  return { dragging }
}
