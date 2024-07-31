<script lang="ts" setup>
import materialRequestService from '~/api/factories/material_request';
import { materialRequestFields, materialRequestIcons } from '~/constants/material_request';
// Stores
const searchStore = useSearchStore()

// Refs
const materialRequests = ref()
const materialRequestData = ref()
const total = ref(0)
const limit = ref(5)
const activePage = ref(1)
const materialRequestAction = ref('create')
const paginationHelper = ref<HTMLInputElement | any>(null)
const searchComponent = ref<HTMLInputElement | any>(null)
const materialRequestModal = ref<HTMLInputElement | any>(null)

// Functions
function listMaterialRequests({ page = 0, search = null }) {
  activePage.value = page !== 0 ? page : activePage.value
  const payload = {
    page: page || activePage.value,
    limit: limit.value,
    search: search || searchStore.searchValue
  }
  materialRequestService.list(payload).then((res) => {
    materialRequests.value = res.data.material_requests
    total.value = res.data.total
    limit.value = res.data.limit
  })
}
function createMaterialRequest() {
  materialRequestAction.value = 'create'
  materialRequestModal.value.showModal()
}
function updateMaterialRequest(info: any) {
  materialRequestAction.value = 'update'
  materialRequestData.value = info
  materialRequestModal.value.showModal()
}
function destroyMaterialRequest(info: any) {
  materialRequestAction.value = 'destroy'
  materialRequestData.value = info
  materialRequestModal.value.showModal()
}
function actionPoint(actionPoint: string, info: any) {
  switch (actionPoint) {
    case 'updateMaterialRequest':
      updateMaterialRequest(info)
      return
    case 'destroyMaterialRequest':
      destroyMaterialRequest(info)
      return
    default:
      return
  }
}
function changePage(page: number) {
  listMaterialRequests({ page })
}
function searchMaterialRequests() {
  listMaterialRequests({ page: 1 })
}

// Hooks
onMounted(() => (
  listMaterialRequests({})
))
</script>

<template>
  <div class="d-flex justify-content-end mb-3">
    <div class="col-3 text-end"><button @click="createMaterialRequest" class="btn btn-primary">Crear
        MaterialRequest</button></div>
  </div>
  <div class="card rounded-4 p-4 shadow">
    <SharedSearchHelper ref="searchComponent" :colValue="3" :placeholder="'Buscador de materialRequests'" class="mb-4"
      @search="searchMaterialRequests" />
    <SharedTableHelper :fields="materialRequestFields" :records="materialRequests">
      <template #cell(finished)="record">
        <font-awesome-icon v-if="record.finished" icon="fa-solid fa-square-check" size="lg" class="text-success" />
        <font-awesome-icon v-else icon="fa-solid fa-circle-exclamation" size="lg" class="text-warning" />
      </template>
      <template #cell(unit_price)="record">
        <span v-text="formatCurrency(record.unit_price)"></span>
      </template>
      <template #cell(actions)="record">
        <SharedPointsMenu @action="actionPoint" :iconsRender="materialRequestIcons" :info="record" />
      </template>
    </SharedTableHelper>
    <SharedPaginationHelper ref="paginationHelper" :showCountText="false" :activeClass="true" :justifyClass="'end'"
      :totalRecords="total" :limit="limit" :externalPage="activePage" @changePage="changePage" />
    <MaterialRequestModal ref="materialRequestModal" :materialRequestData="materialRequestData"
      :action="materialRequestAction" @reloadMaterialRequests="listMaterialRequests({})" />
  </div>
</template>
