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

const dialogVisible = ref(false)
const addWidgetsVisible = ref(false)
</script>

<template>
  <div class="relative h-full" @contextmenu.prevent="handleHomeContextmenu">
    <HeaderPage
      @handleSettingIcon="handleSettingIcon"
      @handleAddWidget="addWidgetsVisible = true"
    />
    <MainPage />
    <ContextMenu ref="contextMenuRef" v-model:addWidget="addWidgetsVisible" />
    <AddWidgets v-model="addWidgetsVisible" />
  </div>
</template>
