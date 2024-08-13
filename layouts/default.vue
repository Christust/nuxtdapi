<script setup lang="ts">
import routesConstants from "@/constants/routesConstants";
import branchService from "~/api/factories/branch";

// Stores
const branchStore = useBranchStore()

// Refs
const routes = ref(routesConstants);
const branches: any = ref([]);
const router: any = useRoute();
const loader = useLoaderStore()

// Functions
function listBranches() {
  branchService.list().then((res) => {
    branches.value = res.data.branches
    if (branches.value.length > 0) {
      branch.value = branches.value[0].id
    }
  })
}
function routeLabel(route: string) {
  const routeLabels: any = {
    "store-id": "Stocks",
    default: "Ruta"
  }
  return routeLabels[route] || routeLabels.default
}

// Computed
const branch = computed({
  get: () => branchStore.branchValue,
  set: (val) => branchStore.updateBranch(val)
})


// Hooks
onMounted(() => {
  listBranches()
})

</script>

<template>
  <div class="d-flex">
    <NavigationSidebar />
    <div class="sideMainContainer mainContainer">
      <header class="d-flex align-items-center justify-content-between p-3" style="background-color: #ced7dc">
        <h3 class="ms-3 mb-0 text-black" v-text="routes.filter((route: any) => route.route === router.path)[0]?.name
          || routeLabel(router.name)"></h3>
        <div class="row me-3">
          <label class="ps-0  form-label">Sucursal</label>
          <select class="form-select" v-model="branch">
            <option :value="null" selected>Todas</option>
            <option v-for="branchItem in branches" :key="branchItem.id + branchItem.name + 'COUNTRYHEADER'"
              :value="branchItem.id" v-text="branchItem.name"></option>
          </select>
        </div>
      </header>
      <main class="mainContent">
        <slot />
      </main>
      <SharedLoader v-if="loader.getLoader > 0" />
      <footer class="footerContent">Made by MODERATOREM</footer>
    </div>
  </div>
</template>
