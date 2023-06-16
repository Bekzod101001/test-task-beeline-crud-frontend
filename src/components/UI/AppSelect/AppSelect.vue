<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import AppChip from "@/components/UI/AppChips/AppChip.vue";
import AppFormBlock from "@/components/UI/AppFormBlock/AppFormBlock.vue";

const props = defineProps({
  modelValue: {
    type: null,
  },
  name: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  items: {
    type: Array,
    required: true
  },
  itemText: {
    type: String,
    default: 'label'
  },
  itemValue: {
    type: String,
    default: 'value'
  },
  icon: {
    type: String,
    default: null
  },
  height: {
    type: [Number, String],
    default: null
  },
  clearable: Boolean,
  outlined: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: null
  },
  returnObject: {
    type: Boolean,
    default: false
  },
  touched: {
    type: Object,
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
  },
  autocomplete: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:modelValue',
  'change'
])
const root = ref(null)
const showOptions = ref(false)
const searchingText = ref('')
const searchInput = ref()

const headerText = computed(() => {
  if (selectedItem.value) {
    return selectedItem.value[props.itemText]
  }

  return props.title
})

const selectedItem = computed(() => {
  if (props.items.length === 0) return null

  if (props.returnObject) return props.modelValue

  return props.items.find((item) => {
    if (Array.isArray(props.modelValue)) {
      return props.modelValue.includes(item[props.itemValue])
    } else {
      return item[props.itemValue] === props.modelValue
    }
  })
})

const selectedItems = computed(() => {
  if (props.items.length === 0 || props.modelValue === null) return

  return props.items.filter((item) => {
    if (props.returnObject) {
      return props.modelValue.some(selectedItem => selectedItem[props.itemValue] === item[props.itemValue]);
    } else {
      return props.modelValue.includes(item[props.itemValue])
    }
  })
})

const computedItems = computed(() => {
  let items = props.items;
  if(typeof items[0] !== 'object') {
    items = props.items.map((item) => ({
      label: item,
      value: item
    }))
  }

  if (props.autocomplete) {
    return items.filter((item) => {
      return item[props.itemText].toLowerCase().includes(searchingText.value.toLowerCase())
    })
  }

  return items;
})

function checkIfItemIsSelected (item) {
  if (!props.modelValue) return
  if (!props.multiple) {
    if (!selectedItem.value) return false;
    const valueForCheck = props.returnObject ? selectedItem.value[props.itemValue] : selectedItem.value[props.itemValue];
    return item[props.itemValue] === valueForCheck;
  } else if (props.returnObject) {
    return props.modelValue.some((selectedItem) => {
      return selectedItem[props.itemValue] === item[props.itemValue]
    })
  } else {
    return props.modelValue.includes(item[props.itemValue])
  }
}

function toggle () {
  showOptions.value = !showOptions.value
}

function open () {
  showOptions.value = true
}


function selectItem (item) {
  if (!props.multiple) {
    emit('update:modelValue', props.returnObject ? item : item[props.itemValue]);
    emit('change');
    showOptions.value = false;
    searchingText.value = item[props.itemText];
  } else {
    toggleItem(item)
    searchingText.value = ''
  }

}

function toggleItem (item) {
  if (checkIfItemIsSelected(item)) {
    removeSelectedItem(item);
  } else {
    addItemToSelected(item);
  }
}

function addItemToSelected (item) {
  const valueToPush = props.returnObject ? item : item[props.itemValue];
  props.modelValue.push(valueToPush)
}

function removeSelectedItem (item) {
  if (Array.isArray(props.modelValue)) {
    const index = props.modelValue.findIndex(selectedItem => selectedItem === item[props.itemValue])
    props.modelValue.splice(index, 1)
  } else {
    emit('update:modelValue', null);
    emit('change')
  }
}

function clear () {
  emit('update:modelValue', null);
  emit('change')
}

function onClickOutside (e) {
  if (!root.value.contains(e.target)) {
    showOptions.value = false
  }
}

window.onkeydown = (e) => {
  if (e.keyCode === 27) {
    showOptions.value = false
  }
}



function selectItemFromOutside () {
  if(props.modelValue) {
    const item = props.items.find(item => item[props.itemValue] === props.modelValue);
    if(item) selectItem(item);
  }
}

function onSearchInput () {
  const item = props.items.find(item => item[props.itemText] === searchingText.value);
  if(item) selectItem(item);
}

onMounted(() => {
  selectItemFromOutside();
  window.addEventListener('click', onClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('click', onClickOutside)
})

watch(props.modelValue, () => {
  selectItemFromOutside();
})
watch(showOptions, () => {
  if (showOptions.value && props.autocomplete) {
    searchInput.value.focus()
  }
})
</script>

<template>
  <app-form-block
    :class="{
      'form-block--label-anim': modelValue === null,
    }"
  >

    <template #label>
      {{ label }}
    </template>
    <div
      ref="root"
      :class="[
      'app-select',
      {
        'app-select--active': showOptions,
        'app-select--outlined': outlined,
        'app-select--autocomplete': autocomplete
      },
      color ? `app-select--${color}` : ''
    ]"
    >
      <button
        v-if="clearable && selectedItem"
        class="app-select__clear"
        @click.prevent="clear()"
      >
        <svg data-src="/images/icons/close.svg"/>
      </button>
      <button
        :style="{
        height: height ? height + 'px' : ''
      }"
        :tabindex="!computedItems.length ? '-1' : ''"
        class="app-select__header"
        @blur="touched ? touched.blur() : ''"
        @click="toggle()"
      >
        <svg
          v-if="icon"
          v-once
          :data-src="icon"
          class="app-select__icon"
        />
        <span class="app-select__wrap">
        <template v-if="!autocomplete">
          <template v-if="!multiple">
            <div class="app-select__wrap__text">
              {{ headerText }}
            </div>
          </template>
          <template v-else>
            <app-chip
              v-for="(chip, index) in selectedItems"
              :key="index"
              removable
              @remove="removeSelectedItem(chip)"
              @click.stop
            >
              {{ chip[itemText] }}
            </app-chip>
          </template>
        </template>
        <template v-if="autocomplete">
          <template v-if="multiple">
            <app-chip
              v-for="(chip, index) in selectedItems"
              :key="index"
              removable
              @remove="removeSelectedItem(chip)"
              @click.stop
            >
              {{ chip[itemText] }}
            </app-chip>
          </template>
          <input
            ref="searchInput"
            v-model="searchingText"
            @update:modelValue="onSearchInput()"
            class="app-select__search-input"
            type="text"
            @click.stop="open"
          >
        </template>
      </span>
        <div class="app-select__arrow">
          <svg data-src="/images/icons/arrowDown.svg"/>
        </div>
      </button>
      <div class="app-select__options">
        <div
          v-if="computedItems.length === 0"
          class="app-select__option app-select__option--no-selectable"
        >
          <i>Empty</i>
        </div>
        <div
          v-for="(item, index) in computedItems"
          :key="index"
        >
          <div
            v-if="item.header"
            class="app-select__option app-select__option--header"
          >
            {{ item.header }}
          </div>
          <button
            v-else
            :class="[
            'app-select__option',
            {
              'app-select__option--selected': checkIfItemIsSelected(item)
            }
          ]"
            @click="selectItem(item)"
          >
            {{ item[itemText] }}
          </button>
        </div>
      </div>
    </div>
  </app-form-block>

</template>

<style lang="scss" src="./AppSelect.scss"/>