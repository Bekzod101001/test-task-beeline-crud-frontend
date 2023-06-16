<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps({
  id: {
    type: String
  },
  modelValue: {
    type: String,
  },
  large: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['update:modelValue']);

const formattedValue = ref(props.modelValue);

watch(() => props.modelValue, (val) => {
  let valueAsString = String(val);

  formattedValue.value = valueAsString
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  let formattedValueAsNumber = Number(valueAsString.replace(/\D/g, ''));
  emit('update:modelValue', formattedValueAsNumber);
});

</script>

<template>
  <div
    :class="['form-block', {
      'form-block--large': large,
      'form-block--outlined': outlined
    }]"
  >
    <label
      :for="id"
      class="form-block__label"
    >
      <slot name="label"/>
    </label>
    <slot/>
  </div>

</template>


<style lang="scss" src="./AppFormBlock.scss"/>