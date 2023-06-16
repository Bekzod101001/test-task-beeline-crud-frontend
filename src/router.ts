import { createRouter, createWebHistory } from "vue-router";

import Main from "./views/Main.vue";
import PageNotFound from "./views/PageNotFound.vue";
import ProductIndex from '@/views/Product/ProductIndex.vue';
import ProductSingle from '@/views/Product/ProductSingle.vue';
import ProductCreate from '@/views/Product/ProductCreate.vue';

import UserIndex from '@/views/User/UserIndex.vue';
import UserSingle from '@/views/User/UserSingle.vue';

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior(to, from, savedLocation) {
    return { top: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,

    },
    {
      path: '/users',
      name: 'UserIndex',
      component: UserIndex,

    },
    {
      path: '/users/:id',
      name: 'UserSingle',
      component: UserSingle,
    },
    {
      path: '/products',
      name: 'ProductIndex',
      component: ProductIndex,

    },
    {
      path: '/products/create',
      name: 'ProductCreate',
      component: ProductCreate,

    },
    {
      path: '/products/:id',
      name: 'ProductSingle',
      component: ProductSingle,

    },
    { path: "/:pathMatch(.*)*", component: PageNotFound }
  ]
});
