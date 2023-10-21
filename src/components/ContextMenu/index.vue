<script setup lang="ts">
import { computePosition, flip, shift, offset, type ReferenceElement } from '@floating-ui/dom'
import { roundByDPR } from './utils/roundByDPR'
import { getDPR } from './utils/getDPR'
import { onClickOutside } from '@vueuse/core'
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
  settings: {
    placement: 'bottom-end',
    transformOrigin: '90% 0%'
  }
}
const show = (type: string, reference: any) => {
  onContextmenu(reference, options[type])
}

const floatingRef = ref()
const popperVisible = ref(false)
const x = ref(0)
const y = ref(0)
const origin = ref('0% 0%')
const onContextmenu = async (reference: ReferenceElement, options: any = {}) => {
  const {
    placement = 'right-start',
    transformOrigin = '0% 0%',
    middleware = [flip(), shift()]
  } = options

  popperVisible.value = true

  const position = await computePosition(reference, floatingRef.value, {
    placement,
    middleware,
    strategy: 'fixed'
  })

  x.value = position.x
  y.value = position.y
  origin.value = transformOrigin
}

const styles = computed(() => {
  if (!floatingRef.value) return
  const xVal = roundByDPR(floatingRef.value, x.value)
  const yVal = roundByDPR(floatingRef.value, y.value)

  return {
    top: 0,
    left: 0,
    transform: `translate(${xVal}px, ${yVal}px)`,
    transformOrigin: origin.value,
    ...(getDPR(floatingRef.value) >= 1.5 && { willChange: 'transform' })
  }
})

// 点击外部关闭
onClickOutside(floatingRef, () => {
  popperVisible.value = false
})

defineExpose({ show })
</script>

<template>
  <Teleport to="body">
    <!-- <Transition name="fade" > -->
    <ul
      class="fixed bg-white p-2 min-w-[150px] shadow-sm rounded-md"
      :style="styles"
      v-show="popperVisible"
      ref="floatingRef"
    >
      <template v-for="(item, i) in menuList" :key="i">
        <li class="my-1 border-t" v-if="item.divided" />
        <li class="rounded py-1 px-2.5 hover:bg-slate-400 cursor-pointer" @click="item.onclick">
          {{ item.text }}
        </li>
      </template>
    </ul>
    <!-- </Transition> -->
  </Teleport>
</template>

<style scoped>
/* .fade-enter-active {
  animation: pulse-in 0.4s;
  transition: none;
}
.fade-leave-active {
  animation: pulse-out 0.4s;
}

@keyframes pulse-in {
  from {
    transform: translateY(-20px) scale(0.3);
    opacity: 0;
  }

  50% {
    transform: scale(1.03);
    opacity: 1;
  }

  to {
    transform: translateY(0) scale(1);
  }
} */
</style>
