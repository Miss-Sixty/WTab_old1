<script setup lang="ts">
import { computePosition, flip, shift, offset } from '@floating-ui/dom'
import { onClickOutside, unrefElement } from '@vueuse/core'
import BaseSettings from '@/layout/settings/BaseSettings.vue'
defineOptions({
  name: 'ContextMenu'
})

const options: any = {
  settingIcon: {
    placement: 'bottom-end',
    middleware: [
      offset(6),
      flip(),
      shift(),
      { fn: () => (styles.value.transformOrigin = '90% 0%') }
    ],
    transformOrigin: '90% 0%'
  },
  base: {
    placement: 'right-start',
    middleware: [
      flip(),
      shift(),
      {
        fn: ({ placement }: any) =>
          (styles.value.transformOrigin = placement === 'left-start' ? '90% 0%' : '0% 0%')
      }
    ],
    transformOrigin: '0% 0%'
  }
}
const floatingRef = ref()
const popperVisible = ref(false)

const show = async (type: string, domOrRect: any) => {
  if (type === 'homeContextmenu') {
    domOrRect = getBoundingClientRect(domOrRect)
  }
  popperVisible.value = true
  const activeOptions = options[type] || options.base
  onContextmenu(domOrRect, activeOptions)
}

// 处理 getBoundingClientRect 如果为dom则直接返回，如果为event则返回一个伪造的dom
const getBoundingClientRect = ({ clientX, clientY }: any) => ({
  getBoundingClientRect() {
    return {
      width: 0,
      height: 0,
      x: clientX,
      y: clientY,
      top: clientY,
      left: clientX,
      right: clientX,
      bottom: clientY
    }
  }
})

const styles = ref({
  top: '0',
  left: '0',
  transformOrigin: '0% 0%'
})
const onContextmenu = async (reference: any, options: any = {}) => {
  const { placement, middleware } = options
  const position = await computePosition(unrefElement(reference), floatingRef.value, {
    placement,
    middleware,
    strategy: 'fixed'
  })

  styles.value.top = position.y + 'px'
  styles.value.left = position.x + 'px'
}

// 点击外部关闭
onClickOutside(floatingRef, () => {
  popperVisible.value = false
})

const handleClick = (item: any) => {
  popperVisible.value = false
  item.onclick()
}

const baseSettingDialogVisible = ref(false)
const contextmenuData = [
  {
    text: '常规设置',
    divided: false,
    onclick: () => {
      console.log('常规设置')
      baseSettingDialogVisible.value = true
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

defineExpose({ show })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="animate-zoom-in transition-none transform-gpu"
      leave-active-class="animate-zoom-out transform-gpu"
    >
      <ul
        class="fixed min-w-[150px] translate-x-0 translate-y-0 rounded-md bg-white p-2 shadow-sm transition-[left,top]"
        :style="styles"
        v-show="popperVisible"
        ref="floatingRef"
      >
        <template v-for="(item, i) in contextmenuData" :key="i">
          <li class="my-1 border-t" v-if="item.divided" />
          <li
            class="cursor-pointer rounded px-2.5 py-1 transition-[background-color] hover:bg-slate-400"
            @click="handleClick(item)"
          >
            {{ item.text }}
          </li>
        </template>
      </ul>
    </Transition>
  </Teleport>

  <BaseSettings v-model="baseSettingDialogVisible" />
</template>
