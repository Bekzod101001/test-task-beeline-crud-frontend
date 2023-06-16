<script lang="ts" setup>
import { computed, inject, type PropType, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  to: {
    type: [String, Object] as PropType<string | {
      name: string
    }>,
    default: null
  },
  value: {
    type: [String, Number],
    default: null
  },
  activeOnRoutes: Array as PropType<string[]>
})
const route = useRoute()
const router = useRouter()
const itemsCounter = inject('counter')
const selectedItem = inject('selectedItem')
const activeItemStylize = inject('activeItemStylize')
const index = ref(0)

index.value = itemsCounter.value
itemsCounter.value++

const componentTag = computed(() => {
  return props.to?.name ? 'router-link' : 'button'
})
const tabValue = computed(() => {
  return props.value !== null ? props.value : index.value
})

const isActive = computed(() => {
  if (props.to) {

    if(props.activeOnRoutes) {
      return props.activeOnRoutes.includes(route.name);
    }
    const matchedRouteNames = route.matched.map(item => item.name);

    return matchedRouteNames.includes(props.to.name);
  }

  return tabValue.value === selectedItem.value
})


function onClick () {
  if (props.to) {
    router.push(props.to)
  }

  selectedItem.value = tabValue.value
  activeItemStylize()
}

</script>

<template>
  <component
    :is="componentTag"
    :class="['tabs-nav-item', {
      'tabs-nav-item--active': isActive
    }]"
    :to="to"
    @click="onClick"
  >
    <slot/>
  </component>
</template>

<style lang="scss" src="./AppTabs.scss"/>