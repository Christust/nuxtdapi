<script setup lang="ts">
const counterStore = useCounterStore();


</script>

<template>
  <h1>index</h1>
  {{ counterStore.counter }}
  <button @click="counterStore.addCounter()">add</button>
  <button @click="counterStore.addCounterNav">nav</button>
</template>

<style scoped></style>
