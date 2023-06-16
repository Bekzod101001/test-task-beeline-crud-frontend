<script lang="ts" setup>
import { computed, onMounted, useSlots, watch } from "vue";
import { getScrollBarWidth } from "@/utils/helper";
import ProgressLinear from "@/components/UI/AppProgressLinear/AppProgressLinear.vue";

const props = defineProps({
  modelValue: Boolean,
  loading: Boolean
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
  <transition name="side-panel">
    <div
      v-if="modelValue"
      class="side-panel"
    >
      <div
        class="side-panel__overlay"
        @click="closeModal()"
      />
      <div class="side-panel__wrapper">
        <div class="side-panel__window">
          <div class="side-panel__header">
            <progress-linear
              v-if="loading"
              class="side-panel__header__linear"
            />
            <slot name="header"/>
            <button
              class="side-panel__close"
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
              'side-panel__body',
              {
                'side-panel__body--no-padding': !isButtonsSlotExist
              }
            ]"
          >
            <slot name="body"/>
          </div>
          <div
            v-if="isButtonsSlotExist"
            class="side-panel__buttons"
          >
            <slot name="buttons"/>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" src="./AppSidePanel.scss"/>