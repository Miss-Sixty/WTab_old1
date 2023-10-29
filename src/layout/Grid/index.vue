<script setup lang="ts">
import useGesture from './useGesture'
import { GridItem } from '@/layout/Grid'
defineOptions({
  name: 'Grid'
})

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  colsNum: {
    type: Number,
    required: true
  },
  baseSize: {
    type: Number,
    required: true
  },
  baseMargin: {
    type: Number,
    required: true
  },
  editMode: {
    type: Boolean,
    default: false
  }
})

const widthStyle = computed(() => {
  return props.colsNum * (props.baseSize + props.baseMargin) - props.baseMargin + 'px'
})

const heightStyle = computed(() => {
  let h = 0
  let y = 0
  props.modelValue.forEach((widget: any) => {
    const widgetY = widget.position[props.colsNum][1]
    const widgetH = Number(widget.widgetSize.split(':')[1])
    if (widgetY + widgetH > y + h) {
      h = widgetH
      y = widgetY
    }
  })
  return `${(y + h) * (props.baseSize + props.baseMargin) - props.baseMargin}px`
})

const gridRef = ref<HTMLElement | null>(null)
// 手势
const { dragging, childXY, draggingId, placeholderData } = useGesture({
  listener: computed(() => props.editMode), // 是否开启手势
  el: gridRef, // 绑定的元素
  baseSize: computed(() => props.baseSize), // 基础尺寸
  baseMargin: computed(() => props.baseMargin), // 基础间距
  layouts: computed(() => props.modelValue),
  colsNum: computed(() => props.colsNum)
})

provide('gridContextKey', {
  colsNum: computed(() => props.colsNum),
  baseSize: computed(() => props.baseSize),
  baseMargin: computed(() => props.baseMargin),
  layouts: computed(() => props.modelValue),
  childXY,
  draggingId,
  dragging
})
</script>

<template>
  <div
    ref="gridRef"
    class="relative m-auto transition-all"
    :style="{ width: widthStyle, height: heightStyle }"
  >
    <GridItem
      class="bg-primary-medium"
      :key="placeholderData?.id"
      :id="placeholderData?.id"
      :placeholder="placeholderData"
      v-show="dragging"
    />
    <slot />
  </div>
</template>
@/layout/Grid/useGesture
