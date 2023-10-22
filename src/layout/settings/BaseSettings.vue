<script setup lang="ts">
import Card from '@/layout/Card.vue'
import { useAppStore } from '@/stores/app'
import themeScss from '@/styles/_theme.module.scss'
import { IconDeviceDesktop, IconSunLow, IconMoonStars } from '@tabler/icons-vue'
defineOptions({
  name: 'BaseSettings'
})
const appStore = useAppStore()
const { theme } = storeToRefs(appStore)

// 将 themeScss 中 light、dark 和其他色分开
const colors = computed(() => {
  let system: any = { auto: 'auto' }
  let other: any = {}
  for (const key in themeScss) {
    if (key === 'light' || key === 'dark') {
      system[key] = themeScss[key]
    } else {
      other[key] = themeScss[key]
    }
  }
  return {
    system,
    other
  } as {
    system: { [key: string]: string }
    other: { [key: string]: string }
  }
})
</script>

<template>
  <Dialog title="常规设置">
    <Card>
      <div class="flex items-center justify-between">
        <div>主题</div>
        <div class="flex justify-end">
          <div class="mr-4 flex gap-1">
            <div
              class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border"
              @click="theme = key"
              v-for="(color, key) in colors.system"
              :key="key"
            >
              <IconDeviceDesktop v-if="key === 'auto'" :size="18" />
              <IconSunLow v-if="key === 'light'" :size="18" />
              <IconMoonStars v-if="key === 'dark'" :size="18" />
            </div>
          </div>
          <div class="flex gap-1">
            <div
              v-for="(color, key) in colors.other"
              :key="key"
              class="h-7 w-7 cursor-pointer rounded-full"
              :style="{ 'background-color': color }"
              @click="theme = key"
            ></div>
          </div>
        </div>
      </div>
    </Card>
  </Dialog>
</template>
