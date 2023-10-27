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
</script>

<template>
  <div class="bg-red-400">
    <slot />
  </div>
</template>
