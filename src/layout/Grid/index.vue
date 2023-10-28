<script setup lang="ts">
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

provide('gridContextKey', {
  colsNum: computed(() => props.colsNum),
  baseSize: computed(() => props.baseSize),
  baseMargin: computed(() => props.baseMargin),
  layouts: computed(() => props.modelValue)
})
</script>

<template>
  <div class="relative m-auto bg-slate-600" :style="{ width: widthStyle, height: heightStyle }">
    {{ baseMargin }} <slot />
  </div>
</template>
