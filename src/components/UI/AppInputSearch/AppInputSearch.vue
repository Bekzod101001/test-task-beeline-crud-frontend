<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import AppInput from "@/components/UI/AppInput/AppInput.vue";

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const isLarge = ref(false);

const computedModelValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})

const windowObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.contentRect.width <= 767) isLarge.value = false;
  });
});

onMounted(() => {
  const main = document.getElementById("app");

  windowObserver.observe(main!);
});
</script>

<template>
  <app-input
    v-model="computedModelValue"
    type="search"
    class="app-input-search"
    :large="isLarge"
  >
    <template #label>
      <slot name="label" />
    </template>
    <template #append>
      <button class="app-input-search__submit-btn">
        <svg data-src="/images/icons/loup.svg" />
      </button>
    </template>
  </app-input>
</template>

<style lang="scss" src="./AppInputSearch.scss" />