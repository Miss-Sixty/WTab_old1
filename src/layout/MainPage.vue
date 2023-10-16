<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
defineOptions({
  name: 'MainPage'
})

const mode = useColorMode({
  attribute: 'theme',
  modes: {
    green: 'green', //'#BDDDC8'
    yellow: 'yellow', //'#FFF3B4'
    blue: 'blue' //'#A1D8E6'
  }
})
</script>

<template>
  <main class="bg-[#A1D8E6] py-10 h-full">
    <div>主题设置</div>
    <button @click="mode = 'light'">light</button>
    <button @click="mode = 'dark'">dark</button>
  </main>
</template>
