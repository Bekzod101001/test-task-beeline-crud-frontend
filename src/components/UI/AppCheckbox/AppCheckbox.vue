<script setup lang="ts">
import { computed } from "vue";
import { generateRandomID } from "@/utils/helper";

const props = defineProps({
  modelValue: {
    type: [Boolean, String, Number, Array],
    default: false
  },
  value: {
    type: [Number, String],
    default: null
  },
  trueValue: {
    type: undefined,
    default: true
  },
  falseValue: {
    type: undefined,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits([
  'change', 'update:modelValue'
])
const randomID = generateRandomID();

const isChecked = computed(() => {
  if (typeof props.modelValue === 'object') {
    return props.modelValue.includes(props.value)
  } else {
    return props.modelValue === props.trueValue
  }
})
const computedActiveValue = computed(() => {
  if (typeof props.modelValue === 'object') {
    return props.value
  } else {
    return props.modelValue
  }
})

function change () {
  if (typeof props.modelValue === 'object') {
    toggleArrayValue()
  } else {
    toggleBooleanValue()
  }
}

function toggleBooleanValue () {
  emit('update:modelValue', isChecked.value ? props.falseValue : props.trueValue)
  emit('change', isChecked.value ? props.falseValue : props.trueValue)
}

function toggleArrayValue () {
  if (props.modelValue.includes(props.value)) {
    removeFromArray()
  } else {
    props.modelValue.push(props.value)
  }
  emit('change', computedActiveValue.value)
}

function removeFromArray () {
  const index = props.modelValue.findIndex((item: object) => item === props.value)
  props.modelValue.splice(index, 1)
}

</script>

<template>
  <div
    :class="['checkbox', {
      'checkbox--disabled': disabled
    }]"
  >
    <input
      :id="`${randomID}`"
      :checked="isChecked"
      :value="computedActiveValue"
      :disabled="disabled"
      class="checkbox__input"
      type="checkbox"
      @change="change()"
    >
    <label
      :for="`${randomID}`"
      class="checkbox__label"
    >
      <span class="checkbox__label__icon">
        <svg data-src="/images/icons/tick.svg"/>
      </span>
      <span class="checkbox__label__text">
        <slot name="label"/>
      </span>
    </label>
  </div>
</template>

<style lang="scss" src="./AppCheckbox.scss"/>