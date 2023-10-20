<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { useHead } from 'unhead'
import { watchEffect } from 'vue'
import theme from '@/styles/_theme.module.scss'

defineOptions({
  name: 'MainPage'
})

//给 newColors 添加ts类型

const newColors: any = {}
for (let key in theme) {
  newColors[key] = key
}

const mode: any = useColorMode({
  disableTransition: false,
  attribute: 'theme',
  storageKey: 'wtab-color-scheme',
  modes: newColors
})
watchEffect(() => {
  useHead({
    meta: [{ name: 'theme-color', content: theme[mode.value] }]
  })
})
</script>

<template>
  <main class="py-10">
    <div>主题设置</div>
    <button @click="mode = 'auto'">auto</button>
    <hr />
    <button @click="mode = 'light'">light</button>
    <hr />
    <button @click="mode = 'dark'">dark</button>
    <hr />
    <button @click="mode = 'green'">green</button>
    <hr />
    <button @click="mode = 'yellow'">yellow</button>
    <hr />
    <button @click="mode = 'blue'">blue</button>
    <hr />
  </main>
</template>
