<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
defineOptions({
  name: 'Grid'
})

const layoutStore = useLayoutStore()
const { colsNum, baseSize, baseMargin } = storeToRefs(layoutStore)

const widthStyle = computed(() => {
  return colsNum.value * (baseSize.value + baseMargin.value) + baseMargin.value + 'px'
})
</script>

<template>
  <div class="m-auto h-full bg-slate-600" :style="{ width: widthStyle }">
    <slot />
  </div>
</template>
