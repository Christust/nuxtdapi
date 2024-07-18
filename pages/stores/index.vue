<script lang="ts" setup>
import storeService from '~/api/factories/store';
import branchService from '~/api/factories/branch';
import { storeFields, storeIcons } from '~/constants/store';

// Stores
const searchStore = useSearchStore()

// Refs
const stores = ref()
const storeData = ref({})
const total = ref(0)
const limit = ref(5)
const activePage = ref(1)
const storeAction = ref('create')
const branches = ref([])
const branch = ref(null)
const paginationHelper = ref<HTMLInputElement | any>(null)
const searchComponent = ref<HTMLInputElement | any>(null)
const storeModal = ref<HTMLInputElement | any>(null)

// Functions
function listStores({ page = 0, search = null }) {
  activePage.value = page !== 0 ? page : activePage.value
  const payload = {
    page: page || activePage.value,
    limit: limit.value,
    search: search || searchStore.searchValue,
    branch_id: branch.value
  }
  storeService.list(payload).then((res) => {
    stores.value = res.data.stores
    total.value = res.data.total
    limit.value = res.data.limit
  })
}
function createStore() {
  storeAction.value = 'create'
  storeModal.value.showModal()
}
function updateStore(info: any) {
  storeAction.value = 'update'
  storeData.value = info
  storeModal.value.showModal()
}
function destroyStore(info: any) {
  storeAction.value = 'destroy'
  storeData.value = info
  storeModal.value.showModal()
}
function actionPoint(actionPoint: string, info: any) {
  switch (actionPoint) {
    case 'updateStore':
      updateStore(info)
      return
    case 'destroyStore':
      destroyStore(info)
      return
    default:
      return
  }
}
function changePage(page: number) {
  listStores({ page })
}
function searchStores() {
  listStores({ page: 1 })
}
function listBranches() {
  const payload = {
    unlimit: true
  }
  branchService.list(payload).then((res) => {
    branches.value = res.data.branches
  })
}

// Hooks
onMounted(() => {
  listBranches()
  listStores({})
})
</script>

<template>
  <div class="d-flex justify-content-end mb-3">
    <div class="col-3 text-end"><button @click="createStore" class="btn btn-primary">Crear Almacen</button></div>
  </div>
  <div class="card rounded-4 p-4 shadow">
    <SharedSearchHelper ref="searchComponent" :colValue="3" :placeholder="'Buscador de almacenes'" class="mb-4"
      @search="searchStores">
      <template #extraElements>
        <div class="col-2 ms-2">
          <label class="form-label">Sucursal</label>
          <select @change="listStores" class="form-select" v-model="branch">
            <option :value="null" selected>Todas</option>
            <option v-for="branchItem in branches" :key="branchItem.id + branchItem.name + 'STORE'"
              :value="branchItem.id" v-text="branchItem.name"></option>
          </select>
        </div>
      </template>
    </SharedSearchHelper>
    <SharedTableHelper :fields="storeFields" :records="stores">
      <template #cell(branch)="record">
        <span v-text="record.branch.name"></span>
      </template>
      <template #cell(actions)="record">
        <SharedPointsMenu @action="actionPoint" :iconsRender="storeIcons" :info="record" />
      </template>
    </SharedTableHelper>
    <SharedPaginationHelper ref="paginationHelper" :showCountText="false" :activeClass="true" :justifyClass="'end'"
      :totalRecords="total" :limit="limit" :externalPage="activePage" @changePage="changePage" />
    <StoreModal ref="storeModal" :storeData="storeData" :action="storeAction" @reloadStores="listStores({})" />
  </div>
</template>

<style scoped></style>
