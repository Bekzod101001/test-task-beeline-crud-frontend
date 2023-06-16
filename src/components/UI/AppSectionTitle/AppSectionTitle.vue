<script setup lang="ts">

</script>

<template>
  <div class="app-section-title">
    <h2 class="app-section-title__heading">
      <slot/>
    </h2>
    <div class="app-section-title__btns">
      <slot name="buttons"></slot>
    </div>
  </div>

</template>

<style src="./AppSectionTitle.scss" lang="scss"/>