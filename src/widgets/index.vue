<script setup lang="ts">
import useLayoutStore from '@/stores/layout'
import { IconPlus, IconMinus } from '@tabler/icons-vue'
const layoutStore = useLayoutStore()
const { baseMargin, baseSize } = storeToRefs(layoutStore)
defineOptions({
  name: 'widget'
})
const props = defineProps({
  widget: {
    type: Object,
    default: () => ({})
  },
  component: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
})

const style = computed(() => {
  const { widgetSize } = props.widget
  const [w, h] = widgetSize.split(':')
  return {
    width: `${w * baseSize.value + (w - 1) * baseMargin.value}px`,
    height: `${h * baseSize.value + (h - 1) * baseMargin.value}px`
  }
})

const handleAdd = () => {}

const handleDel = () => {}
</script>
<template>
  <div class="relative">
    <template v-if="type">
      <IconPlus
        v-if="type === 'add'"
        :size="22"
        class="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 scale-100 cursor-pointer rounded-full bg-primary-medium p-1 transition hover:bg-primary-default"
        @click="handleAdd"
      />
      <IconMinus
        v-if="type === 'del'"
        :size="22"
        class="absolute left-0 top-0 -translate-x-1/3 -translate-y-1/3 scale-100 cursor-pointer rounded-full bg-primary-medium p-1 transition hover:bg-primary-default"
        @click="handleDel"
      />
    </template>
    <component class="rounded-lg bg-white" :style="style" :is="component" :type="type" />
  </div>
</template>
