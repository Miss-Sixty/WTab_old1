<script setup lang="ts">
import HeaderPage from '@/layout/HeaderPage.vue'
import MainPage from '@/layout/MainPage.vue'
import ContextMenu from '@/components/ContextMenu.vue'
import Dialog from '@/components/Dialog.vue'

const contextMenuRef = ref()
const handleSettingIcon = (ref: Ref) => {
  contextMenuRef.value.show('settingIcon', ref)
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
      dialogVisible.value = true
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

const dialogVisible = ref(false)
</script>

<template>
  <div class="h-full relative" @contextmenu.prevent="handleHomeContextmenu">
    <HeaderPage @handleSettingIcon="handleSettingIcon" />
    <MainPage />
    <ContextMenu :menuList="contextmenuData" ref="contextMenuRef" />
    <Dialog v-model="dialogVisible" title="设置" :width="600" />
  </div>
</template>
