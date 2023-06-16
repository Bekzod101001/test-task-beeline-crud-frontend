<script setup lang="ts">
import AppSectionTitle from "../../components/UI/AppSectionTitle/AppSectionTitle.vue";
import AppDataTable from "../../components/UI/AppDataTable/AppDataTable.vue";
import ProductForm from "@/components/workspace/ProductForm/ProductForm.vue";
import ProductRepository from "@/repositories/modules/products.repository";
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import AppProgressLinear from "@/components/UI/AppProgressLinear/AppProgressLinear.vue";
import AppBreadcrumbs from "@/components/UI/AppBreadcrumbs/AppBreadcrumbs.vue";
import useToast from "@/components/UI/AppToast/useToast";

const route = useRoute();
const id: number = +route.params.id;
const product = ref({});
const isLoaded = ref(false);
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
      name: 'ProductSingle',
      params: {
        id
      }
    },
    title: 'Product Single'
  }
];

const router = useRouter();
const { toast } = useToast();
ProductRepository.get(id)
  .then((response) => {
    product.value = response.data;
  })
  .finally(() => {
    isLoaded.value = true;
  })


const updateProduct = async (data: object) => {
  return await ProductRepository.update(id, data)
    .then(() => {
      toast.success('Обновлено')
      router.push({
        name: 'ProductIndex'
      })
    })
}
</script>
<template>
  <div>
    <app-breadcrumbs
        :links="links"
    />
    <app-progress-linear v-if="!isLoaded"/>
    <div v-else>
      <app-section-title>
        {{ product.name }}
      </app-section-title>
      <product-form
          :product="product"
          :submit-action="updateProduct"
          submit-text="Save"
      />
    </div>

  </div>
</template>

