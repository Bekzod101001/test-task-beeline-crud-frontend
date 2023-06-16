<script lang="ts" setup>
import type { Ref } from "vue";
import AppFormBlock from "@/components/UI/AppFormBlock/AppFormBlock.vue";
import { computed, type PropType, ref, useSlots, watch } from "vue";

const slots = useSlots();
const props = defineProps({
  maxLength: Number,
  minLength: Number,
  type: {
    type: String,
    default: 'text',
    validator: (value: string) => {
      return ['text', 'password', 'email', 'tel', 'number', 'search', 'color'].includes(value);
    }
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: Boolean,
    default: false
  },
  color: {
    type: String as PropType<'white' | 'black'>,
    default: 'black'
  },
  readonly: {
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
  placeholder: {
    type: String,
  },
  modelValue: {
    type: String,
  },
  mask: {
    type: [String, Array] as PropType<string | string[]>
  },
  format: {
    type: Function
  },
  large: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  keypress: {
    type: Function,
    default: null
  },
  clearable: {
    type: Boolean,
    default: false
  },
  validationKey: {
    type: String,
    required: false
  },
  validationRules: {
    type: [Object, String],
    required: false
  },
  regex: {
    type: [String],
    required: false,
  },
  hint: {
    type: String,
    required: false,
  }
});
const prependSlot: Ref<Element | null> = ref(null);
const appendSlot: Ref<Element | null> = ref(null);
const isInputFocused = ref(false);
const emit = defineEmits(['update:modelValue', 'blur', 'keyup.enter', 'change']);

const computedModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {

    let val = props.format ? props.format(value) : value;
    if(!props.mask) {
      return emit('update:modelValue', val);
    }

    function emitValue(maskLength: number) {
      if(maskLength >= value.length) {
        emit('update:modelValue', val);
        console.log(val);
      }
    }

    if(Array.isArray(props.mask)) {
      props.mask.map((item: string) => {
        emitValue(item.length);
      })
    } else {

      emitValue(props.mask?.length)
    }
  }
});



const isExistLabel = computed(() => {
  return slots.label
})

const computedLabelStyleAsPlaceholder = computed(() => {
  return slots.label && !props.modelValue && !isInputFocused.value;
});

const computePaddingFromLeft = computed(() => {
  if (!prependSlot?.value) return;

  const prependSlotWidth = prependSlot.value.clientWidth + 8;
  return prependSlotWidth ? `${prependSlotWidth}px` : '0';
});

const computePaddingFromRight = computed(() => {
  if (!appendSlot?.value) return;
  const appendSlotWidth = appendSlot.value.clientWidth + 8;
  return appendSlotWidth ? `${appendSlotWidth}px` : '0';
});

const computedClasses = computed(() => {
  return [
    'app-input',
    props.disabled ? 'app-input--disabled' : null,
    props.color ? `app-input--${props.color}` : null,
    props.type === 'color' ? 'app-input--type-color' : null
  ]
})

const computedStyles = computed(() => {
  return {
    'padding-left': computePaddingFromLeft.value,
    'padding-right': computePaddingFromRight.value,
    'width': computedWidth.value,
    'height': computedHeight.value,
  };
});

const computedWidth = computed(() => {
  if (!props.width) return false;
  if (props.width) return props.width + (typeof props.width === 'number' ? 'px' : '');

  return false;
});
const computedHeight = computed(() => {
  if (props.height) return props.height + (typeof props.height === 'number' ? 'px' : '');

  return false;
});

const toggleInputFocus = (val: boolean) => {
  isInputFocused.value = val;
  if(!val) {
    emit("blur");
  }
}

function clearValue() {
  computedModelValue.value = ''
}


</script>

<template>
  <app-form-block
    :class="{
      'form-block--label-anim': computedLabelStyleAsPlaceholder,
      'form-block--disabled': props.disabled
    }"
    :large="large"
    :outlined="outlined"
  >
    <template #label>
      <slot name="label"/>
    </template>
    <div
      :class="['app-input', computedClasses, {
        'app-input--large': props.large,
        'app-input--outlined': props.outlined,
        'app-input--read-only': props.readonly,
        'app-input--no-label': !isExistLabel
      }]"
    >
      <div class="app-input__row">
        <div
          v-if="$slots.prepend"
          v-once
          ref="prependSlot"
          class="app-input__prepend"
        >
          <slot name="prepend"/>
        </div>
        <input
          v-model="computedModelValue"
          :maxlength="props.maxLength"
          class="app-input__field"
          :readonly="props.readonly"
          :type="props.type"
          :disabled="props.disabled"
          :placeholder="props.placeholder"
          :style="computedStyles"
          @focus="toggleInputFocus(true)"
          @focusout="toggleInputFocus(false)"
          @keypress="props.keypress"
          @keyup.enter="emit('keyup.enter')"
          @change="emit('change')"
        />
        <div
          v-if="$slots.append"
          ref="appendSlot"
          class="app-input__append"
        >
          <button
            v-if="clearable && computedModelValue"
            class="app-input__append__clear-btn"
            @click="clearValue"
          >
            <svg data-src="/images/icons/close.svg"/>
          </button>
          <slot name="append"/>

        </div>
      </div>
      <div class="app-input__hint" v-if="props.hint">
        {{ props.hint }}
      </div>
    </div>
  </app-form-block>

</template>


<style lang="scss" src="./AppInput.scss"/>