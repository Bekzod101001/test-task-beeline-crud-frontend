<script setup>
import { computed, inject, ref } from "vue";

const itemsCounter = inject('counter')
const selectedItem = inject('selectedItem')
const index = ref(0)

index.value = itemsCounter.value
itemsCounter.value++

const isActive = computed(() => {
  return index.value === selectedItem.value
})
</script>

<template>
  <div
    v-show="isActive"
    class="tabs-item"
  >
    <slot/>
  </div>
</template>

<style lang="scss" src="./AppTabs.scss"/>