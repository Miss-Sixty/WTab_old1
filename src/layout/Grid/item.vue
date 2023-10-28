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

const { colsNum, baseSize, baseMargin, layouts }: any = inject('gridContextKey')

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
</script>

<template>
  <div class="absolute" :style="initStyle">
    <slot />
  </div>
</template>
