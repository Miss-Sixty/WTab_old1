import { defineStore } from 'pinia'
import { useColorMode } from '@vueuse/core'
import { useHead } from 'unhead'
import themeScss from '@/styles/_theme.module.scss'

// 获取所有颜色
const newColors: any = {}
for (let key in themeScss) {
  newColors[key] = key
}

export default defineStore('storeApp', () => {
  const baseSetting = ref(false)

  // 设置主题
  const theme: any = useColorMode({
    disableTransition: false,
    attribute: 'theme',
    storageKey: 'wtab-color-scheme',
    modes: newColors
  })
  // 监听主题变化
  watchEffect(() => {
    useHead({
      meta: [{ name: 'theme-color', content: themeScss[theme.value] }]
    })
  })

  return { theme, baseSetting }
})
