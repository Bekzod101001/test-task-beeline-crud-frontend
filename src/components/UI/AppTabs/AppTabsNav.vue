<script lang="ts" setup>
import type { PropType, Ref } from "vue";
import { computed, onMounted, provide, ref } from "vue";
import { useRouter } from "vue-router";
import TabsNavItem from "@/components/UI/AppTabs/AppTabsNavItem.vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: null,
  },
  items: {
    type: Array as PropType<{
      name?: string;
      title: string;
      value?: number;
      activeOnRoutes?: string[]
    }[]>,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const tabsNavWrapper = ref();
const activeMark: Ref<HTMLElement> = ref();
const itemsCounter = ref(0);
const router = useRouter();

const computedModelValue = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit("update:modelValue", newVal);
    computedItems.value.map((item) => {
      if (item.value === newVal && item.name) {
        router.push({ name: item.name });
      }
    });
  },
});

const windowObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.contentRect.width >= 767) {
      activeItemStylize();
    }
  });
});

const computedItems = computed(() => {
  if (!props.items.length) return [];

  return props.items.map((item, index) => {
    item.value = index;
    return item;
  });
});

function activeItemStylize() {
  if (!tabsNavWrapper.value) return;
  setTimeout(() => {
    let children = tabsNavWrapper.value ? Array.from(tabsNavWrapper.value?.children) : [];
    children.forEach((child) => {
      if (child.classList.contains("tabs-nav-item--active")) {
        const item: HTMLElement = child as HTMLElement;

        const offsetLeft = item.offsetLeft;
        const offsetWidth = item.offsetWidth;
        const offsetHeight = item.offsetHeight;
        const offsetTop = item.offsetTop;

        activeMark.value.style.width = `${offsetWidth}px`;
        activeMark.value.style.height = `${offsetHeight}px`;
        activeMark.value.style.top = `${offsetTop}px`;
        activeMark.value.style.left = `${offsetLeft}px`;
      }
    });
  }, 50);
}

provide("counter", itemsCounter);
provide("selectedItem", computedModelValue);
provide("activeItemStylize", activeItemStylize);

onMounted(() => {
  activeItemStylize();
  const main = document.getElementById("app");
  windowObserver.observe(main!);
});
</script>

<template>
  <div class="tabs-nav">
    <div ref="tabsNavWrapper" class="tabs-nav__wrapper">
      <div ref="activeMark" class="tabs-nav__active-mark" />
      <slot>
        <tabs-nav-item
          v-for="(route, index) in items"
          :key="index"
          :activeOnRoutes="route.activeOnRoutes"
          :to="{ name: route.name }"
        >
          {{ route.title }}
        </tabs-nav-item>
      </slot>
    </div>
  </div>
</template>

<style lang="scss" src="./AppTabs.scss" />