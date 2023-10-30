<script setup lang="ts">
import HeaderPage from '@/layout/HeaderPage.vue'
import MainPage from '@/layout/MainPage.vue'
import ContextMenu from '@/layout/ContextMenu.vue'
import AddWidgets from '@/layout/settings/AddWidgets.vue'

const contextMenuRef = ref()
const handleSettingIcon = (ref: Ref) => {
  contextMenuRef.value.show('settingIcon', ref)
}

const handleHomeContextmenu = (e: Event) => {
  contextMenuRef.value.show('homeContextmenu', e)
}

const handleLangTap = (e: any) => {
  console.log(1212, e)
  contextMenuRef.value.show('langTap', e.ref)
}

const addWidgetsVisible = ref(false)
</script>

<template>
  <div class="relative h-full" @contextmenu.prevent="handleHomeContextmenu">
    <HeaderPage
      @handleSettingIcon="handleSettingIcon"
      @handleAddWidget="addWidgetsVisible = true"
    />
    <MainPage @langTap="handleLangTap" />
    <ContextMenu ref="contextMenuRef" v-model:addWidget="addWidgetsVisible" />
    <AddWidgets v-model="addWidgetsVisible" />
  </div>
</template>
