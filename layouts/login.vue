<script lang="ts" setup>
const counter = useCounterStore();
</script>

<template>
  <div class="login">
    <slot />
    <SharedLoader v-if="counter.getCounter > 0" />
  </div>
</template>

<style scoped></style>
