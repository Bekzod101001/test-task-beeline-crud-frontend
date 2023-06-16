<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: [Boolean, Number],
  color: {
    type: String,
    default: 'success',
    validate(value: string) {
      return ['success', 'error'].includes(value);
    }
  },
  firstValue: {
    type: [Number, String, Boolean],
    default: true
  },
  secondValue: {
    type: [Number, String, Boolean],
    default: false
  },
  small: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['update:modelValue']);

const randomID = Math.floor(Math.random() * 10000)

const computedModelValue = computed({
  get() {
    return !!props.modelValue
  },
  set(newValue) {
    let result;

    if(newValue) result = props.firstValue;
    else if(!newValue) result = props.secondValue;

    emit('update:modelValue', result)
  }
})

const computedClasses = computed(() => {
  const classes = ['app-switcher__label'];

  if(props.color) classes.push(`app-switcher__label--${props.color}`);
  if(props.small) classes.push('app-switcher__label--small');

  return classes;
});

</script>

<template>
  <div class="app-switcher">
    <label
      :for="randomID"
      class="app-switcher__title"
    >
      <slot name="label" />
    </label>
    <input
      v-model="computedModelValue"
      :id="randomID"
      class="app-switcher__input"
      type="checkbox"
    />
    <label
      :class="computedClasses"
      :for="randomID"
    />
  </div>
</template>

<style lang="scss" src="./AppSwitcher.scss" />