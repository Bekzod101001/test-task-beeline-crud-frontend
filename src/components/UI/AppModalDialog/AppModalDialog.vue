<script lang="ts" setup>
import { computed, onMounted, useSlots, watch } from "vue";
import { getScrollBarWidth } from "@/utils/helper";

const props = defineProps({
  modelValue: {
    type: Boolean
  },
  size: {
    type: String,
    validator(value: string) {
      return ['large', 'medium', 'small'].includes(value);
    },
    default: 'small'
  }
});

const emit = defineEmits(['update:modelValue']);
const slots = useSlots();

const isButtonsSlotExist = computed(() => {
  return !!slots.buttons;
});

function closeModal() {
  emit('update:modelValue', false);
}

function disableScroll() {
  const htmlEl = document.querySelector('html') as HTMLHtmlElement;
  const scrollBarWidth = getScrollBarWidth() + 'px';
  if (props.modelValue) {
    htmlEl.classList.add('disabledY');
    htmlEl.style.paddingRight = scrollBarWidth;
  } else {
    htmlEl.classList.remove('disabledY');
    htmlEl.style.paddingRight = '';
  }
}

watch(() => props.modelValue, () => {
  disableScroll();
});

onMounted(() => {
  disableScroll();
});

</script>

<template>
  <transition name="modal">
    <div
      v-show="modelValue"
      :class="[
        'modal',
        `modal--size-${size}`
      ]"
    >
      <div
        class="modal__overlay"
        @click="closeModal()"
      />
      <div class="modal__wrapper">
        <div class="modal__window">
          <div class="modal__header">
            <slot name="header"/>
            <button
              class="modal__close"
              @click="closeModal()"
            >
              <svg
                data-src="/images/icons/close.svg"
                height="24"
                width="24"
              />
            </button>
          </div>

          <div
            :class="[
              'modal__body',
              {
                'modal__body--no-padding': !isButtonsSlotExist
              }
            ]"
          >
            <slot name="body"/>
          </div>
          <div
            v-if="isButtonsSlotExist"
            class="modal__buttons"
          >
            <slot name="buttons"/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" src="./AppModalDialog.scss"/>