<script lang="ts" setup>
import materialRequestService from '~/api/factories/material_request';
import branchService from '~/api/factories/branch';
import storeService from '~/api/factories/store';
import { materialRequestFields, materialRequestIcons } from '~/constants/material_request';

// Stores
const searchStore = useSearchStore()

// Refs
const materialRequests = ref()
const materialRequestData = ref()
const total = ref(0)
const limit = ref(5)
const finished = ref(false)
const activePage = ref(1)
const branch = ref(null)
const branches: any = ref([])
const store = ref(null)
const stores: any = ref([])
const materialRequestAction = ref('create')
const paginationHelper = ref<HTMLInputElement | any>(null)
const searchComponent = ref<HTMLInputElement | any>(null)
const materialRequestModal = ref<HTMLInputElement | any>(null)

// Functions
function list({ page = 0, search = null }) {
  activePage.value = page !== 0 ? page : activePage.value
  const payload = {
    page: page || activePage.value,
    limit: limit.value,
    finished: finished.value,
    branch: branch.value,
    store: store.value,
    search: search || searchStore.searchValue
  }
  materialRequestService.list(payload).then((res) => {
    materialRequests.value = res.data.material_requests
    total.value = res.data.total
    limit.value = res.data.limit
  })
}
function create() {
  materialRequestAction.value = 'create'
  materialRequestModal.value.showModal()
}
function update(info: any) {
  materialRequestAction.value = 'update'
  materialRequestData.value = info
  materialRequestModal.value.showModal()
}
function destroy(info: any) {
  materialRequestAction.value = 'destroy'
  materialRequestData.value = info
  materialRequestModal.value.showModal()
}
function actionPoint(actionPoint: string, info: any) {
  switch (actionPoint) {
    case 'update':
      update(info)
      return
    case 'destroy':
      destroy(info)
      return
    default:
      return
  }
}
function changePage(page: number) {
  list({ page })
}
function searchMaterialRequests() {
  list({ page: 1 })
}
function listBranches() {
  const payload = {
    unlimit: true
  }
  branchService.list(payload).then((res) => {
    branches.value = res.data.branches
  })
}
function listStores() {
  store.value = null
  if (branch.value) {
    const payload = {
      branch_id: branch.value ? branch.value : null,
      unlimit: true
    }
    storeService.list(payload).then((res) => {
      stores.value = res.data.stores
      searchMaterialRequests()
    })
  } else stores.value = []


}

// Hooks
onMounted(() => {
  list({})
  listBranches()
})
</script>

<template>
  <div class="d-flex justify-content-end mb-3">
    <div class="col-3 text-end"><button @click="create" class="btn btn-primary">Crear
        MaterialRequest</button></div>
  </div>
  <div class="card rounded-4 p-4 shadow">
    <SharedSearchHelper ref="searchComponent" :colValue="3" :placeholder="'Buscador de materialRequests'" class="mb-4"
      @search="searchMaterialRequests">
      <template #extraElements>
        <div class="col-2 ms-2">
          <label class="form-label">Sucursal</label>
          <select @change="listStores(); searchMaterialRequests();" class="form-select" v-model="branch">
            <option :value="null" selected>Todas</option>
            <option v-for="branchItem in branches" :key="branchItem.id + branchItem.name + 'STORE'"
              :value="branchItem.id" v-text="branchItem.name"></option>
          </select>
        </div>
        <div class="col-2 ms-2">
          <label class="form-label">Almacen</label>
          <select @change="searchMaterialRequests()" class="form-select" v-model="store">
            <option :value="null" selected>Todos</option>
            <option v-for="storeItem in stores" :key="storeItem.id + storeItem.name + 'STORE'" :value="storeItem.id"
              v-text="storeItem.name"></option>
          </select>
        </div>
        <div class="col-3">
          <div class="form-check form-switch">
            <input @change="searchMaterialRequests" class="form-check-input" type="checkbox" role="switch"
              v-model="finished" :true-value="true" :false-value="false" id="finished">
            <label class="form-check-label" for="finished" v-text="finished ? 'Terminados' : 'Pendientes'">
            </label>
          </div>
        </div>
      </template>
    </SharedSearchHelper>
    <SharedTableHelper :fields="materialRequestFields" :records="materialRequests">
      <template #cell(finished)="record">
        <font-awesome-icon v-if="record.finished" icon="fa-solid fa-circle-check" size="lg" class="text-success" />
        <font-awesome-icon v-else icon="fa-solid fa-circle-exclamation" size="lg" class="text-warning" />
      </template>
      <template #cell(unit_price)="record">
        <span v-text="formatCurrency(record.unit_price)"></span>
      </template>
      <template #cell(actions)="record">
        <SharedPointsMenu @action="actionPoint" :iconsRender="materialRequestIcons" :info="record"
          :disabledActions="[record.finished ? 'update' : '']" />
      </template>
    </SharedTableHelper>
    <SharedPaginationHelper ref="paginationHelper" :showCountText="false" :activeClass="true" :justifyClass="'end'"
      :totalRecords="total" :limit="limit" :externalPage="activePage" @changePage="changePage" />
    <MaterialRequestModal ref="materialRequestModal" :materialRequestData="materialRequestData"
      :action="materialRequestAction" @reloadMaterialRequests="list({})" />
  </div>
</template>
