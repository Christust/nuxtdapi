<script lang="ts" setup>
const loader = useLoaderStore();
</script>

<template>
  <div class="login">
    <slot />
    <SharedLoader v-if="loader.getLoader > 0" />
  </div>
</template>


