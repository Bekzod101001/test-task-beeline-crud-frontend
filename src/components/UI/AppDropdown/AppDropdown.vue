<script lang="ts" setup>
import type { Ref } from "vue";
import { computed, onMounted, onUnmounted, ref } from "vue";

export type DropdownItems = {
  to?: String | Object,
  onClick?: Function,
  label: String,
  href?: String
}
type Props = {
  items: DropdownItems[],
  activeValue?: String
}

const props = defineProps<Props>();
const dropdownIsActive = ref(false);
const root: Ref = ref(null);

const computedItems = computed(() => {
  return props.items.map(item => {
    let component: string = '';
    if (item.to) component = 'router-link';
    if (item.href) component = 'a';
    if (item.onClick) component = 'button';
    return {
      component: component,
      label: item.label,
      onClick: item.onClick,
      href: item.href ? item.href : '',
      to: item.to ? item.to : ''
    };
  });
});

function closeIfClickedOutside (e: Event) {
  const target = e.target as HTMLElement;
  if (!root.value.contains(e.target) || target.classList.contains('dropdown__body__item')) {
    dropdownIsActive.value = false;
  }
}

function toggleDropdown() {
  dropdownIsActive.value = !dropdownIsActive.value;
}

onMounted(() => {
  window.addEventListener('click', closeIfClickedOutside);
});
onUnmounted(() => {
  window.removeEventListener('click', closeIfClickedOutside);
});
</script>

<template>
  <div
    ref="root"
    :class="[
      'dropdown',
      {
        'dropdown_active': dropdownIsActive
      }
    ]"
  >
    <div
      class="dropdown__toggler"
      @click.prevent="toggleDropdown()"
    >
      <slot name="header"/>
    </div>
    <div class="dropdown__body">
      <component
        :is="item.component"
        v-for="(item, index) in computedItems"
        :key="index"
        :href="item.href"
        :to="item.to"
        :class="['dropdown__item', item.label === activeValue ? 'dropdown__item--active': '']"
        @click="item.onClick ? item.onClick() : ''; toggleDropdown();"
      >
        {{ item.label }}
      </component>
    </div>
  </div>
</template>

<style lang="scss" src="./AppDropdown.scss"/>