<script setup lang="ts">
import Button from '@/components/Button.vue'
defineOptions({
  name: 'HeaderPage'
})
</script>

<template>
  <header
    class="fixed left-0 right-0 top-0 flex h-10 items-center justify-end space-x-2 bg-red-50 px-4 align-middle"
  >
    <Button size="sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="h-5 w-5"
      >
        <path
          fillRule="evenodd"
          d="M12 5.25a.75.75 0 01.75.75v5.25H18a.75.75 0 010 1.5h-5.25V18a.75.75 0 01-1.5 0v-5.25H6a.75.75 0 010-1.5h5.25V6a.75.75 0 01.75-.75z"
          clipRule="evenodd"
        />
      </svg>
    </Button>
    <Button size="sm">完成</Button>
  </header>
</template>
