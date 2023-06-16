<script lang="ts" setup>
import { computed } from "vue";
import { helpers } from "@vuelidate/validators";
import AppInputAmount from "@/components/UI/AppInputAmount/AppInputAmount.vue";

const props = defineProps({
  modelValue: {
    type: [Number, String],
  },
  large: {
    type: Boolean,
    default: false
  },
  hint: {
    type: String,
    default: ''
  }
});
const emit = defineEmits(['update:modelValue']);

const computedModelValue = computed({
  get() {
    return props.modelValue
  },
  set(newValue) {
    emit('update:modelValue', newValue)
  }
})


</script>

<template>
  <app-input-amount
    v-model="computedModelValue"
    class="app-input-money"
    :large="large"
    :hint="props.hint"
  >

    <template #label>
      <slot name="label"/>
    </template>
    <template #append>
      <div class="app-input-money__currency">$</div>
    </template>
  </app-input-amount>
</template>


<style lang="scss" src="./AppInputMoney.scss"/>