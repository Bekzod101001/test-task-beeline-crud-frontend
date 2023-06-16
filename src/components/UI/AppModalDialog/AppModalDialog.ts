import { computed } from "vue";

export default function useModalDialog (props: any, emit: any) {

  function closeModal() {
    emit('update:modelValue', false);
  }

  const computedModelValue = computed({
    get() { return props.modelValue },
    set(newValue) { emit('update:modelValue', newValue) }
  })

  return {closeModal, computedModelValue}
}