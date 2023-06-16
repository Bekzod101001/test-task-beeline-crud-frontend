<template>
  <div class="placeholder">
    &nbsp;
  </div>
</template>

<script setup>
defineProps({
  height: {
    type: String,
  },
  width: {
    type: String,
  },
  borderRadius: {
    type: String,
    default: '6px'
  },
  marginBottom: String,
});

</script>

<style>
@keyframes bgAnimate {
  0% {
    background-position: 50% 0;
  }

  100% {
    background-position: -150% 0;
  }
}
.placeholder {
  height: v-bind(height);
  width: v-bind(width);
  margin-bottom: v-bind(marginBottom);
  border-radius: v-bind(borderRadius);
  max-width: 100%;
  background-image: linear-gradient(
    to right,
    #d6d7d8 0%,
    #e2e3e4 10%,
    #d6d7d8 20%,
    #d6d7d8 100%
  );
  background-size: 200% 100%;
  animation: bgAnimate 1.5s linear infinite;
}
</style>