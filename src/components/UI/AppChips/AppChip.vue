<script lang="ts" setup>
import { computed } from "vue";

type Props = {
  to?: string | object | null
  removable?: boolean,
  readonly?: boolean,
  small?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  to: null,
  removable: false,
  readonly: false,
  small: false
})

const emit = defineEmits([
  'remove'
]);

const componentType = computed(() => {
  return props.to ? 'router-link' : 'div';
});

function remove() {
  emit('remove');
}
</script>

<template>
  <component
    :is="componentType"
    :class="['chip', {
      'chip--readonly': props.readonly,
      'chip--link': !!props.to,
      'chip--small': props.small
    }]"
    :to="props.to"
    :aria-readonly="props.readonly"
  >
    <div class="chip__bg-color"/>
    <slot/>
    <button
      v-if="props.removable"
      class="chip__close-btn"
      @click="remove"
    >
      <svg data-src="/img/icons/close.svg"/>
    </button>
  </component>
</template>

<style lang="scss" src="./AppChips.scss"/>