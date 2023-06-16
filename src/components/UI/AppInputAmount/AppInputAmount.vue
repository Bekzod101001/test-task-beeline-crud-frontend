<script lang="ts" setup>
import AppInput from "@/components/UI/AppInput/AppInput.vue";
import { computed } from "vue";
import { inputNumbersOnly } from "@/utils/helper";

interface IProps {
  modelValue: string | number | null
  large?: boolean
  validationKey?: string,
  validationRules?: object,
  hint: String,
  unformatted?: boolean
}

const props = defineProps<IProps>();
const emit = defineEmits(['update:modelValue']);

const computedModelValue = computed({
  get() {
    if(props.unformatted) return props.modelValue!;

    return formatValue(props.modelValue!)
  },
  set(newValue) {
    let formattedValueAsNumber = newValue.replace(/\D/g, '');
    emit('update:modelValue', formattedValueAsNumber);
  }
})

function formatValue (val: string | number) {
  let valueAsString = String(val);
  return valueAsString
    .replace(/\D/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

</script>

<template>
  <app-input
    v-model="computedModelValue"
    :format="props.unformatted ? null : formatValue"
    :large="large"
    :keypress="inputNumbersOnly"
    :hint="props.hint"
  >
    <template #label>
      <slot name="label"/>
    </template>
    <template #append>
      <slot name="append"/>
    </template>
  </app-input>

</template>

<style lang="scss" src="./AppInputAmount.scss"/>