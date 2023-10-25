import { defineStore } from 'pinia'

export default defineStore('storeLayout', () => {
  const baseSize = ref(74) // 图标大小
  const baseMargin = ref(18) // 图标间距

  return { baseSize, baseMargin }
})
