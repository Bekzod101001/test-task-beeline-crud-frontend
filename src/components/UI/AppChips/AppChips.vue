<script lang="ts" setup>
import { computed } from "vue";
import AppChip from "@/components/UI/AppChips/AppChip.vue";

type Props = {
  modelValue: string[] | number[] | string | number | null,
  items: any[],
  itemValue?: string,
  itemText?: string,
  small?: boolean,
  multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  itemValue: 'value',
  itemText: 'label',
  small: false,
  multiple: false
})
const emit = defineEmits(['update:modelValue', 'click'])

const computedModelValue = computed({
  get() {return props.modelValue},
  set(newValue) {emit('update:modelValue', newValue)}
})

const computedItems = computed(() => {
  return props.items.map(item => {
    if(props.multiple) {
      item.isActive = !!computedModelValue.value!.includes(item[props.itemValue]);
    }
    else {
      item.isActive = computedModelValue.value === item[props.itemValue]
    }

    return item
  })
})

function toggleSelect (value: string | number) {
  if(props.multiple) {
    if(computedModelValue.value.includes(value)) {
      computedModelValue.value = computedModelValue.value!.filter(item => item !== value ? item : '')
    }
    else {
      computedModelValue.value.push(value)
    }
  }
  else {
    computedModelValue.value = value;
  }

  emit('click', value)
}

</script>
<template>
  <div class="chips">
    <app-chip
      v-for="chip in computedItems"
      :key="chip[itemValue]"
      :class="{'chip--active': chip.isActive}"
      :small="small"
      @click="toggleSelect(chip[itemValue])"
    >
      {{ chip[itemText] }}
    </app-chip>
  </div>
</template>