<script setup lang="ts">
import { computed, provide, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null
  }
})
const itemsCounter = ref(0)

const computedModelValue = computed(() => {
  return props.modelValue
})

provide('counter', itemsCounter)
provide('selectedItem', computedModelValue)
</script>

<template>
  <div class="tabs">
    <slot/>
  </div>
</template>

<style lang="scss" src="./AppTabs.scss"/>