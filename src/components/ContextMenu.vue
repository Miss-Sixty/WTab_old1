<script setup lang="ts">
import { computePosition, flip, shift, offset } from '@floating-ui/dom'
import { onClickOutside, unrefElement } from '@vueuse/core'
defineOptions({
  name: 'ContextMenu'
})

defineProps({
  menuList: {
    type: Array,
    default: () => []
  } as any
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
  // styles.value.transformOrigin = activeOptions.transformOrigin
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

defineExpose({ show })
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="animate-zoom-in transition-none transform-gpu"
      leave-active-class="animate-zoom-out transform-gpu"
    >
      <ul
        class="fixed transition-[left,top] bg-white p-2 min-w-[150px] shadow-sm rounded-md translate-x-0 translate-y-0"
        :style="styles"
        v-show="popperVisible"
        ref="floatingRef"
      >
        <template v-for="(item, i) in menuList" :key="i">
          <li class="my-1 border-t" v-if="item.divided" />
          <li
            class="rounded transition-[background-color] py-1 px-2.5 hover:bg-slate-400 cursor-pointer"
            @click="handleClick(item)"
          >
            {{ item.text }}
          </li>
        </template>
      </ul>
    </Transition>
  </Teleport>
</template>
