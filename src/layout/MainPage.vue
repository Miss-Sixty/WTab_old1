<script setup lang="ts">
import { Grid, GridItem } from '@/layout/Grid'
import useLayoutStore from '@/stores/layout'
import Widget from '@/widgets/index.vue'
const emit = defineEmits(['widgetContextmenu'])
const layoutStore = useLayoutStore()
const { layouts, baseMargin, baseSize, colsNum, editMode } = storeToRefs(layoutStore)

defineOptions({
  name: 'MainPage'
})
</script>

<template>
  <main class="h-full overflow-y-auto px-1 py-10">
    <Grid
      v-model="layouts"
      :colsNum="colsNum"
      :baseSize="baseSize"
      :baseMargin="baseMargin"
      :editMode="editMode"
    >
      <GridItem
        v-for="item in layouts"
        :key="item.id"
        :id="item.id"
        @widgetContextmenu="$emit('widgetContextmenu', $event)"
      >
        <Widget :type="editMode ? 'del' : ''" :widget="item" :component="item.component" />
      </GridItem>
    </Grid>
  </main>
</template>
