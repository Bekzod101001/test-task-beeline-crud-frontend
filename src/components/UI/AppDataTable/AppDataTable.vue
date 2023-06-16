<script lang="ts" setup>
import { useSlots } from "vue";
import AppPlaceholder from "@/components/UI/AppPlaceholder/AppPlaceholder.vue";

export interface ITableHeader {
  key: string,
  title: string,
  sortable?: boolean
}

interface IPagination {
  current: number | null,
  total: number | null
}

interface IProps {
  headers?: ITableHeader[],
  items?: [],
  pagination?: IPagination
  hideHeader?: boolean
  striped?: boolean,
  loading?: boolean,
  loadingSkeletonCount?: number,
}

const props = withDefaults(defineProps<IProps>(), {
  hideHeader: false,
  striped: true,
  loadingSkeletonCount: 5
})
const slots = useSlots();


function detectSlotExistence(column: ITableHeader) {
    return slots[`item.${column.key}`];
}
</script>

<template>
    <div
      :class="['data-table', {
        'data-table--striped': props.striped
      }]"
    >
        <table>
            <thead
                v-if="!props.hideHeader"
                v-once
            >
                <tr>
                    <th
                        v-for="(item, index) in props.headers"
                        :key="index"
                    >
                        {{ item.title }}
                    </th>
                </tr>
            </thead>
            <tbody>
              <tr v-if="items.length === 0 && !props.loading">
                <td class="data-table__empty" :colspan="props.headers.length">
                  Not Found
                </td>
              </tr>

              <tr
                  class="data-table__row"
                  v-for="(item, itemIndex) in items"
                  :key="itemIndex"
                >
                    <td
                        v-for="(column, columnIndex) in props.headers"
                        :key="columnIndex"
                    >
                        <template v-if="!detectSlotExistence(column)">
                            {{ item[column.key] }}
                        </template>
                        <slot
                            v-else
                            :index="itemIndex"
                            :item="item"
                            :name="`item.${column.key}`"
                        />
                    </td>
                </tr>
              <template v-if="props.loading">
                <tr v-for="index in props.loadingSkeletonCount">
                  <td
                    v-for="(column, columnIndex) in props.headers"
                    :key="columnIndex"
                  >
                    <app-placeholder class="data-table__placeholder" height="32px"/>
                  </td>
                </tr>
              </template>

            </tbody>
        </table>
    </div>
</template>

<style lang="scss" src="./AppDataTable.scss"/>