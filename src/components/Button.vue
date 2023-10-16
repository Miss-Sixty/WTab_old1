<script setup lang="ts">
defineOptions({
  name: 'Button'
})

const sizeType: any = {
  sm: 'px-3 py-1 text-sm'
}

defineProps({
  size: {
    type: String,
    default: 'default'
  }
})
</script>

<template>
  <button
    class="rounded-full bg-indigo-600 text-white duration-150 hover:bg-indigo-500 active:bg-indigo-700"
    :class="sizeType[size]"
  >
    <slot />
  </button>
</template>
