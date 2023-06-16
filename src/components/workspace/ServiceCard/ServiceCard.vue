<script lang="ts" setup>

const props = defineProps({
  title: String,
  description: String,
  to: [String, Object],
  small: Boolean,
  bgColor: String,
  color: String
});

</script>

<template>
  <router-link
    :to="to"
    :class="['service-card', {
      'service-card--small': small
    }]"
    :style="{
      background: bgColor,
      color: color
    }"
  >
    <h2 class="service-card__title">{{ props.title }}</h2>
    <h4 class="service-card__description">{{ props.description }}</h4>
  </router-link>
</template>

<style lang="scss" src="./ServiceCard.scss"/>