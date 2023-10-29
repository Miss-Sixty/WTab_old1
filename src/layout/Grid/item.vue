<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
defineOptions({
  name: 'GridItem'
})

const props = defineProps({
  id: {
    type: String,
    default: ''
  }
})

const { colsNum, baseSize, baseMargin, layouts, childXY, draggingId }: any =
  inject('gridContextKey')

/**
 * item的数据
 */
const dragingData: any = computed(() => {
  return layouts.value.find((item: any) => item.id === props.id)
})

// 初始排序
const initStyle = computed(() => {
  const { position, widgetSize } = dragingData.value
  const [x, y] = position[colsNum.value]
  const [w, h] = widgetSize.split(':')
  return {
    transform: `translate3d(
        ${x * (baseMargin.value + baseSize.value)}px,
        ${y * (baseMargin.value + baseSize.value)}px,
        0
    )`,
    width: `${w * baseSize.value + (w - 1) * baseMargin.value}px`,
    height: `${h * baseSize.value + (h - 1) * baseMargin.value}px`
  }
})

const dragStyle = computed(() => {
  if (props.id !== draggingId.value) return
  if (!childXY.value?.length) return
  const [x, y] = childXY.value

  return {
    transform: `translate3d(${x}px, ${y}px,0)`,
    zIndex: 2,
    transition: 'none'
  }
})
</script>

<template>
  <div :id="`grid-item-${id}`" class="absolute" :style="{ ...initStyle, ...dragStyle }">
    <slot />
  </div>
</template>
