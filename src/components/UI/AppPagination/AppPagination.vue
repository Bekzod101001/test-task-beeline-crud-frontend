<script lang="ts" setup>
import { computed } from "vue";

interface IProps {
  modelValue: number | null;
  totalPages: number | null;
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue']);

const computedPages = computed(() => {
  let pages = [];
  const total = props.totalPages;
  const current = props.modelValue;

  if (total <= 6) {
    for (let i = 1; i <= total; i++) {
      pages.push({
        tag: 'button',
        value: i
      });
    }
  } else {
    // Always print first page button
    pages.push({
      tag: 'button',
      value: 1
    });

    // Print "..." only if current is > 3
    if (current > 3) {
      pages.push({
        tag: 'div',
        value: '...'
      });
    }

    // special case where last page is selected...
    if (current == total) {
      pages.push({
        tag: 'button',
        value: current - 2
      });
    }

    // Print previous number button if current > 2
    if (current > 2) {
      pages.push({
        tag: 'button',
        value: current - 1
      });
    }

    //Print current page number button as long as it not the first or last page
    if (current != 1 && current != total) {
      pages.push({
        tag: 'button',
        value: current
      });
    }

    //print next number button if current < lastPage - 1
    if (current < total - 1) {
      pages.push({
        tag: 'button',
        value: current + 1
      });
    }

    // special case where first page is selected...
    if (current == 1) {
      pages.push({
        tag: 'button',
        value: current + 2
      });
    }

    //print "..." if current is < lastPage -2
    if (current < total - 2) {
      pages.push({
        tag: 'div',
        value: '...'
      });
    }

    //Always print last page button if there is more than 1 page
    pages.push({
      tag: 'button',
      value: total
    });
  }

  return pages;
});


</script>

<template>
  <div class="app-pagination">
    <button
        @click="emit('update:modelValue', props.modelValue - 1)"
        class="app-pagination__btn"
        :disabled="props.modelValue === 1"
    >
      prev
    </button>

    <component
      :is="item.tag"
      v-for="item in computedPages"
      :key="item.value"
      @click="emit('update:modelValue', item.value)"
      :class="[
          'app-pagination__btn',
          {
            'app-pagination__btn_active': item.value === props.modelValue
          }
      ]"
    >
      {{ item.value }}
    </component>

    <button
        @click="emit('update:modelValue', props.modelValue + 1)"
        class="app-pagination__btn"
        :disabled="props.modelValue === props.totalPages"
    >
      next
    </button>
  </div>
</template>

<style lang="scss" src="./AppPagination.scss"/>