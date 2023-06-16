<script lang="ts" setup>
import AppBtn from "@/components/UI/AppBtn/AppBtn.vue";
import ServiceCard from "@/components/workspace/ServiceCard/ServiceCard.vue";

</script>

<template>
  <div class="row">
    <service-card
        bg-color="#00cc69"
        color="#fff"
        title="Products"
        description="Basic CRUD operations. Server side filters & sortings & pagination"
        :to="{
          name: 'ProductIndex'
        }"
    />
    <service-card
        bg-color="#37aee2"
        color="#fff"
        title="Users"
        description="Readonly table with server side pagination"
        :to="{
          name: 'UserIndex'
        }"
    />

  </div>

</template>

