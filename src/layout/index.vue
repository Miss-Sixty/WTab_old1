<script setup lang="ts">
import HeaderPage from '@/layout/HeaderPage.vue'
import MainPage from '@/layout/MainPage.vue'

const contextMenuRef = ref()
const handleContextmenu = (ev: MouseEvent) => {
  let clientRect = {
    width: 0,
    height: 0,
    x: ev.clientX,
    y: ev.clientY,
    top: ev.clientY,
    left: ev.clientX,
    right: ev.clientX,
    bottom: ev.clientY
  }

  let reference = {
    getBoundingClientRect() {
      return clientRect
    }
  }

  contextMenuRef.value.show('desktop', reference)
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
  <div class="h-full" @contextmenu.prevent="handleContextmenu">
    <HeaderPage />
    <MainPage />
    <ContextMenu :menuList="contextmenuData" ref="contextMenuRef" />
  </div>
</template>
