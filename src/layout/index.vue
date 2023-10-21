<script setup lang="ts">
import HeaderPage from '@/layout/HeaderPage.vue'
import MainPage from '@/layout/MainPage.vue'

const contextMenuRef = ref()
const handleSettingsIcon = (ref: Ref) => {
  contextMenuRef.value.show('settingsIcon', ref)
}

const handleHomeContextmenu = (e: Event) => {
  contextMenuRef.value.show('homeContextmenu', e)
}

const contextmenuData = [
  {
    text: '设置',
    divided: false,
    onclick: () => {
      console.log('设置')
    }
  },
  {
    text: '设置22',
    divided: true,
    onclick: () => {
      console.log('设置22')
    }
  }
]
</script>

<template>
  <div class="h-full relative" @contextmenu.prevent="handleHomeContextmenu">
    <HeaderPage @setting="handleSettingsIcon" />
    <MainPage />
    <ContextMenu :menuList="contextmenuData" ref="contextMenuRef" />
  </div>
</template>
