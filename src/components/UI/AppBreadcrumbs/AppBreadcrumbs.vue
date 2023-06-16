<script lang="ts" setup>
type PropsType = {
  links: LinkType[]
}

type LinkType = {
  title: string,
  to: string | object,
}

const props = defineProps<PropsType>();

</script>

<template>
  <div class="app-breadcrumbs">
    <router-link
      v-for="(link, index) in links"
      class="app-breadcrumbs__item"
      :key="index"
      :to="link.to"
    >
      {{ link.title }}

      <span
        v-if="(index + 1) !== links.length"
        class="app-breadcrumbs__item__arrow"
      >
        >
      </span>
    </router-link>
  </div>
</template>

<style lang="scss" src="./AppBreadcrumbs.scss" />