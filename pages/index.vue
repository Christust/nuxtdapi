<script setup lang="ts">
const options = ref({
  chart: {
    id: 'vuechart-example'
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
  }
})
const series = ref([{
  name: 'series-1',
  data: [30, 40, 45, 50, 49, 60, 70, 91]
}])


const authStore = useAuthStore();

function showAction() {
  alert("emit");
}
</script>

<template>
  <div>
    <main class="row justify-content-around align-items-center">
      <div class="col-5 card justify-content-center text-center p-3">
        <apexchart width="400" type="bar" :options="options" :series="series"></apexchart>
      </div>
      <div class="col-5 card justify-content-center text-center p-3">
        <apexchart width="400" type="line" :options="options" :series="series"></apexchart>
      </div>
    </main>
  </div>
</template>
