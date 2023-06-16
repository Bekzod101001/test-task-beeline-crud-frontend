<script setup lang="ts">
import { computed, onMounted, ref, useSlots, watch } from "vue";
import AppFormBlock from "@/components/UI/AppFormBlock/AppFormBlock.vue";

const props = defineProps({
  modelValue: String,
  maxLength: {
    type: [String, Number],
  },
  bgColor: {
    type: String,
    default: 'transparent'
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: String
})
const emit = defineEmits(['update:modelValue', 'submit', 'blur'])
const textarea = ref(null);
const slots = useSlots();
const isInputFocused = ref(false);

const computedLabelStyleAsPlaceholder = computed(() => {
  return slots.label && !props.modelValue && !isInputFocused.value;
});


const toggleInputFocus = (val: boolean) => {
  isInputFocused.value = val;
  if(!val) {
    emit("blur");
  }
}

const computedModelValue = computed({
  get () {
    return props.modelValue
  },
  set (newVal) {
    emit('update:modelValue', newVal)
  }
})

function calculateHeight () {
  const firstHeight = 20
  let textareaHeight = textarea.value.style
  if(!computedModelValue.value) {
    textareaHeight.height = `${firstHeight}px`
    return
  }
  const newHeight = textarea.value.scrollHeight

  if(newHeight >= firstHeight && newHeight <= 100) textareaHeight.height = newHeight + 'px'
  else textareaHeight.height = '200px'
}

function keypress(e: KeyboardEvent) {
  const keyCode = e.which || e.keyCode;
  if(keyCode === 13 && !e.shiftKey && !e.metaKey) {
    e.preventDefault()
    emit('submit')
  } else if (keyCode === 13 && e.metaKey) {
    computedModelValue.value += '\n'
  }
}

onMounted(() => {
  calculateHeight()
})

watch(computedModelValue, () => {
  calculateHeight()
})

</script>

<template>
  <app-form-block
    :class="{
      'form-block--label-anim': computedLabelStyleAsPlaceholder,
      'form-block--disabled': props.disabled
    }"
  >
    <template #label>
      <slot name="label"/>
    </template>

    <div
      :class="['app-textarea', {
        'padding-bottom': maxLength ? '35px': ''
      }]"
    >
      <textarea
        ref="textarea"
        class="app-textarea__field"
        v-model="computedModelValue"
        :maxlength="maxLength"
        @focus="toggleInputFocus(true)"
        @focusout="toggleInputFocus(false)"
        :placeholder="props.placeholder"
        :style="[
          {
            'background-color': bgColor
          }
        ]"
        @keydown="keypress"
      />
      <div
        class="app-textarea__length"
        v-if="maxLength"
      >
        {{ computedModelValue.length }} / {{ maxLength }}
      </div>
    </div>

  </app-form-block>
</template>

<style lang="scss" src="./AppTextarea.scss" />