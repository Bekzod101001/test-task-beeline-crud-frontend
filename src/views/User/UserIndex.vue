<script setup lang="ts">
import AppSectionTitle from "../../components/UI/AppSectionTitle/AppSectionTitle.vue";
import AppDataTable from "../../components/UI/AppDataTable/AppDataTable.vue";
import UserRepository from "@/repositories/modules/users.repository";

import type { Ref } from 'vue';
import { ref } from 'vue';
import AppBreadcrumbs from "@/components/UI/AppBreadcrumbs/AppBreadcrumbs.vue";
import AppPagination from "@/components/UI/AppPagination/AppPagination.vue";
const tableHeaders = [
  {
    title: 'Full Name',
    key: 'fullName'
  },
  {
    title: 'Username',
    key: 'username'
  },
  {
    title: 'Products',
    key: 'products'
  }
]

const items = ref([]);
const requestPending: Ref<boolean> = ref(false);
const links = [
  {
    to: {
      name: 'Main',
    },
    title: 'Main'
  },
  {
    to: {
      name: 'UserIndex',
    },
    title: 'Users'
  }
];

const activePage = ref(1);
const totalPages = ref(1);
async function getUsers() {
  UserRepository.getAll({
    page: activePage.value,
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
getUsers();
</script>
<template>
  <div>
    <app-breadcrumbs
        :links="links"
    />
    <app-section-title>
      Users
    </app-section-title>
    <app-data-table
        :headers="tableHeaders"
        :items="items"
        :loading="requestPending"
    >
      <template #item.products="{ item }">
        <router-link
          v-for="product in item.products"
          :to="{
            name: 'ProductSingle',
            params: {
              id: product.id,
            }
          }"
        >
          <u>{{ product.name }}</u> &nbsp;
        </router-link>
      </template>
    </app-data-table>
    <app-pagination
        class="u-mt-4"
        v-model="activePage"
        :total-pages="totalPages"
        @update:modelValue="getUsers()"
    />
  </div>
</template>

