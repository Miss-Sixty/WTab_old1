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
    class="peer-invalid:ml-3 peer space-x-6 rounded-full bg-indigo-600 text-white duration-150 hover:bg-indigo-500 active:bg-indigo-700"
    :class="sizeType[size]"
  >
    <slot />
  </button>
</template>
