<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import AppToast from "@/components/UI/AppToast/AppToast.vue";
import useToast from "@/components/UI/AppToast/useToast";

const route = useRoute();
const router = useRouter();

const { toast } = useToast();

</script>

<template>
  <div class="container">
    <router-view />
    <app-toast />
  </div>

</template>

<style lang="scss" src="./assets/scss/app.scss"/>