import { defineStore } from 'pinia'

export default defineStore('storeLayout', () => {
  const baseSize = ref(74) // 图标大小
  const baseMargin = ref(18) // 图标间距
  const editMode = ref(false) // 编辑模式

  const addWidget = (widget: any) => {
    console.log('addWidget', widget)
  }

  const delWidget = (widget: any) => {
    console.log('delWidget', widget)
  }

  return { baseSize, baseMargin, addWidget, delWidget, editMode }
})
