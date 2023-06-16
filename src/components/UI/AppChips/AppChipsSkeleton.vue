<script lang="ts" setup>
import AppPlaceholder from "@/components/UI/AppPlaceholder/AppPlaceholder.vue";

type Props = {
  count: number,
  height: String,
  width: String,
  borderRadius: String,
}

const props = withDefaults(defineProps<Props>(), {
  count: 10,
})
const emit = defineEmits(['update:modelValue', 'click'])



</script>
<template>
  <div class="chips">
    <app-placeholder
      v-for="index in props.count"
      :height="props.height"
      :width="props.width"
      :border-radius="props.borderRadius"
    />
  </div>
</template>