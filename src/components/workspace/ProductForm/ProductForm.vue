<script setup lang="ts">
import {ref, toRef} from "vue";
import AppInput from "@/components/UI/AppInput/AppInput.vue";
import AppBtn from "@/components/UI/AppBtn/AppBtn.vue";
import AppTextarea from "@/components/UI/AppTextarea/AppTextarea.vue";
import AppInputMoney from "@/components/UI/AppInputMoney/AppInputMoney.vue";
import AppInputAmount from "@/components/UI/AppInputAmount/AppInputAmount.vue";
import useUsers from "@/composables/useUsers.";
import AppSelect from "@/components/UI/AppSelect/AppSelect.vue";

type PropsType = {
  product: Object,
  submitText?: string,
  submitAction: Function
}

const props = withDefaults(defineProps<PropsType>(), {
  product: {}
});
const product = ref(props.product);

const { users, loadUsers } = useUsers();
loadUsers();

const isRequestPending = ref(false);

async function submit() {
  isRequestPending.value = true;
  await props.submitAction({
    ownerId: product.value.ownerId,
    name: product.value.name,
    smallDescription: product.value.smallDescription,
    description: product.value.description,
    price: product.value.price
  })
    .finally(() => {
      isRequestPending.value = false
    });
}

</script>

<template>
  <div class="form admin__featured-ads-form">
    <div class="u-mb-6">
      <app-input
          v-model="product.name"
      >
        <template #label>Name</template>
      </app-input>
    </div>
    <div class="u-mb-6">
      <app-textarea
          v-model="product.smallDescription"
      >
        <template #label>Small Description</template>
      </app-textarea>
    </div>
    <div class="u-mb-6">
      <app-textarea
          v-model="product.description"
      >
        <template #label>Description</template>
      </app-textarea>
    </div>
    <div class="u-mb-6">
      <app-select
          :items="users"
          item-text="fullName"
          item-value="id"
          label="Owner"
          v-model="product.ownerId"
      />
    </div>
    <div class="u-mb-6">
      <app-input
          type="number"
          v-model="product.price"
      >
        <template #label>Price</template>
      </app-input>
    </div>


    <app-btn
      class="admin__featured-ads-form__submit-btn"
      :loading="isRequestPending"
      @click="submit"
    >
      {{ submitText }}
    </app-btn>
  </div>
</template>

<style lang="scss" src="./ProductForm.scss" />