<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup lang="ts">
const useCounter = useCounterStore()
onMounted(() => {
    useCounter.resetCounter()
})
</script>