<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
<script setup lang="ts">
const useLoader = useLoaderStore()
onMounted(() => {
    useLoader.resetLoader()
})
</script>