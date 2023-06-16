<script setup lang="ts">
import AppSectionTitle from "@/components/UI/AppSectionTitle/AppSectionTitle.vue";
import ProductForm from "@/components/workspace/ProductForm/ProductForm.vue";
import ProductRepository from "@/repositories/modules/products.repository"
import AppBreadcrumbs from "@/components/UI/AppBreadcrumbs/AppBreadcrumbs.vue";
import {useRouter} from "vue-router";
import useToast from "@/components/UI/AppToast/useToast";
const router = useRouter();
const  { toast } = useToast();
async function createProduct(data: object) {
  return await ProductRepository.create(data)
      .then(() => {
        router.push({
          name: 'ProductIndex'
        });
        toast.success('Added new item');
      });
}
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
  },
  {
    to: {
      name: 'ProductCreate',
    },
    title: 'Create'
  }
];
</script>

<template>
  <div>
    <app-breadcrumbs
        :links="links"
    />
    <app-section-title>
      Create Product
    </app-section-title>
    <product-form
        submit-text="Create"
        :submit-action="createProduct"
    />
  </div>
</template>

