<script setup lang="ts">
import AppSectionTitle from "../../components/UI/AppSectionTitle/AppSectionTitle.vue";
import AppDataTable from "../../components/UI/AppDataTable/AppDataTable.vue";
import ProductRepository from "@/repositories/modules/products.repository";

import type { Ref } from 'vue';
import {reactive, ref} from 'vue';
import AppBtn from "@/components/UI/AppBtn/AppBtn.vue";
import AppBreadcrumbs from "@/components/UI/AppBreadcrumbs/AppBreadcrumbs.vue";
import AppPagination from "@/components/UI/AppPagination/AppPagination.vue";
import AppInput from "@/components/UI/AppInput/AppInput.vue";
import AppSelect from "@/components/UI/AppSelect/AppSelect.vue";
import useUsers from "@/composables/useUsers.";
const tableHeaders = [
  {
    title: "Name",
    key: 'name'
  },
  {
    title: "Description",
    key: 'smallDescription'
  },
  {
    title: "Price",
    key: 'price'
  },
  {
    title: "Owner",
    key: 'owner'
  },
  {
    title: "Created At",
    key: 'createdAt'
  },
  {
    title: "Actions",
    key: 'actions'
  },
]

const { users, loadUsers } = useUsers();
loadUsers();

const items = ref([]);
const requestPending: Ref<boolean> = ref(false);
const activePage = ref(1);
const totalPages = ref(1);
const filters = reactive({
  search: '',
  sortBy: null,
  sortType: null,
  ownerId: null,
})
const links = [
  {
    to: {
      name: 'Main',
    },
    title: 'Main'
  },
  {
    to: {
      name: 'ProductIndex',
    },
    title: 'Products'
  }
];
const sortableFields = [
  {
    label: 'By price',
    value: 'price'
  },
  {
    label: 'By Name',
    value: 'name'
  },
  {
    label: 'By Date of creation',
    value: 'created_at'
  }
]
const sortTypes = [
  {
    label: 'Ascending',
    value: 'asc'
  },
  {
    label: 'Descending',
    value: 'desc'
  }
]

function getProducts() {
  requestPending.value = true;
  ProductRepository.getAll({
    page: activePage.value,
    search: filters.search,
    sortBy: filters.sortBy,
    sortType: filters.sortType,
    ownerId: filters.ownerId
  })
      .then(response => {
        items.value = response.data.items;
        activePage.value = response.data.pagination.current;
        totalPages.value = response.data.pagination.last;
      })
      .finally(() => {
        requestPending.value = false;
      })
}
function changeFilters() {
  activePage.value = 1;
  totalPages.value = 1;
  getProducts();
}

getProducts();

const deleteRequestPending = ref(false);
function deleteProduct(item: object, index: number) {
  if(deleteRequestPending.value) return;
  deleteRequestPending.value = true;
  ProductRepository.delete(item.id)
    .then(() => {
      items.value.splice(index, 1);
    })
    .finally(() => {
      deleteRequestPending.value = false;
    });
}


</script>
<template>
  <div class="products">
    <app-breadcrumbs
        :links="links"
    />
    <app-section-title>
      Products
      <template #buttons>
        <app-btn
          :to="{
            name: 'ProductCreate'
          }"
        >
          Create
        </app-btn>
      </template>
    </app-section-title>

    <div class="filter-block">
      <div class="filter-block__item">
        <app-input
            v-model="filters.search"
        >
          <template #label>
            Search by name
          </template>
        </app-input>
      </div>
      <div class="filter-block__item">
        <app-select
            :items="users"
            v-model="filters.ownerId"
            label="Owner"
            item-value="id"
            item-text="fullName"
            clearable
        />
      </div>
      <div class="filter-block__item">
        <app-select
          :items="sortableFields"
          v-model="filters.sortBy"
          label="Sort by"
          clearable
        />
      </div>
      <div class="filter-block__item">
        <app-select
            :items="sortTypes"
            v-model="filters.sortType"
            label="Sort type"
            clearable
        />
      </div>
      <app-btn
        @click="changeFilters()"
      >
        Apply
      </app-btn>
    </div>
    <app-data-table
      :headers="tableHeaders"
      :items="items"
      :loading-skeleton-count="20"
      :loading="requestPending"
      class="products__table"
    >
      <template #item.price="{item}">
        <span>{{ item.price }}$</span>
      </template>
      <template #item.actions="{item, index}">
        <div class="u-d-flex">
          <app-btn
              class="products__table__btn"
              :to="{
            name: 'ProductSingle',
            params: {
              id: item.id,
            }
          }"
          >
            Подробнее
          </app-btn>
          <app-btn @click="deleteProduct(item, index)" class="u-mt-2" outlined>
            Удалить
          </app-btn>
        </div>
      </template>
    </app-data-table>
    <app-pagination
        class="u-mt-4"
        v-model="activePage"
        :total-pages="totalPages"
        @update:modelValue="getProducts()"
    />
  </div>
</template>

