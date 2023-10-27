<script setup lang="ts">
defineOptions({
  name: 'ExternalLink'
})

const props = defineProps({
  widget: {
    type: Object,
    default: () => ({})
  },
  type: {
    type: String,
    default: ''
  }
})

</script>

<template><div>{{widget}}</div></template>
