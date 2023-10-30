<script setup lang="ts">
import HeaderPage from '@/layout/HeaderPage.vue'
import MainPage from '@/layout/MainPage.vue'
import ContextMenu from '@/layout/ContextMenu.vue'
import AddWidgets from '@/layout/settings/AddWidgets.vue'
import useLayoutStore from '@/stores/layout'
const layoutStore = useLayoutStore()
const contextMenuRef = ref()
const handleSettingIcon = (ref: Ref) => {
  contextMenuRef.value.show('settingIcon', ref)
}

const handleHomeContextmenu = (e: Event) => {
  contextMenuRef.value.show('homeContextmenu', e)
}

const handleWidgetContextmenu = ({ ref, id }: { ref: Ref; id: string }) => {
  contextMenuRef.value.show('widgetContextmenu', ref, { id })
}

const addWidgetsVisible = ref(false)

const handleDel = (widget: any) => {
  layoutStore.delWidget(widget)
}
</script>

<template>
  <div class="relative h-full" @contextmenu.prevent="handleHomeContextmenu">
    <HeaderPage
      @handleSettingIcon="handleSettingIcon"
      @handleAddWidget="addWidgetsVisible = true"
    />
    <MainPage @widgetContextmenu="handleWidgetContextmenu" />
    <ContextMenu ref="contextMenuRef" v-model:addWidget="addWidgetsVisible" @del="handleDel" />
    <AddWidgets v-model="addWidgetsVisible" />
  </div>
</template>
