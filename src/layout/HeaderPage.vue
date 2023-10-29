<script setup lang="ts">
import Button from '@/components/Button.vue'
import { Add, Settings } from '@/icons'
import useLayoutStore from '@/stores/layout'
const layoutStore = useLayoutStore()
const { editMode } = storeToRefs(layoutStore)
defineOptions({
  name: 'HeaderPage'
})

const settingRef = ref()
</script>

<template>
  <header
    class="fixed left-0 right-0 top-0 flex h-10 items-center justify-end space-x-2 px-4 align-middle"
  >
    <Transition
      enter-from-class="opacity-0 translate-x-5"
      enter-active-class="transition-all duration-200"
      enter-to-class="opacity-100 translate-x-0"
      leave-from-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-200"
      leave-to-class="opacity-0 translate-x-5"
    >
      <div v-show="editMode" class="flex items-center space-x-2">
        <Button size="sm" key="add" @click="$emit('handleAddWidget')">
          <Add class="h-5 w-5 fill-white" />
        </Button>
        <Button size="sm" key="finish" @click="editMode = false">完成</Button>
      </div>
    </Transition>
    <Settings
      @click.stop="$emit('handleSettingIcon', settingRef)"
      ref="settingRef"
      class="h-5 w-5 cursor-pointer fill-white opacity-30 transition hover:opacity-80"
    />
  </header>
</template>
