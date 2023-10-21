<script setup lang="ts">
import Button from '@/components/Button.vue'
import { Add, Settings } from '@/icons'
defineOptions({
  name: 'HeaderPage'
})

const settingRef = ref()
</script>

<template>
  <header
    class="fixed left-0 right-0 top-0 flex h-10 items-center justify-end space-x-2 px-4 align-middle"
  >
    <Button size="sm"> <Add class="h-5 w-5 fill-white" /> </Button>
    <Button size="sm">完成</Button>
    <Button size="sm" @click.stop="$emit('handleSettingIcon', settingRef)" ref="settingRef">
      <Settings class="h-5 w-5 fill-white" />
    </Button>
  </header>
</template>
