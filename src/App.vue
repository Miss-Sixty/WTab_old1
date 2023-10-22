<script setup lang="ts">
import Index from '@/layout/index.vue'
// 如果没有别处调用 useAppStore 则需要在这里调用，否则会导致 store 无法正常使用
import { useAppStore } from '@/stores/app'
useAppStore()
</script>

<template>
  <Index />
</template>
