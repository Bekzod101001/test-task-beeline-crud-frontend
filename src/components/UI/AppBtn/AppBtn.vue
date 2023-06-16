<template>
  <component
    :is="componentType"
    :class="computedClasses"
    :style="{
      'width': computedWidth,
      'height': computedHeight
    }"
    :to="to"
    :href="href"
    @click="runClickEvent"
  >
    <span class="btn__text">
      <slot/>
    </span>
  </component>
</template>


<script lang="ts" setup>
import { computed, resolveComponent } from "vue";

const props = defineProps({
  icon: {
    type: Boolean,
    default: false
  },
  href: {
    type: String,
    default: null
  },
  large: {
    type: Boolean,
    default: false
  },
  width: {
    type: [Number, String],
    default: () => null
  },
  height: {
    type: [Number, String],
    default: () => null
  },
  loading: {
    type: Boolean,
    default: false
  },
  color: {
    type: [String, Boolean],
    default: 'green',
    validate(value: string) {
      return ['green', 'orange', 'red'].includes(value);
    }
  },
  to: {
    type: [String, Object],
    default: () => null
  },
  outlined: {
    type: Boolean,
    default: false
  },
});

const componentType = computed(() => {
  if(props.to) return resolveComponent('router-link');

  if(props.href) return 'a';

  else return 'button';
});

const computedWidth = computed(() => {
  if (!props.width) {
    return false;
  }
  if (props.width) {
    return props.width + (typeof props.width === 'number' ? 'px' : '');
  }

  return false;
});
const computedHeight = computed(() => {
  if (props.height) {
    return props.height + (typeof props.height === 'number' ? 'px' : '');
  }

  return false;
});
const computedClasses = computed(() => {
  const classes = ['btn', props.color ? `btn--${props.color}` : null];
  if (props.icon) classes.push('btn--icon');
  if (props.outlined) classes.push('btn--outlined');
  if (!props.outlined) classes.push('btn--bg');
  if (props.loading) classes.push('btn--loading');
  if (props.large) classes.push('btn--size-large');

  return classes;
});

function runClickEvent(e: Event) {
  if (props.loading) return;
  if (props.to) e.preventDefault();
}
</script>

<style lang="scss" src="./AppBtn.scss"/>